import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecommendations } from '../redux/recommendationsSlice';

function MoodInput() {
  const [mood, setMood] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      dispatch(fetchRecommendations(mood));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Enter your mood..."
        className="p-2 border rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Get Recommendations
      </button>
    </form>
  );
}

export default MoodInput;