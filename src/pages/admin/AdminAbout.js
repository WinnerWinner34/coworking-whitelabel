import React, { useState } from 'react';
import Hero from '../../components/shared/Hero';
import ImageUpload from '../../components/shared/ImageUpload';
import { usePageData } from '../../hooks/usePageData';

export default function AdminAbout() {
  const { draft, loading, saving, hasChanges, updateField, save, publish, revert } = usePageData('about');
  const [editingContent, setEditingContent] = useState(null);
  const [editingValue, setEditingValue] = useState(null);
  
  const handleContentUpdate = (id, field, value) => {
    const updatedContent = draft.content.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    );
    updateField('content', updatedContent);
  };
  
  const handleValueUpdate = (id, field, value) => {
    const updatedValues = draft.values.map(val =>
      val.id === id ? { ...val, [field]: value } : val
    );
    updateField('values', updatedValues);
  };
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      {/* Admin toolbar */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-4 sticky top-16 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-yellow-800 font-semibold">
            ✏️ Edit About Page - {hasChanges ? 'Unsaved changes' : 'All changes saved'}
          </span>
          <div className="space-x-3">
            {hasChanges && (
              <>
                <button 
                  onClick={revert}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                >
                  Revert
                </button>
                <button 
                  onClick={save}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>
              </>
            )}
            <button 
              onClick={publish}
              disabled={saving}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
            >
              {saving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
      
      <Hero data={draft?.hero} isEditable onChange={updateField} />
      
      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto">
          {draft?.content?.map((section) => (
            <div key={section.id} className="mb-12 relative group">
              <button
                onClick={() => setEditingContent(editingContent === section.id ? null : section.id)}
                className="absolute top-0 right-0 bg-blue-600 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition"
              >
                {editingContent === section.id ? 'Save' : 'Edit'}
              </button>
              
              {editingContent === section.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleContentUpdate(section.id, 'title', e.target.value)}
                    className="w-full text-3xl font-bold p-2 border rounded"
                  />
                  <textarea
                    value={section.text}
                    onChange={(e) => handleContentUpdate(section.id, 'text', e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="6"
                  />
                  <ImageUpload
                    currentImage={section.image}
                    onImageSelect={(url) => handleContentUpdate(section.id, 'image', url)}
                    label="Section Image"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-lg text-gray-700">{section.text}</p>
                  {section.image && (
                    <img src={section.image} alt={section.title} className="mt-4 rounded-lg" />
                  )}
                </>
              )}
            </div>
          ))}
          
          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {draft?.values?.map((value) => (
              <div key={value.id} className="text-center relative group">
                <button
                  onClick={() => setEditingValue(editingValue === value.id ? null : value.id)}
                  className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded text-sm opacity-0 group-hover:opacity-100 transition"
                >
                  {editingValue === value.id ? '✓' : '✏️'}
                </button>
                
                {editingValue === value.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={value.icon}
                      onChange={(e) => handleValueUpdate(value.id, 'icon', e.target.value)}
                      className="w-full text-center text-4xl mb-4 border rounded"
                      maxLength="2"
                    />
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => handleValueUpdate(value.id, 'title', e.target.value)}
                      className="w-full p-2 border rounded font-semibold"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) => handleValueUpdate(value.id, 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="2"
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}