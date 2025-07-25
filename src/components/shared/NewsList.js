import React, { useState } from 'react';
import { format } from 'date-fns';

export default function NewsList({ data, isEditable = false, onChange }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    featured: false
  });
  
  const handleAdd = () => {
    if (newArticle.title && newArticle.excerpt) {
      const article = {
        ...newArticle,
        id: Date.now().toString()
      };
      onChange('articles', [...(data.articles || []), article]);
      setNewArticle({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        featured: false
      });
      setShowAddForm(false);
    }
  };
  
  const handleUpdate = (id, field, value) => {
    const updated = data.articles.map(article => 
      article.id === id ? { ...article, [field]: value } : article
    );
    onChange('articles', updated);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Delete this article?')) {
      onChange('articles', data.articles.filter(a => a.id !== id));
    }
  };
  
  const sortedArticles = [...(data.articles || [])].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          {data.title || 'Latest News'}
        </h2>
        
        {isEditable && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showAddForm ? 'Cancel' : 'Add Article'}
            </button>
          </div>
        )}
        
        {showAddForm && (
          <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Article Title"
                className="w-full p-2 border rounded"
                value={newArticle.title}
                onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
              />
              <textarea
                placeholder="Excerpt (brief summary)"
                className="w-full p-2 border rounded"
                rows="2"
                value={newArticle.excerpt}
                onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
              />
              <textarea
                placeholder="Full Content"
                className="w-full p-2 border rounded"
                rows="6"
                value={newArticle.content}
                onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Author Name"
                  className="p-2 border rounded"
                  value={newArticle.author}
                  onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                />
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={newArticle.date}
                  onChange={(e) => setNewArticle({...newArticle, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Image upload will be connected by Person B</p>
                  <input
                    type="text"
                    placeholder="Image URL (temporary)"
                    className="w-full p-2 border rounded mt-2"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({...newArticle, image: e.target.value})}
                  />
                </div>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={newArticle.featured}
                  onChange={(e) => setNewArticle({...newArticle, featured: e.target.checked})}
                />
                Featured Article
              </label>
              <button
                onClick={handleAdd}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Add Article
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
              {isEditable && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition space-x-2 z-10">
                  <button
                    onClick={() => setEditingId(editingId === article.id ? null : article.id)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  >
                    {editingId === article.id ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
              
              {article.featured && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 px-2 py-1 rounded text-sm font-semibold z-10">
                  Featured
                </div>
              )}
              
              {article.image ? (
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">📰</span>
                </div>
              )}
              
              <div className="p-6">
                {editingId === article.id ? (
                  <>
                    <input
                      type="text"
                      value={article.title}
                      onChange={(e) => handleUpdate(article.id, 'title', e.target.value)}
                      className="w-full mb-2 p-1 border rounded font-semibold"
                    />
                    <textarea
                      value={article.excerpt}
                      onChange={(e) => handleUpdate(article.id, 'excerpt', e.target.value)}
                      className="w-full mb-2 p-1 border rounded"
                      rows="3"
                    />
                    <input
                      type="text"
                      value={article.author}
                      onChange={(e) => handleUpdate(article.id, 'author', e.target.value)}
                      className="w-full mb-2 p-1 border rounded text-sm"
                    />
                    <input
                      type="date"
                      value={article.date}
                      onChange={(e) => handleUpdate(article.id, 'date', e.target.value)}
                      className="w-full p-1 border rounded text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{article.author || 'Staff'}</span>
                      <span>{format(new Date(article.date), 'MMM d, yyyy')}</span>
                    </div>
                    {!isEditable && (
                      <button
                        onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                        className="mt-4 text-blue-600 hover:text-blue-700"
                      >
                        {expandedId === article.id ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </>
                )}
                
                {expandedId === article.id && !isEditable && article.content && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-700 whitespace-pre-wrap">{article.content}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}