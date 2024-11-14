import React from 'react';
import { useSelector } from 'react-redux';
import RecommendationItem from './RecommendationItem';

function RecommendationList() {
  const { movies, books, songs, status, error } = useSelector((state) => state.recommendations);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Movies</h2>
        {movies.map((movie, index) => (
          <RecommendationItem
            key={index}
            title={movie.title}
            subtitle={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            imageUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
            type="movie"
          />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Books</h2>
        {books.map((book, index) => (
          <RecommendationItem
            key={index}
            title={book.title}
            subtitle={book.authors.join(', ')}
            imageUrl={book.coverUrl || 'https://via.placeholder.com/200x300'}
            type="book"
          />
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Songs</h2>
        {songs.map((song, index) => (
          <RecommendationItem
            key={index}
            title={song.name || song.title}
            subtitle={song.artist}
            imageUrl={song.image?.[2]['#text'] || 'https://via.placeholder.com/200x200'}
            type="song"
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;