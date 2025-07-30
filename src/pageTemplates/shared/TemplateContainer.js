import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateContainer({ 
  children, 
  className = '', 
  padding = 'py-16',
  background = 'bg-white' 
}) {
  return (
    <div className={`${background} ${padding}`}>
      <div className={`container mx-auto px-6 ${className}`}>
        {children}
      </div>
    </div>
  );
}

TemplateContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.string,
  background: PropTypes.string
};