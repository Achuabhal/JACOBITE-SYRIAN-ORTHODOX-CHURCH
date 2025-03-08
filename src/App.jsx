import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css'; // Ensure this includes styles for hardware acceleration
import 'bootstrap/dist/css/bootstrap.min.css';

// List of local image imports
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';

// Import the flip sound file
import flipSound from './assets/flip.mp3';

const images = [image1, image2, image3, image4];

const FlipBook = () => {
  // Create refs for the FlipBook and audio elements
  const flipBookRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound));

  useEffect(() => {
    audioRef.current.load();
  }, []);

  // Handler to play sound when flipping starts
  const handleFlipStart = (e) => {
    if (e.data === 'flipping') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Handlers for navigation buttons
  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="container-fluid full-height d-flex flex-column justify-content-center align-items-center">
      {/* Navigation Buttons */}
      <div className="navigation-buttons d-flex justify-content-between w-100 px-3">
        <button className="nav-button" onClick={handlePrevPage}>
          <FaArrowLeft size={24} />
        </button>
        <button className="nav-button" onClick={handleNextPage}>
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* FlipBook Container */}
      <div className="flipbook-container mt-3">
        <HTMLFlipBook
          width={500}
          height={700}
          showCover={false}
          flippingTime={1000}  // Increase flipping duration for smoother animation
          drawShadow={false}   // Disable shadows for better performance
          onChangeState={handleFlipStart} // Play sound when flip begins
          ref={flipBookRef}   // Reference to FlipBook instance
          className="flipbook"
        >
          {images.map((src, index) => (
            <div key={index} className="page">
              <img
                src={src}
                alt={`Page ${index + 1}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default FlipBook;
