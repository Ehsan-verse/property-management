export function Footer() {
  return (
    <footer className="bg-manzil-dark text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Hamzah's Manzil</h3>
          <p className="text-manzil-300 max-w-md mx-auto">
            Premium residential rental property offering comfortable living spaces with modern amenities.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="/buildings" className="hover:text-manzil-gold transition-colors">Buildings</a>
            <a href="/units" className="hover:text-manzil-gold transition-colors">Available Units</a>
            <a href="/about" className="hover:text-manzil-gold transition-colors">About</a>
          </div>
          <div className="border-t border-manzil-700 pt-4 text-xs text-manzil-400">
            © 2024 Hamzah's Manzil. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}