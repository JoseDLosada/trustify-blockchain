import { ProductCards } from './components/ProductCards.tsx';
import { Avatar } from './assets/img.ts';

export default function TrustifyLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sky-300 font-bold text-3xl tracking-wide">
              Trustify
            </span>
            <nav className="hidden lg:flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-800 font-semibold hover:text-sky-300 transition-colors duration-200"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-sky-300 transition-colors duration-200"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-sky-300 transition-colors duration-200"
              >
                FAQ
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-600 text-sm">Status:</span>
                <span className="text-indigo-600 font-semibold text-sm">
                  Iniciador
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                <span className="text-gray-600 text-sm">TRUST:</span>
                <span className="text-indigo-600 font-semibold text-sm">
                  100
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden ring-2 ring-sky-300 ring-offset-2">
                <img
                  src={Avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-800 font-medium hidden sm:inline-block">
                0x3Cd…bF32x
              </span>
            </div>

            <button className="lg:hidden text-gray-600 hover:text-sky-300 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Productos Comprados
          </h1>
          <ProductCards />
        </div>
      </main>

      <footer className="bg-white py-6 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-800 text-sm font-medium">
                Trustify
              </span>
            </div>
            <div className="flex items-center space-x-1 text-lg font-semibold">
              <span className="text-black">Más que un</span>
              <span className="text-[#4D47C3]">pago</span>
              <span className="text-black">, una experiencia</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
