import React, { useState } from 'react';
import { format } from 'date-fns';

export default function EventCalendar({ data, isEditable = false, onChange }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: 'General',
    capacity: 0,
    registered: 0,
    price: 'Free'
  });
  
  const categories = ['General', 'Workshop', 'Networking', 'Social', 'Training'];
  
  const handleAdd = () => {
    if (newEvent.title && newEvent.date) {
      const event = {
        ...newEvent,
        id: Date.now().toString(),
        capacity: parseInt(newEvent.capacity) || 0,
        registered: 0
      };
      onChange('upcomingEvents', [...(data.upcomingEvents || []), event]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        image: '',
        category: 'General',
        capacity: 0,
        registered: 0,
        price: 'Free'
      });
      setShowAddForm(false);
    }
  };
  
  const handleUpdate = (id, field, value) => {
    const updated = data.upcomingEvents.map(event => 
      event.id === id ? { ...event, [field]: value } : event
    );
    onChange('upcomingEvents', updated);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Delete this event?')) {
      onChange('upcomingEvents', data.upcomingEvents.filter(e => e.id !== id));
    }
  };
  
  const sortedEvents = [...(data.upcomingEvents || [])].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
  
  const upcomingEvents = sortedEvents.filter(event => 
    new Date(event.date) >= new Date().setHours(0, 0, 0, 0)
  );
  
  const getCategoryColor = (category) => {
    const colors = {
      General: 'bg-blue-100 text-blue-800',
      Workshop: 'bg-purple-100 text-purple-800',
      Networking: 'bg-green-100 text-green-800',
      Social: 'bg-yellow-100 text-yellow-800',
      Training: 'bg-red-100 text-red-800'
    };
    return colors[category] || colors.General;
  };
  
  return (
    <div className="py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">
            {data.title || 'Upcoming Events'}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Calendar
            </button>
          </div>
        </div>
        
        {isEditable && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              {showAddForm ? 'Cancel' : 'Add Event'}
            </button>
          </div>
        )}
        
        {showAddForm && (
          <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full p-2 border rounded"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Time (e.g., 6:00 PM - 8:00 PM)"
                  className="p-2 border rounded"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="w-full p-2 border rounded"
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded"
                rows="4"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              />
              <div className="grid grid-cols-3 gap-4">
                <select
                  className="p-2 border rounded"
                  value={newEvent.category}
                  onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Capacity"
                  className="p-2 border rounded"
                  value={newEvent.capacity}
                  onChange={(e) => setNewEvent({...newEvent, capacity: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Price"
                  className="p-2 border rounded"
                  value={newEvent.price}
                  onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Image upload will be connected by Person B</p>
                  <input
                    type="text"
                    placeholder="Image URL (temporary)"
                    className="w-full p-2 border rounded mt-2"
                    value={newEvent.image}
                    onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
                  />
                </div>
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                Add Event
              </button>
            </div>
          </div>
        )}
        
        {viewMode === 'list' ? (
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6 relative group">
                {isEditable && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition space-x-2">
                    <button
                      onClick={() => setEditingId(editingId === event.id ? null : event.id)}
                      className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                      {editingId === event.id ? 'Save' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
                
                <div className="flex gap-6">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-48 h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="w-48 h-32 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-3xl">📅</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    {editingId === event.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => handleUpdate(event.id, 'title', e.target.value)}
                          className="w-full p-1 border rounded font-semibold"
                        />
                        <input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleUpdate(event.id, 'date', e.target.value)}
                          className="p-1 border rounded"
                        />
                        <input
                          type="text"
                          value={event.time}
                          onChange={(e) => handleUpdate(event.id, 'time', e.target.value)}
                          className="p-1 border rounded"
                        />
                        <input
                          type="text"
                          value={event.location}
                          onChange={(e) => handleUpdate(event.id, 'location', e.target.value)}
                          className="w-full p-1 border rounded"
                        />
                        <textarea
                          value={event.description}
                          onChange={(e) => handleUpdate(event.id, 'description', e.target.value)}
                          className="w-full p-1 border rounded"
                          rows="3"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-semibold">{event.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(event.category)}`}>
                            {event.category}
                          </span>
                        </div>
                        <div className="space-y-2 text-gray-600">
                          <p>📅 {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</p>
                          <p>🕐 {event.time}</p>
                          <p>📍 {event.location}</p>
                          {event.capacity > 0 && (
                            <p>👥 {event.registered}/{event.capacity} registered</p>
                          )}
                          <p>💵 {event.price}</p>
                        </div>
                        <p className="mt-3 text-gray-700">{event.description}</p>
                        {!isEditable && event.capacity > event.registered && (
                          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            Register Now
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 text-center">Calendar view coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}