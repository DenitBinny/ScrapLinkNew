import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import bg1 from './assets/bg1.png';  
import bg2 from './assets/bg2.png';
import bg3 from './assets/bg3.png';
import { scrapauth } from './firebase';  
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';  

const Login = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginPage, setIsLoginPage] = useState(true); 
  const [errorMessage, setErrorMessage] = useState("");  
  const [successMessage, setSuccessMessage] = useState("");  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  
  const navigate = useNavigate();

  const backgroundImages = [bg1, bg2, bg3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFormToggle = () => {
    setIsLoginPage(!isLoginPage); 
  };

  // Password Validation Logic
  const validatePassword = (password) => {
    const passwordRegex = /[a-zA-Z]/;  // Ensures at least one letter is present
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!passwordRegex.test(password)) {
      return "Password must contain at least one letter.";
    }
    return null;  // No errors if validation passes
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setErrorMessage(passwordValidationError);
      setSuccessMessage("");  
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(scrapauth, email, password);

      // Send verification email
      await sendEmailVerification(userCredential.user);

      setSuccessMessage("Registration successful! Please check your inbox to verify your email.");
      setErrorMessage("");  
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");  
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with Firebase authentication
      await signInWithEmailAndPassword(scrapauth, email, password);
      setErrorMessage(""); // Clear any previous error messages
      navigate('/dashboard'); // Redirect to the dashboard on successful login
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',  // Ensure full height
      width: '100vw',      // Ensure full width
      backgroundColor: '#00050B',
      backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      transition: 'background-image 1s ease-in-out',
    }}>
      <div style={{
        background: 'rgba(26, 29, 35, 0.7)',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ textAlign: 'center', color: '#fff' }}>{isLoginPage ? 'Login' : 'Create Account'}</h1>
        <form onSubmit={isLoginPage ? handleLogin : handleCreateAccount}>
          {!isLoginPage && (
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={{
                display: 'block',
                marginBottom: '5px',
                color: '#fff',
                fontWeight: 'bold',
              }}>Your Name</label>
              <input type="text" id="name" style={{
                width: '97%',
                padding: '10px',
                marginBottom: '5px',
                borderRadius: '8px',
                border: '1px solid #fff',
                backgroundColor: '#2C2F38',
                color: '#fff',
              }} />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '5px',
              color: '#fff',
              fontWeight: 'bold',
            }}>Your Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
              width: '97%',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '8px',
              border: '1px solid #fff',
              backgroundColor: '#2C2F38',
              color: '#fff',
            }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '5px',
              color: '#fff',
              fontWeight: 'bold',
            }}>Your Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
              width: '97%',
              padding: '10px',
              marginBottom: '5px',
              borderRadius: '8px',
              border: '1px solid #fff',
              backgroundColor: '#2C2F38',
              color: '#fff',
            }} />
          </div>

          {isLoginPage && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe" style={{ marginLeft: '5px', color: '#fff' }}>Remember Me</label>
              </div>
              <span style={{ color: '#fff' }}>Forget Password?</span>
            </div>
          )}

          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#943B15ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
            {isLoginPage ? 'Login' : 'Create Account'}
          </button>

          {successMessage && (
            <div style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <span style={{ color: '#fff' }}>
              {isLoginPage ? (
                <>
                  New Here? <Link to="#" onClick={handleFormToggle} style={{ color: '#fff' }}>Create an Account</Link>
                </>
              ) : (
                <>
                  Already Have an Account? <Link to="#" onClick={handleFormToggle} style={{ color: '#fff' }}>Login</Link>
                </>
              )}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
