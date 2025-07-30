import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateCard({ 
  children, 
  className = '', 
  hover = true,
  shadow = 'lg',
  padding = 'p-6'
}) {
  const hoverClass = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300' : '';
  const shadowClass = `shadow-${shadow}`;

  return (
    <div className={`bg-white rounded-lg ${shadowClass} ${hoverClass} ${padding} ${className}`}>
      {children}
    </div>
  );
}

TemplateCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  shadow: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  padding: PropTypes.string
};