import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Only import Route and Routes here
import Login from './Login'; // Import the Login component
import Dashboard from './Dashboard'; // Import the Dashboard component

function App() {
  return (
    <Routes>
      {/* Route for the Login page */}
      <Route path="/" element={<Login />} />
      
      {/* Route for the Dashboard page */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
