import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and container
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import VideoModal from "./VideoModal"; // Import the modal component
import "./ReviewContent.css";

const ReviewContent = () => {
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [selectedContentDetails, setSelectedContentDetails] = useState(null);

  // Fetch data from all endpoints
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/contents").then((res) => res.json()),
      fetch("http://localhost:5000/posts").then((res) => res.json()),
      fetch("http://localhost:5000/videos").then((res) => res.json()),
      fetch("http://localhost:5000/audios").then((res) => res.json()),
    ])
      .then(([contentData, postData, videoData, audioData]) => {
        setContents(contentData);
        setPosts(postData);
        setVideos(videoData);
        setAudios(audioData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch content data");
      });
  }, []);

  // Handle opening content modal and fetching content details
  const openModal = (contentId) => {
    setSelectedContentId(contentId);
    const content =
      [...videos, ...audios, ...posts].find((content) => content.id === contentId) ||
      null;
    setSelectedContentDetails(content);
  };

  // Handle closing content modal
  const closeModal = () => {
    setSelectedContentId(null);
    setSelectedContentDetails(null);
  };

  // Handle Like button action
  const handleLike = (contentId) => {
    const updatedContents = [...videos, ...audios, ...posts].map((content) => {
      if (content.id === contentId) {
        return {
          ...content,
          likeCount: (content.likeCount || 0) + 1, // Increment like count
        };
      }
      return content;
    });

    setContents(updatedContents);
    toast.success("You liked the content!");
  };

  // Handle Share button action
  const handleShare = (contentId) => {
    const contentToShare =
      [...videos, ...audios, ...posts].find((content) => content.id === contentId) ||
      null;

    if (contentToShare) {
      const shareLink = `https://www.example.com/${contentToShare.id}`;
      navigator.clipboard.writeText(shareLink); // Copy link to clipboard
      toast.info("Share link copied to clipboard!");
    }
  };

  // Handle Comment submission
  const handleComment = (contentId, commentText) => {
    if (!commentText.trim()) return; // Prevent submitting empty comments

    const updatedContents = [...videos, ...audios, ...posts].map((content) => {
      if (content.id === contentId) {
        return {
          ...content,
          comments: [
            ...(content.comments || []),
            { user: "User", text: commentText, timestamp: new Date().toISOString() },
          ],
        };
      }
      return content;
    });

    setContents(updatedContents);
    toast.success("Your comment has been added!");
  };

  return (
    <div className="review-container">
      <ToastContainer position="top-right" autoClose={3000} /> {/* Add ToastContainer */}
      <h1>Review Content</h1>
      <p>Review the content submitted by users.</p>

      <div className="content-grid">
        {[...videos, ...audios, ...posts].map((content) => (
          <div key={content.id} className="content-item">
            {content.image && <img src={content.image} alt={content.title} />}
            <h3>{content.title}</h3>
            <p>{content.description || content.contentType}</p>
            <div className="content-actions">
              <button onClick={() => handleLike(content.id)}>Like ({content.likeCount || 0})</button>
              <button onClick={() => handleShare(content.id)}>Share</button>
              <button onClick={() => openModal(content.id)}>View Details</button>
            </div>
          </div>
        ))}
      </div>

      {selectedContentDetails && (
        <VideoModal
          content={selectedContentDetails}
          closeModal={closeModal}
          handleComment={handleComment}
        />
      )}
    </div>
  );
};

export default ReviewContent;
