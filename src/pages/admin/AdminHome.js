import React, { useState, useEffect } from 'react';
import Hero from '../../components/shared/Hero';
import { usePageData } from '../../hooks/usePageData';
import toast from 'react-hot-toast';

export default function AdminHome() {
  const { draft, loading, saving, hasChanges, updateField, save, publish, revert } = usePageData('home');
  const [editingFeature, setEditingFeature] = useState(null);
  
  const handleFeatureUpdate = (id, field, value) => {
    const updatedFeatures = draft.features.map(feature =>
      feature.id === id ? { ...feature, [field]: value } : feature
    );
    updateField('features', updatedFeatures);
  };
  
  const handleFeatureDelete = (id) => {
    if (window.confirm('Delete this feature?')) {
      const updatedFeatures = draft.features.filter(f => f.id !== id);
      updateField('features', updatedFeatures);
    }
  };
  
  const handleFeatureAdd = () => {
    const newFeature = {
      id: Date.now().toString(),
      icon: '✨',
      title: 'New Feature',
      description: 'Feature description'
    };
    updateField('features', [...(draft.features || []), newFeature]);
    setEditingFeature(newFeature.id);
  };
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      {/* Admin toolbar */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-4 sticky top-16 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-yellow-800 font-semibold">
            ✏️ Edit Home Page - {hasChanges ? 'Unsaved changes' : 'All changes saved'}
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
      
      {/* Hero Section */}
      <Hero data={draft?.hero} isEditable onChange={updateField} />
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Features</h2>
            <button
              onClick={handleFeatureAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add Feature
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {draft?.features?.map((feature) => (
              <div key={feature.id} className="text-center relative group">
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => setEditingFeature(editingFeature === feature.id ? null : feature.id)}
                    className="bg-blue-600 text-white p-1 rounded text-sm mr-1"
                  >
                    {editingFeature === feature.id ? '✓' : '✏️'}
                  </button>
                  <button
                    onClick={() => handleFeatureDelete(feature.id)}
                    className="bg-red-500 text-white p-1 rounded text-sm"
                  >
                    🗑️
                  </button>
                </div>
                
                {editingFeature === feature.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) => handleFeatureUpdate(feature.id, 'icon', e.target.value)}
                      className="w-full text-center text-5xl mb-4 border rounded"
                      maxLength="2"
                    />
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) => handleFeatureUpdate(feature.id, 'title', e.target.value)}
                      className="w-full p-2 border rounded font-semibold"
                    />
                    <textarea
                      value={feature.description}
                      onChange={(e) => handleFeatureUpdate(feature.id, 'description', e.target.value)}
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
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