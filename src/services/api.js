import axios from 'axios';

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const LASTFM_API_KEY = process.env.REACT_APP_LASTFM_API_KEY;

function parseGeminiResponse(text) {
  // Remove any markdown formatting
  text = text.replace(/```json\s*|\s*```/g, '').trim();

  // Custom parsing to handle potential issues with escaped quotes
  const result = {};
  let currentKey = '';
  let currentArray = [];
  let currentObject = {};
  let inObject = false;

  const lines = text.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('"') && trimmedLine.endsWith('": [')) {
      currentKey = trimmedLine.slice(1, -4);
      currentArray = [];
    } else if (trimmedLine === '},') {
      currentArray.push(currentObject);
      currentObject = {};
      inObject = false;
    } else if (trimmedLine === ']' || trimmedLine === '],') {
      if (inObject) {
        currentArray.push(currentObject);
      }
      result[currentKey] = currentArray;
      currentArray = [];
      currentObject = {};
      inObject = false;
    } else if (trimmedLine === '{') {
      currentObject = {};
      inObject = true;
    } else if (trimmedLine.includes('": "')) {
      const [key, ...valueParts] = trimmedLine.split('": ');
      const value = valueParts.join('": ').slice(1, -2);
      if (inObject) {
        currentObject[key.slice(1)] = value;
      }
    }
  }

  return result;
}

async function getGeminiRecommendations(mood) {
  const prompt = `Given the mood "${mood}", recommend 5 movies, 5 books, and 5 songs that match this mood. Format the response as a JSON object with three arrays: "movies", "books", and "songs". Each item in these arrays should be an object with a "title" field and any other relevant fields. For songs, include separate "title" and "artist" fields.`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY } }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    console.log("Raw Gemini response:", text);

    try {
      const parsedResponse = parseGeminiResponse(text);
      console.log("Parsed Gemini response:", parsedResponse);
      return parsedResponse;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", text);
      console.error("Parse error:", parseError);
      throw new Error("Failed to parse Gemini response");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

async function getMovieRecommendations(movies) {
  const moviePromises = movies.map(async (movie) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query: movie.title,
          language: 'en-US',
          page: 1,
          include_adult: false
        },
        headers: {
          'Authorization': `Bearer ${TMDB_API_KEY}`,
          'accept': 'application/json'
        }
      });
      return response.data.results && response.data.results.length > 0 ? response.data.results[0] : movie;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return movie;
    }
  });
  return Promise.all(moviePromises);
}

async function getBookRecommendations(books) {
  const bookPromises = books.map(async (book) => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json`, {
        params: {
          title: book.title,
          limit: 1
        }
      });
      const data = response.data;
      if (data.docs && data.docs.length > 0) {
        const bookInfo = data.docs[0];
        return {
          title: bookInfo.title,
          authors: bookInfo.author_name || ['Unknown Author'],
          coverUrl: bookInfo.cover_i ? `https://covers.openlibrary.org/b/id/${bookInfo.cover_i}-M.jpg` : undefined,
        };
      }
      return {
        title: book.title,
        authors: ['Unknown Author'],
        coverUrl: undefined,
      };
    } catch (error) {
      console.error("Error fetching book details:", error);
      return {
        title: book.title,
        authors: ['Unknown Author'],
        coverUrl: undefined,
      };
    }
  });
  return Promise.all(bookPromises);
}

async function getSongRecommendations(songs) {
  const songPromises = songs.map(async (song) => {
    try {
      const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'track.getInfo',
          track: song.title,
          artist: song.artist,
          api_key: LASTFM_API_KEY,
          format: 'json'
        }
      });
      const data = response.data;
      if (data.track) {
        return {
          name: data.track.name,
          artist: data.track.artist.name,
          image: data.track.album ? data.track.album.image : undefined
        };
      }
      return song;
    } catch (error) {
      console.error("Error fetching song details:", error);
      return song;
    }
  });
  return Promise.all(songPromises);
}

export async function getRecommendations(mood) {
  const geminiRecommendations = await getGeminiRecommendations(mood);
  const [movies, books, songs] = await Promise.all([
    getMovieRecommendations(geminiRecommendations.movies),
    getBookRecommendations(geminiRecommendations.books),
    getSongRecommendations(geminiRecommendations.songs)
  ]);

  return { movies, books, songs };
}