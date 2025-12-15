import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Brick & Mortar
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Order online for pickup. Fresh, fast, and convenient.
          </p>
          <Link href="/menu">
            <Button size="lg" className="text-lg px-8 py-4">
              View Menu
            </Button>
          </Link>
        </div>
        
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Browse Menu</h3>
            <p className="text-gray-600">Explore our delicious offerings</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Add to Cart</h3>
            <p className="text-gray-600">Select your favorites</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-2">Pick Up</h3>
            <p className="text-gray-600">Choose your pickup time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

