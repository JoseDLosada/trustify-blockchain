// Componente de tarjetas de productos
import { Producto  } from '../assets/img';
export function ProductCards() {
  const purchasedProducts = [
    {
      id: 1,
      title: 'Mirror Glass Effect',
      shop: '@ATUCASA-SHOP',
      price: '170.000$',
      reward: '5%',
      status: 'Enviado',
      image: Producto,
    },
    {
      id: 2,
      title: 'Vintage Camera',
      shop: '@RETRO-TECH',
      price: '250.000$',
      reward: '3%',
      status: 'En proceso',
      image: Producto,
    },
    {
      id: 3,
      title: 'Smart Watch',
      shop: '@GADGET-WORLD',
      price: '199.999$',
      reward: '4%',
      status: 'Enviado',
      image: Producto,
    },
    {
      id: 4,
      title: 'Wireless Earbuds',
      shop: '@AUDIO-HEAVEN',
      price: '89.999$',
      reward: '2%',
      status: 'Entregado',
      image: Producto,
    },
    {
      id: 5,
      title: 'Wireless Earbuds',
      shop: '@AUDIO-HEAVEN',
      price: '89.999$',
      reward: '2%',
      status: 'Entregado',
      image: Producto,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {purchasedProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <div className="w-full h-48 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {product.title}
            </h3>
            <p className="text-sm text-indigo-600 mb-2">{product.shop}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-bold text-gray-900">
                {product.price}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Reward</span>
                <span className="text-sm font-semibold text-indigo-600">
                  {product.reward}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                disabled={product.status === 'Entregado'}
                className={`inline-block px-4 py-1.5 text-white text-sm font-medium rounded-full ${
                  product.status === 'Entregado'
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-indigo-600'
                }`}
              >
                {product.status}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
