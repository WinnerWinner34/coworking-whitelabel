import React from 'react';
import Hero from '../../components/shared/Hero';
import NewsList from '../../components/shared/NewsList';
import { usePageData } from '../../hooks/usePageData';

export default function AdminNews() {
  const { draft, loading, saving, hasChanges, updateField, save, publish, revert } = usePageData('news');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      {/* Admin toolbar */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 p-4 sticky top-16 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-yellow-800 font-semibold">
            ✏️ Edit News Page - {hasChanges ? 'Unsaved changes' : 'All changes saved'}
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
      <NewsList data={draft || {}} isEditable onChange={updateField} />
    </div>
  );
}