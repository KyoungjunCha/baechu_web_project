import React from 'react';
import PropTypes from 'prop-types';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';

const SearchListItem = ({ category, hasImage, title, author, province, likes, views, date, increaseViews }) => {
  return (
    <tr onClick={increaseViews}>
      <td>{category}</td>
      <td>{hasImage ? <img src={imageIcon} alt="이미지 첨부됨" className="best-icon" /> : <img src={noImageIcon} alt="이미지 첨부 안됨" className="best-icon" />}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{province}</td>
      <td>{likes}</td> 
      <td>{views}</td>
      <td>{new Date(date).toLocaleString()}</td>
    </tr>
  );
};

SearchListItem.propTypes = {
  category: PropTypes.string.isRequired,
  hasImage: PropTypes.number.isRequired, 
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  increaseViews: PropTypes.func.isRequired, 
};

export default SearchListItem;
