import React from 'react';
import PropTypes from 'prop-types';
import imageIcon from '../../images/imgy.png';
import noImageIcon from '../../images/imgn.png';

const BoardListItem = ({ category, board_img, title, author, province, likes, views, date, increaseViews }) => {
  return (
    <tr onClick={increaseViews}>
      <td>{category}</td>
      {/* board_img 값에 따라 다른 이미지 표시 */}
      <td>{board_img === '1' ? <img src={imageIcon} alt="이미지 첨부됨" className="best-icon" /> : <img src={noImageIcon} alt="이미지 첨부 안됨" className="best-icon" />}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>{province}</td>
      <td>{likes}</td>
      <td>{views}</td>
      <td>{new Date(date).toLocaleString()}</td>
    </tr>
  );
};

BoardListItem.propTypes = {
  category: PropTypes.string.isRequired,
  board_img: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  province: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  increaseViews: PropTypes.func.isRequired,
};

export default BoardListItem;
