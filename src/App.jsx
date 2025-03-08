import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaExpand, 
  FaCompress, 
  FaSearchPlus, 
  FaSearchMinus 
} from 'react-icons/fa';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Local image imports
import image1 from './assets/1.jpg';
import image2 from './assets/2.jpg';
import image3 from './assets/3.jpg';
import image4 from './assets/4.jpg';

// Flip sound
import flipSound from './assets/flip.mp3';

const images = [image1, image2, image3, image4];

const FlipBook = () => {
  // Refs for flipbook and container (for full-screen)
  const flipBookRef = useRef(null);
  const containerRef = useRef(null);
  const audioRef = useRef(new Audio(flipSound));

  // State for zoom and full-screen mode
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    audioRef.current.load();
  }, []);

  // Play sound on page flip
  const handleFlipStart = (e) => {
    if (e.data === 'flipping') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  // Navigation handlers
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

  // Zoom controls (limits can be adjusted)
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  // Toggle full-screen using the Fullscreen API
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error(err));
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="container-fluid full-height d-flex flex-column justify-content-center align-items-center"
    >
      {/* Top Navigation Bar */}
      <div className="top-navigation d-flex justify-content-between w-100 px-3">
        <div className="d-flex">
          <button className="nav-button" onClick={handlePrevPage}>
            <FaArrowLeft size={24} />
          </button>
          <button className="nav-button" onClick={handleNextPage}>
            <FaArrowRight size={24} />
          </button>
        </div>
        <div className="d-flex">
          <button className="nav-button" onClick={handleZoomOut}>
            <FaSearchMinus size={24} />
          </button>
          <button className="nav-button" onClick={handleZoomIn}>
            <FaSearchPlus size={24} />
          </button>
          <button className="nav-button" onClick={toggleFullscreen}>
            {isFullscreen ? <FaCompress size={24} /> : <FaExpand size={24} />}
          </button>
        </div>
      </div>

      {/* FlipBook Container with zoom transform */}
      <div className="flipbook-container mt-3" style={{ transform: `scale(${zoom})` }}>
        <HTMLFlipBook
          width={350}
          height={700}
          showCover={false}
          flippingTime={1000}
          drawShadow={false}
          onChangeState={handleFlipStart}
          ref={flipBookRef}
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
