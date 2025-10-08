import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';

  const handleSortChange = (field, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(field, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="sort-controls">
      <div className="sort-control">
        <label htmlFor="sortBy">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => handleSortChange('sortBy', e.target.value)}
        >
          <option value="name">Name</option>
          <option value="modified">Modification Date</option>
        </select>
      </div>

      <div className="sort-control">
        <label htmlFor="order">
          Order:
        </label>
        <select
          id="order"
          value={order}
          onChange={(e) => handleSortChange('order', e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default SortControls;