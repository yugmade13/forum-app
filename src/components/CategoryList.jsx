import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ keyword, categories, handleCategory }) {
  const handleButton = (event) => {
    handleCategory(event.target.value);
  };

  return (
    <div className="category-list">
      <button
        style={keyword === 'All' ? { backgroundColor: '#4C9EEB', color: '#fff' } : null}
        value="All"
        type="button"
        onClick={handleButton}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          style={keyword === category ? { backgroundColor: '#4C9EEB', color: '#fff' } : null}
          value={category}
          key={`${category}`}
          type="button"
          onClick={handleButton}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryList.propTypes = {
  keyword: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  handleCategory: PropTypes.func.isRequired,
};

export default CategoryList;