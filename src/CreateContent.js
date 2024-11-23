import React, { useState } from 'react';
import './CreateContent.css';

const CreateContent = () => {
  // State to hold content form data
  const [content, setContent] = useState({
    type: '',
    title: '',
    user: '',
    text: '',
    category: 'DevOps', // Default category
  });

  // State to manage form submission loading, error messages, and success messages
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!content.type || !content.title || !content.user || !content.text) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true); // Start loading
    setErrorMessage(''); // Clear error message
    setSuccessMessage(''); // Clear success message

    // Send the data to your backend (JSON Server in this case)
    fetch('http://localhost:5000/contents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create content');
        }
        return response.json();
      })
      .then((data) => {
        // Show success message and reset the form
        setSuccessMessage('Content created successfully on Moringa School Daily Dev!');
        console.log('Content created:', data);

        setContent({
          type: '',
          title: '',
          user: '',
          text: '',
          category: 'DevOps',
        });
      })
      .catch((error) => {
        setErrorMessage('Error creating content: ' + error.message);
      })
      .finally(() => {
        setIsSubmitting(false); // End loading
      });
  };

  return (
    <div className="create-content">
      <h1>Create New Content</h1>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-group">
          <label htmlFor="type">Content Type</label>
          <select
            name="type"
            value={content.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="post">Post</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={content.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user">User</label>
          <input
            type="text"
            id="user"
            name="user"
            value={content.user}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">Content Text</label>
          <textarea
            id="text"
            name="text"
            value={content.text}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            value={content.category}
            onChange={handleChange}
            required
          >
            <option value="DevOps">DevOps</option>
            <option value="Frontend">Frontend</option>
            <option value="Full stack">Full stack</option>
          </select>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Content'}
        </button>
      </form>
    </div>
  );
};

export default CreateContent;

