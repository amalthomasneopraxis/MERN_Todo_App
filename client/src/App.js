import React, { useState, useEffect } from 'react';

function App() {
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Listen for the postMessage event
    const handlePostMessage = async (event) => {
      if (event.origin !== 'http://localhost:8000') {
        return; // Only accept messages from trusted origin
      }

      const sessionId = event.data.sessionId;

      // Validate the session ID by calling the validation endpoint
      const response = await fetch(`http://localhost:8000/mymarketplace/api/validate_session/?session_id=${sessionId}`);
      const result = await response.json();

      if (result) {
        setIsValidSession(true);
      } else {
        setIsValidSession(false);
      }
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

  if (!isValidSession) {
    return <h1>Invalid Session. Access Denied.</h1>;
  }

  return (
    <div className="App">
      <h1>Welcome to the External Form App</h1>
      {/* Your form logic goes here */}
    </div>
  );
}

export default App;
