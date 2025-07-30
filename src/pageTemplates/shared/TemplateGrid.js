import React from 'react';
import PropTypes from 'prop-types';

export default function TemplateGrid({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'gap-8',
  className = ''
}) {
  const getGridClasses = () => {
    const { sm, md, lg, xl } = columns;
    let classes = `grid ${gap} ${className}`;
    
    if (sm) classes += ` grid-cols-${sm}`;
    if (md) classes += ` md:grid-cols-${md}`;
    if (lg) classes += ` lg:grid-cols-${lg}`;
    if (xl) classes += ` xl:grid-cols-${xl}`;
    
    return classes;
  };

  return (
    <div className={getGridClasses()}>
      {children}
    </div>
  );
}

TemplateGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number
  }),
  gap: PropTypes.string,
  className: PropTypes.string
};