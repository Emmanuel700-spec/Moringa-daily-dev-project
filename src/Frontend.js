import React, { useState } from 'react';
import './Frontend.css';
import Navbar from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({
        content,
        image: '/api/placeholder/600/400',
      });
      setContent('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FrontendFeature = ({ 
  image, 
  content, 
  likes, 
  dislikes, 
  isBookmarked,
  onLike, 
  onDislike, 
  onBookmark,
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="frontend-feature">
      <div className="feature-image-container">
        <img src={image} alt="Frontend" className="feature-image" />
      </div>
      <div className="frontend-feature-info">
        <div className="feature-text">
          {content}
        </div>
        <div className="frontend-feature-actions">
          <button className="action-btn like-btn" onClick={onLike}>
            <FaThumbsUp size={18} />
            <span>{likes}</span>
          </button>
          <button className="action-btn dislike-btn" onClick={onDislike}>
            <FaThumbsDown size={18} />
            <span>{dislikes}</span>
          </button>
          <button 
            className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} 
            onClick={onBookmark}
          >
            {isBookmarked ? 
              <FaBookmarkSolid size={18} /> : 
              <FaRegBookmark size={18} />
            }
          </button>
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-input">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleCommentSubmit}>Post</button>
        </div>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment.avatar} alt="User avatar" className="comment-avatar" />
              <div className="comment-content">
                <span className="comment-username">{comment.username}</span>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FrontendComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'data:image/jpeg;base64,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',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6eL2mmqHf7IfbKwvEULxVREUkF2Zb02ekA&s',
      content: 'Responsive design is key in frontend development to ensure accessibility across devices.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dev_mike", text: "Awesome explanation!" },
        { avatar: "/api/placeholder/32/32", username: "web_queen", text: "This was really helpful!" }
      ]
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyBQbvKj_s7k3D3ZZeop4AN5so29A4Qic2Cw&s',
      content: 'Responsive design is key in frontend development to ensure accessibility across devices.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "dev_mike", text: "Awesome explanation!" },
        { avatar: "/api/placeholder/32/32", username: "web_queen", text: "This was really helpful!" }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx6kr5ZGHpRdIdyA5fGw5FXTaH4unzccJUkg&s',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnZlLCRAcL0_3yN9Sfk6Jg7inpsARJqllhSg&s',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxsI6xv8P-tG5otOUq3gFTEtwCiUGD-jm6cw&s',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOhDYiGIrN_bzb62SIbPFHi8njcWkoZLo9Q&s',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrDo7aNtLm_0pkiFKI2_ykGO3WmtYeo4iSJA&s',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
    {
      id: 1,
      image: 'data:image/jpeg;base64,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',
      content: 'Frontend development focuses on creating user interfaces and interactions on the web.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "john_doe", text: "Great post!" },
        { avatar: "/api/placeholder/32/32", username: "jane_doe", text: "Really informative." }
      ]
    },
  ]);

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      likes: 0,
      dislikes: 0,
      isBookmarked: false,
      comments: []
    };
    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
    ));
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, {
          avatar: "/api/placeholder/32/32",
          username: "user" + Math.floor(Math.random() * 1000),
          text: newComment
        }]
      } : post
    ));
  };

  return (
    <>
      <Navbar />
      <div className="frontend-container">
        <Sidebar /> {/* Add Sidebar here */}
        <div className="frontend-content">
          <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Create Post
          </button>
          <div className="frontend-features">
            {posts.map((post) => (
              <FrontendFeature
                key={post.id}
                image={post.image}
                content={post.content}
                likes={post.likes}
                dislikes={post.dislikes}
                isBookmarked={post.isBookmarked}
                comments={post.comments}
                onLike={() => handleLike(post.id)}
                onDislike={() => handleDislike(post.id)}
                onBookmark={() => handleBookmark(post.id)}
                onAddComment={(comment) => handleAddComment(post.id, comment)}
              />
            ))}
          </div>
          <CreatePostModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreatePost}
          />
        </div>
      </div>
    </>
  );
};

export default FrontendComponent;
