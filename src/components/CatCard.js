import React, { useState, useRef } from "react"; // Import necessary hooks
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion for animations

const CatCard = ({ image, onSwipe }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // Starting point of the drag
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Current offset during drag
  const [isDragging, setIsDragging] = useState(false);// Is the card being dragged
  const [isAnimating, setIsAnimating] = useState(false); // Is the card in the process of animating out
  const cardRef = useRef(null);

  const SWIPE_THRESHOLD = 100; // Minimum distance to consider a swipe

  const handleDragStart = (e) => {
    if (isAnimating) return;// Prevent new drags while animating
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true); // Start dragging
  };

  const handleDragMove = (e) => { // Update drag offset as the user moves the mouse/finger
    if (!isDragging || isAnimating) return; // Only track if dragging and not animating
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const offsetX = clientX - dragStart.x;
    const offsetY = clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY }); // Update the offset state
  };

  const handleDragEnd = () => { // Determine if the drag was a swipe or should return to center
    if (!isDragging || isAnimating) return; // Only process if dragging and not animating
    setIsDragging(false); // Stop dragging

    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) { // Check if swipe threshold is met
      const direction = dragOffset.x > 0 ? "right" : "left"; // Determine swipe direction
      handleSwipe(direction); // Trigger swipe handling
    } else {
      setDragOffset({ x: 0, y: 0 }); // Reset position if not a swipe
    }
  };

  const handleSwipe = (direction) => { // Animate the card off-screen and notify parent component
    if (isAnimating) return; // Prevent multiple swipes
    
    setIsAnimating(true); // Start animation
    const swipeDirection = direction === "right" ? 1 : -1; // Determine direction multiplier
    setDragOffset({ x: swipeDirection * 1000, y: dragOffset.y }); // Move card off-screen

    setTimeout(() => { // After animation, reset and notify parent
      onSwipe(direction); 
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300); // Duration matches CSS transition
  };

  const rotation = (dragOffset.x / 20); // Rotate card based on horizontal drag
  const opacity = Math.max(0, 1 - Math.abs(dragOffset.x) / 300); // Fade out card as it is dragged

  return ( 
    <AnimatePresence>
      <motion.div
        ref={cardRef}
        className="w-80 h-96 rounded-xl shadow-lg overflow-hidden bg-white relative cursor-grab active:cursor-grabbing select-none touch-none"
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
          transition: isAnimating ? 'all 0.3s ease-out' : isDragging ? 'none' : 'all 0.3s ease-out',
          opacity: opacity
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <img
          src={image}
          alt="Cat"
          className="w-full h-full object-cover pointer-events-none"
          draggable="false"
        />
        
        {/* LIKE stamp */}
        <div
          className="absolute top-12 left-8 border-4 border-green-500 text-green-500 font-bold text-3xl px-6 py-3 rotate-[-20deg] rounded-lg"
          style={{
            opacity: Math.max(0, Math.min(1, dragOffset.x / 150)),
            transform: `scale(${Math.max(0.8, 1 + dragOffset.x / 300)})`
          }}
        >
          LIKE
        </div>
        
        {/* NOPE stamp */}
        <div
          className="absolute top-12 right-8 border-4 border-red-500 text-red-500 font-bold text-3xl px-6 py-3 rotate-[20deg] rounded-lg"
          style={{
            opacity: Math.max(0, Math.min(1, -dragOffset.x / 150)),
            transform: `scale(${Math.max(0.8, 1 - dragOffset.x / 300)})`
          }}
        >
          NOPE
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CatCard;