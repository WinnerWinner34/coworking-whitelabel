import React, { useState } from 'react';

export default function ImageUpload({ 
  currentImage, 
  onImageSelect, 
  label = "Upload Image",
  acceptedFormats = "image/*",
  maxSize = 5 // MB
}) {
  const [preview, setPreview] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  const handleFileSelect = async (file) => {
    if (!file) return;
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    setUploading(true);
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // In a real app, this would upload to Person B's backend
      // For now, we'll simulate with a timeout and use the local preview
      setTimeout(() => {
        onImageSelect(preview || file.name); // Temporary - Person B will implement actual upload
        setUploading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setUploading(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleRemove = () => {
    setPreview(null);
    onImageSelect('');
  };
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full max-w-md h-48 object-cover rounded-lg"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            type="button"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
        >
          <div className="space-y-4">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div>
              <p className="text-gray-600">
                {uploading ? 'Uploading...' : 'Drag and drop an image here, or'}
              </p>
              <label className="mt-2 inline-block">
                <input
                  type="file"
                  accept={acceptedFormats}
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  className="hidden"
                  disabled={uploading}
                />
                <span className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition">
                  Browse Files
                </span>
              </label>
            </div>
            
            <p className="text-xs text-gray-500">
              Maximum file size: {maxSize}MB
            </p>
          </div>
        </div>
      )}
      
      {uploading && (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Uploading...</span>
        </div>
      )}
      
      <p className="text-xs text-gray-500 italic">
        Note: Image upload will be fully connected to Person B's backend storage service
      </p>
    </div>
  );
}