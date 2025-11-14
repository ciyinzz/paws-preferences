import React, { useEffect, useState } from "react";
import CatCard from "./components/CatCard";
import Summary from "./components/Summary";

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const CAT_COUNT = 15; // Number of cats to show

  // Fetch cats from Cataas
  const fetchCats = async () => {
    setLoading(true);
    try {
      // Generate unique cat images from Cataas
      const catImages = Array.from({ length: CAT_COUNT }, (_, i) => {
        // Use different parameters to get variety
        const timestamp = Date.now() + i;
        return `https://cataas.com/cat?width=500&height=600&t=${timestamp}`;
      });
      
      setCats(catImages);
      setCurrentIndex(0);
      setLikedCats([]);
      setIsFinished(false);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLikedCats([...likedCats, cats[currentIndex]]);
    }

    if (currentIndex + 1 === cats.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        🐾 Paws & Preferences
      </h1>
      <p className="text-gray-600 text-lg mb-6">Find Your Favorite Kitty</p>

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading adorable cats...</p>
        </div>
      )}

      {!loading && !isFinished && cats.length > 0 && (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500 mb-4">
            {currentIndex + 1} / {CAT_COUNT}
          </p>
          <p className="text-gray-600 mb-6">👈 Swipe left to pass • Swipe right to like 👉</p>
          <CatCard
            key={currentIndex}
            image={cats[currentIndex]}
            onSwipe={handleSwipe}
          />
        </div>
      )}

      {isFinished && (
        <Summary likedCats={likedCats} totalCats={CAT_COUNT} onRestart={fetchCats} />
      )}
    </div>
  );
}

export default App;