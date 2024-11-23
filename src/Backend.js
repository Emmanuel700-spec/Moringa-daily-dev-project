import React, { useState } from 'react';
import './Backend.css'; // Import external CSS file for styling
import Navbaruser from './Navbaruser';
import Sidebar from './Sidebar-adding'; // Import Sidebar
import { FaThumbsUp, FaThumbsDown, FaPlus, FaBookmark as FaBookmarkSolid, FaRegBookmark } from 'react-icons/fa';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit({
        description,
        image: '/api/placeholder/600/400'
      });
      setDescription('');
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's on your mind about Backend?"
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

const BackendFeature = ({ 
  image, 
  description, 
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
    <div className="devops-feature">
      <div className="feature-image-container">
        <img src={image} alt="Backend" className="feature-image" />
      </div>
      <div className="devops-feature-info">
        <div className="feature-text">
          {description}
        </div>
        <div className="devops-feature-actions">
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

const BackendComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12nPY60wXMYF9CwroNFdR7NyWvlXeBYFZMA&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 2,
      image: 'data:image/jpeg;base64,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',
      description: 'APIs enable communication between the backend and other systems, allowing data exchange and integration with external services.',
      likes: 35,
      dislikes: 5,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "jjydjjd", text: "Amazing explanation!" },
        { avatar: "/api/placeholder/32/32", username: "ukgkkuikg", text: "This helps a lot!" }
      ]
    },
    {
      id: 3,
      image: 'data:image/jpeg;base64,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',
      description: 'Backend development ensures data security by implementing authentication, authorization, and encryption protocols.',
      likes: 38,
      dislikes: 6,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "gjkdklgi", text: "Very informative!" },
        { avatar: "/api/placeholder/32/32", username: "lgjdlfljhkjhuy", text: "Great post!" }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhaSqfkcxaJeAF86_mTpufti5cltYgSZaYaQ&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTprjIdIMe7zKANsVvfOVpo4MED8bpuB-D_0g&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTgTpnKRPCsVLK95UC5IbDz2pr2jYQmCoiA&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVwUNTSyDDJOfactZ_ksijfg80KFPKoS5vA&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nfj8g2X-9_CxsKtfddUOexjUBN10WucCNg&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSyECd5krwmWdMalrGQEMiqDT_5qdChtQpgw&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhtcgZ4AS0KGy2xlwjl6GsX-wcNcjqobXBQ&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
      ]
    },
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-E_9VJ6xFq1olzYKkLy1P40eoy_vc6OHeVw&s',
      description: 'Backend development handles the server-side operations of an application, including logic, database connections, and authentication.',
      likes: 42,
      dislikes: 8,
      isBookmarked: false,
      comments: [
        { avatar: "/api/placeholder/32/32", username: "hwduidfgeruatjhvjknm", text: "Great insights!" },
        { avatar: "/api/placeholder/32/32", username: "edgfjhnhjfjg", text: "Very helpful." }
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
      <Navbaruser />
      <div className="devops-container">
        <Sidebar /> {/* Add Sidebar here */}
        <div className="devops-main-content">
          <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
            <FaPlus /> Create Post
          </button>
          <div className="devops-features">
            {posts.map((post) => (
              <BackendFeature
                key={post.id}
                image={post.image}
                description={post.description}
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

export default BackendComponent;
