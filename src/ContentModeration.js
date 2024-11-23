import React, { useState, useEffect } from 'react';
import './ContentModeration.css'; // Ensure professional styling

const fetchContent = async (endpoint) => {
  const response = await fetch(`http://localhost:5000/${endpoint}`);
  const data = await response.json();
  return data;
};

const ContentModeration = () => {
  const [contentType, setContentType] = useState('all'); // Default to all content
  const [content, setContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetching content and users
  useEffect(() => {
    const getContent = async () => {
      let data;
      if (contentType === 'all') {
        // Fetch content from all relevant endpoints
        const contents = await fetchContent('contents');
        const posts = await fetchContent('posts');
        const videos = await fetchContent('videos');
        const audios = await fetchContent('audios');
        data = [...contents, ...posts, ...videos, ...audios]; // Combine all data
      } else {
        // Fetch based on selected content type
        data = await fetchContent(contentType);
      }
      setContent(data);
    };

    const getUsers = async () => {
      const data = await fetchContent('users');
      setUsers(data);
    };

    getContent();
    getUsers();
  }, [contentType]);

  // Approve content
  const handleApprove = async (id) => {
    await fetch(`http://localhost:5000/content/${id}/approve`, { method: 'POST' });
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'approved' } : item))
    );
  };

  // Flag content
  const handleFlag = async (id) => {
    await fetch(`http://localhost:5000/content/${id}/flag`, { method: 'POST' });
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'flagged' } : item))
    );
  };

  // Delete content
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/content/${id}`, { method: 'DELETE' });
    setContent((prev) => prev.filter((item) => item.id !== id));
  };

  // Deactivate user
  const handleDeactivateUser = async (userId) => {
    await fetch(`http://localhost:5000/users/${userId}/deactivate`, { method: 'PATCH' });
    setUsers((prev) => prev.map((user) =>
      user.id === userId ? { ...user, status: 'inactive' } : user
    ));
  };

  // Modal handlers
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="content-moderation">
      <header>
        <h1>Manage Content</h1>
      </header>

      <div className="dashboard">
        <div className="stats">
          <h2>Statistics</h2>
          <div className="stat-cards">
            <div className="card">Total Users: {users.length}</div>
            <div className="card">Total Content: {content.length}</div>
          </div>
        </div>
        <div className="filters">
          <h2>Content Filters</h2>
          <select onChange={(e) => setContentType(e.target.value)} value={contentType}>
            <option value="all">All</option>
            <option value="posts">Posts</option>
            <option value="contents">Contents</option>
            <option value="videos">Videos</option>
            <option value="audios">Audios</option>
          </select>
        </div>
      </div>

      <div className="content-list">
        {content.map((item) => (
          <div key={item.id} className={`content-item ${item.status}`}>
            <h3>{item.title}</h3>
            {item.image && <img src={item.image} alt={item.title} />}
            <p>{item.text || item.description}</p>
            <p>Status: {item.status || 'pending'}</p>
            <div className="actions">
              <button onClick={() => handleApprove(item.id)}>Approve</button>
              <button onClick={() => handleFlag(item.id)}>Flag</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.text || selectedItem.description}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;
