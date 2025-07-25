import React, { useState } from 'react';

export default function TeamGrid({ data, isEditable = false, onChange }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    bio: '',
    image: ''
  });
  
  const handleAdd = () => {
    if (newMember.name && newMember.role) {
      const member = {
        ...newMember,
        id: Date.now().toString()
      };
      onChange('members', [...(data.members || []), member]);
      setNewMember({ name: '', role: '', bio: '', image: '' });
      setShowAddForm(false);
    }
  };
  
  const handleUpdate = (id, field, value) => {
    const updated = data.members.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );
    onChange('members', updated);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Delete this team member?')) {
      onChange('members', data.members.filter(m => m.id !== id));
    }
  };
  
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          {data.title || 'Our Team'}
        </h2>
        
        {isEditable && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showAddForm ? 'Cancel' : 'Add Team Member'}
            </button>
          </div>
        )}
        
        {showAddForm && (
          <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full p-2 border rounded"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
              />
              <textarea
                placeholder="Bio"
                className="w-full p-2 border rounded"
                rows="3"
                value={newMember.bio}
                onChange={(e) => setNewMember({...newMember, bio: e.target.value})}
              />
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Image upload will be connected by Person B</p>
                  <input
                    type="text"
                    placeholder="Image URL (temporary)"
                    className="w-full p-2 border rounded mt-2"
                    value={newMember.image}
                    onChange={(e) => setNewMember({...newMember, image: e.target.value})}
                  />
                </div>
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Add Member
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.members?.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden relative group">
              {isEditable && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition space-x-2">
                  <button
                    onClick={() => setEditingId(editingId === member.id ? null : member.id)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  >
                    {editingId === member.id ? 'Save' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
              
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">👤</span>
                </div>
              )}
              
              <div className="p-6">
                {editingId === member.id ? (
                  <>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleUpdate(member.id, 'name', e.target.value)}
                      className="w-full mb-2 p-1 border rounded"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleUpdate(member.id, 'role', e.target.value)}
                      className="w-full mb-2 p-1 border rounded"
                    />
                    <textarea
                      value={member.bio}
                      onChange={(e) => handleUpdate(member.id, 'bio', e.target.value)}
                      className="w-full p-1 border rounded"
                      rows="3"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-600 mb-3">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}