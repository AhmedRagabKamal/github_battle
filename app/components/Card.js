import React from 'react';
import PropTypes from 'prop-types';

function Card({ header, subHeader, avatar, href, name, children }) {
  return (
    <div className='repo bg-light'>
      <h2 className='header-lg text-center'>{header}</h2>
      <img className='avatar' src={avatar} alt={`Avatar for ${name}`} />
      <h3 className='text-center'>{subHeader}</h3>
      <h2 className='text-center'>
        <a className='link' target='_blank' href={href}>
          {name}
        </a>
      </h2>
      {children}
    </div>
  );
}

Card.prototype = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Card;
