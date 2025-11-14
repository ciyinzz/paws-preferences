import React from "react";

const Summary = ({ likedCats, totalCats, onRestart }) => {
  return (
    <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Results!</h2>
        <p className="text-xl text-gray-600">
          You liked <span className="font-bold text-pink-500">{likedCats.length}</span> out of {totalCats} cats
        </p>
      </div>

      {likedCats.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {likedCats.map((cat, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
              <img
                src={cat}
                alt={`Liked Cat ${index + 1}`}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 bg-pink-500 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-4">No cats captured your heart this time! 😿</p>
          <p>Maybe try again with a fresh batch of kitties?</p>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Start Over
      </button>
    </div>
  );
};

export default Summary;