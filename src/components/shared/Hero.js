import React from 'react';

export default function Hero({ data, isEditable = false, onChange }) {
  const handleEdit = (field, value) => {
    if (onChange) {
      onChange(`hero.${field}`, value);
    }
  };
  
  return (
    <div className="hero text-white py-16">
      <div className="container mx-auto text-center">
        <h1 
          className="text-5xl font-bold mb-4"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleEdit('title', e.target.innerText)}
        >
          {data?.title || 'Welcome'}
        </h1>
        
        <p 
          className="text-xl mb-8"
          contentEditable={isEditable}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleEdit('subtitle', e.target.innerText)}
        >
          {data?.subtitle || 'Your subtitle here'}
        </p>
        
        {data?.cta && (
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            {data.cta.text}
          </button>
        )}
      </div>
    </div>
  );
}