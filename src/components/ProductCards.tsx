import { useState } from 'react';
import { Producto } from '../assets/img';

interface Product {
  id: number;
  title: string;
  shop: string;
  price: string;
  reward: string;
  status: 'Enviado' | 'Entregado';
  image: string;
}

export function ProductCards() {
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([
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
      status: 'Enviado',
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
      status: 'Enviado',
      image: Producto,
    },
    {
      id: 5,
      title: 'Wireless Earbuds',
      shop: '@AUDIO-HEAVEN',
      price: '89.999$',
      reward: '2%',
      status: 'Enviado',
      image: Producto,
    },
  ]);

  // Estado para manejar la carga durante la llamada al contrato
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleSmartContractCall = async (productId: number) => {
    try {
      setIsLoading(productId);

      // Aquí iría tu llamada al contrato inteligente
      // await trustySmartContract.methods.markAsShipped(productId).send({ from: userAddress });

      // Simular delay de la transacción
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPurchasedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId && product.status !== 'Entregado'
            ? { ...product, status: 'Entregado' }
            : product
        )
      );
    } catch (error) {
      console.error('Error al llamar al contrato inteligente:', error);
      // Aquí podrías manejar el error, por ejemplo mostrando una notificación
    } finally {
      setIsLoading(null);
    }
  };

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
                disabled={
                  product.status === 'Entregado' || isLoading === product.id
                }
                className={`inline-block px-4 py-1.5 text-white text-sm font-medium rounded-full
                  ${
                    product.status === 'Entregado'
                      ? 'bg-green-500 cursor-not-allowed'
                      : isLoading === product.id
                      ? 'bg-indigo-400 cursor-wait'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                onClick={() => handleSmartContractCall(product.id)}
              >
                {isLoading === product.id ? 'Procesando...' : product.status}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
