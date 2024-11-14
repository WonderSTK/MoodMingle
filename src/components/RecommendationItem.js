import React from 'react';

function RecommendationItem({ title, subtitle, imageUrl, type }) {
  const searchTerm = `${title} ${type}`;

  return (
    <a
      href={`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 p-2 rounded-lg transition-colors hover:bg-gray-100 mb-2"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-16 h-16 object-cover rounded"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/64';
        }}
      />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </a>
  );
}

export default RecommendationItem;