import React, { useEffect, useState } from "react";
import "./TechWriterVideos.css";

const TechWriterContents = () => {
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", contentType: "" });
  const [selectedContentType, setSelectedContentType] = useState('videos'); // Default to videos

  // Fetch content from the backend based on selected type
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${selectedContentType}`);
        const data = await response.json();
        setContents(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContents();
  }, [selectedContentType]);

  // Handle content type selection
  const handleContentTypeChange = (type) => {
    setSelectedContentType(type);
  };

  // Handle click on the pen icon to edit
  const handleEditClick = (content) => {
    setEditingContent(content.id); // Set the current content ID for editing
    setFormData({ title: content.title, description: content.description, contentType: selectedContentType }); // Pre-fill form
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/${formData.contentType}/${editingContent}`, {
      method: "PUT", // Update content details
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedContent) => {
        // Update the content in the local state
        setContents((prevContents) =>
          prevContents.map((content) =>
            content.id === editingContent ? updatedContent : content
          )
        );
        setEditingContent(null); // Close the editing form
      })
      .catch((error) => console.error("Error updating content:", error));
  };

  return (
    <div className="content-container">
      {/* Content Type Selection */}
      <div className="content-type-selector">
        <button onClick={() => handleContentTypeChange('videos')}>Videos</button>
        <button onClick={() => handleContentTypeChange('posts')}>Posts</button>
        <button onClick={() => handleContentTypeChange('audios')}>Audios</button>
      </div>

      {/* Display Contents in a Grid */}
      <div className="content-grid">
        {contents.map((content) => (
          <div className="content-card" key={content.id}>
            {selectedContentType === 'videos' && (
              <iframe
                src={`https://www.youtube.com/embed/${content.videoId}`}
                title={content.title}
                className="content-iframe"
              ></iframe>
            )}
            {selectedContentType === 'audios' && (
              <audio controls>
                <source src={content.audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
            <div className="content-details">
              <h3>{content.title}</h3>
              <p>{content.description}</p>
              <button className="edit-button" onClick={() => handleEditClick(content)}>
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editingContent && (
        <div className="edit-form-container">
          <h2>Edit Content</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => setEditingContent(null)}
              className="cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TechWriterContents;
