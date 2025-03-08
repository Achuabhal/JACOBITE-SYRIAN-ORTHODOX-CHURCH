// src/FlipBook.jsx
import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './App.css'; // Optional: for custom styles

// List of local image imports
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';

// Import the flip sound file
import flipSound from './assets/flip.mp3';

const images = [image1, image2, image3, image4];

const FlipBook = () => {
  // Create a ref for the audio element and preload it
  const audioRef = useRef(new Audio(flipSound));

  useEffect(() => {
    audioRef.current.load();
  }, []);

  // Handler to play sound immediately on mouse down (when clicking)
  const handleMouseDown = () => {
    // Reset the audio to start from the beginning
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <div className="flipbook-container">
      <HTMLFlipBook width={500} height={700} showCover={true}>
        {images.map((src, index) => (
          // Attach the onMouseDown event to ensure the sound starts as soon as the user clicks
          <div key={index} className="page" onMouseDown={handleMouseDown}>
            <img
              src={src}
              alt={`Page ${index + 1}`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default FlipBook;
