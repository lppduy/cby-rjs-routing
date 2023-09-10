import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');
  const category = searchParams.get('category');

  const handleSortBy = () => {
    setSearchParams({
      sortBy: 'view',
      category,
    });
  };

  return (
    <div>
      <h2>
        Articles
        <p>
          SortBy: {sortBy} Category: {category}
        </p>
        <button onClick={handleSortBy}>Sort by views</button>
      </h2>
    </div>
  );
};

export default Articles;
