import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CatCard = ({ image, onSwipe }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef(null);

  const SWIPE_THRESHOLD = 100;

  const handleDragStart = (e) => {
    if (isAnimating) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    setDragStart({ x: clientX, y: clientY });
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging || isAnimating) return;
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const offsetX = clientX - dragStart.x;
    const offsetY = clientY - dragStart.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      const direction = dragOffset.x > 0 ? "right" : "left";
      handleSwipe(direction);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const swipeDirection = direction === "right" ? 1 : -1;
    setDragOffset({ x: swipeDirection * 1000, y: dragOffset.y });

    setTimeout(() => {
      onSwipe(direction);
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 300);
  };

  const rotation = (dragOffset.x / 20);
  const opacity = Math.max(0, 1 - Math.abs(dragOffset.x) / 300);

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