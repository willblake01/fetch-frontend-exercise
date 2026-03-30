'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center pt-16 overflow-y-auto"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/willblake01/image/upload/v1774907831/playing-puppies_w6tf9m.webp)',
      }}
    >
      <div className="text-center">
        <p className="text-sm font-semibold text-white uppercase tracking-wider mb-4 drop-shadow-lg">
          Dog Rescue & Matching
        </p>
        <h1 className="text-6xl font-bold text-white drop-shadow-2xl mb-8">
          Find your perfect match!
        </h1>
        <button
          onClick={() => router.push('/login')}
          className="bg-[#7C1E6F] hover:bg-[#5d1753] text-white font-bold text-lg px-8 py-4 rounded-lg shadow-xl transition-colors duration-300"
        >
          Start Searching
        </button>
      </div>

      {/* How It Works Section */}
      <div className="w-full px-8 pb-16 mt-96">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-xl mb-12">
          How It Works
        </h2>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Search */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Search
            </h3>
            <p className="text-gray-600">
              Browse through our extensive database of adorable dogs. Filter by breed, age, and location to find your ideal companion.
            </p>
          </div>

          {/* Card 2: Save Favorites */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Save Favorites
            </h3>
            <p className="text-gray-600">
              Click on dog cards to add them to your favorites list. Take your time to review and compare different pups before making a decision.
            </p>
          </div>

          {/* Card 3: Get Matched */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Get Matched
            </h3>
            <p className="text-gray-600">
              Our algorithm will help you find the perfect match based on your preferences. Start your journey to pet parenthood today!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}




