import React, { useState, useEffect } from 'react';
import './ManageCategories.css'; // External stylesheet for styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryContent, setCategoryContent] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    categoryId: null,
  });

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories!', error);
        toast.error('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  const fetchCategoryContent = (categoryName) => {
    setLoading(true);
    fetch('http://localhost:5000/categories')
      .then((response) => response.json())
      .then((data) => {
        const filteredContent = data.filter(
          (item) => item.category === categoryName
        );
        setCategoryContent(filteredContent);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category content!', error);
        toast.error('Failed to load content. Please try again later.');
        setLoading(false);
      });
  };

  // Define the handleCategoryClick function
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    fetchCategoryContent(categoryName);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      toast.warn('Category name cannot be empty.');
      return;
    }

    fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data]);
        setNewCategory('');
        setShowAddCategoryForm(false);
        toast.success('Category added successfully!');
      })
      .catch((error) => {
        console.error('Error adding category!', error);
        toast.error('Failed to add category. Please try again later.');
      });
  };

  const handleDeleteCategory = (id) => {
    fetch(`http://localhost:5000/categories/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
        if (selectedCategory === id) {
          setCategoryContent([]);
          setSelectedCategory(null);
        }
        toast.info('Category deleted successfully.');
        setDeleteConfirmation({ show: false, categoryId: null });
      })
      .catch((error) => {
        console.error('Error deleting category!', error);
        toast.error('Failed to delete category. Please try again later.');
      });
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditingCategory(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleSaveEditedCategory = (categoryId) => {
    if (editedCategoryName.trim() === '') {
      toast.warn('Category name cannot be empty.');
      return;
    }

    fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editedCategoryName }),
    })
      .then((response) => response.json())
      .then(() => {
        setCategories(
          categories.map((category) =>
            category.id === categoryId
              ? { ...category, name: editedCategoryName }
              : category
          )
        );
        setEditingCategory(null);
        setEditedCategoryName('');
        toast.success('Category updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating category!', error);
        toast.error('Failed to update category. Please try again later.');
      });
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation({ show: true, categoryId: id });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ show: false, categoryId: null });
  };

  return (
    <div className="manage-categories">
      <ToastContainer />
      <h2 className="heading">Manage Categories</h2>
      <p className="description">
        As an admin or tech writer, you can create, delete, and organize categories for content on the platform.
      </p>

      <button
        onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
        className="btn add-category-btn"
      >
        {showAddCategoryForm ? 'Cancel' : 'Add Category'}
      </button>

      {showAddCategoryForm && (
        <div className="add-category-section">
          <h3 className="add-category-title">Add New Category</h3>
          <div className="category-form">
            <input
              type="text"
              placeholder="Enter new category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="input-field"
            />
            <button onClick={handleAddCategory} className="btn add-category-btn">
              Add Category
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <ul className="category-list">
          {categories.length === 0 ? (
            <li className="no-categories">No categories available</li>
          ) : (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <div className="category-info">
                  {editingCategory === category.id ? (
                    <div className="edit-category">
                      <input
                        type="text"
                        value={editedCategoryName}
                        onChange={(e) => setEditedCategoryName(e.target.value)}
                        className="input-field"
                      />
                      <button
                        onClick={() => handleSaveEditedCategory(category.id)}
                        className="btn save-category-btn"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span
                      className="category-name"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </span>
                  )}

                  <button
                    onClick={() => handleEditCategory(category.id, category.name)}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => openDeleteConfirmation(category.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}

      {selectedCategory && (
        <div className="category-content">
          <h3>Content for {selectedCategory}</h3>
          {categoryContent.length === 0 ? (
            <p>No content available for this category</p>
          ) : (
            <ul>
              {categoryContent.map((content) => (
                <li key={content.id} className="content-item">
                  {content.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {deleteConfirmation.show && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this category?</p>
            <button
              onClick={() => handleDeleteCategory(deleteConfirmation.categoryId)}
              className="btn confirm-btn"
            >
              Yes, Delete
            </button>
            <button onClick={closeDeleteConfirmation} className="btn cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
