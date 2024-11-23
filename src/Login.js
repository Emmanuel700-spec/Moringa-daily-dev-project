// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Login.css';
// import Navbar from './Navbar';
// import Footer from './Footer';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Fetch all users from the db.json
//       const response = await fetch('http://localhost:5000/users');
//       const users = await response.json();

//       // Find the user with matching email and password
//       const user = users.find(u => u.email === email && u.password === password);

//       if (user) {
//         console.log(user); // Log user object to check response

//         // Check if a user role exists
//         if (!user.role) {
//           setErrorMessage('User role is missing.');
//           return;
//         }

//         // Store user ID and role in localStorage
//         localStorage.setItem('userId', user.id);
//         localStorage.setItem('userRole', user.role);

//         // Redirect based on user role
//         if (user.role === 'admin') {
//           console.log('Redirecting to AdminDashboard');
//           navigate('/AdminDashboard');
//         } else if (user.role === 'techwriter') {
//           console.log('Redirecting to TechWriterDashboard');
//           navigate('/techwriter-dashboard');
//         } else if (user.role === 'user') {
//           console.log('Redirecting to UserDashboard');
//           navigate('/user-dashboard');
//         } else {
//           setErrorMessage('Role not recognized.');
//         }
//       } else {
//         setErrorMessage('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setErrorMessage('Error logging in. Please try again later.');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="login-container">
//         <h2>Login</h2>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <label htmlFor="email">Email:</label>
//             <input 
//               type="email" 
//               id="email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//               required 
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password:</label>
//             <input 
//               type="password" 
//               id="password" 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//               required 
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         <div className="signup-link">
//           <p>Don't have an account? <a href="/signup">Sign up</a></p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch all users from the db.json
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      // Find the user with matching email and password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        console.log(user); // Log user object to check response

        // Check if a user role exists
        if (!user.role) {
          setErrorMessage('User role is missing.');
          return;
        }

        // Store the entire user object in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect based on user role
        if (user.role === 'admin') {
          console.log('Redirecting to AdminDashboard');
          navigate('/AdminDashboard');
        } else if (user.role === 'techwriter') {
          console.log('Redirecting to TechWriterDashboard');
          navigate('/techwriter-dashboard');
        } else if (user.role === 'user') {
          console.log('Redirecting to UserDashboard');
          navigate('/user-dashboard');
        } else {
          setErrorMessage('Role not recognized.');
        }
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
