
import React, { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? 'dark' : '';
  }, [dark]);

  return (
    
    <button onClick={() => setDark(!dark)} className="dark-toggle">
      {dark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
