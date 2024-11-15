import  { useState } from 'react';

// Declare the type for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

import { Saly14, LogoTrustify, Avatar } from './assets/img.ts';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function TrustifyLogin() {

   const [isConnecting, setIsConnecting] = useState(false);
   const [error, setError] = useState(''); // Añadido para manejar errores
   const navigate = useNavigate(); // Para navegación después del login
   

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error(
          'No se encontró una wallet. Por favor, instala MetaMask.'
        );
      }

      const accounts = (await window.ethereum.request?.({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('No se encontraron cuentas.');
      }

      const balance = await getBalance(accounts[0]);

      // Guardar datos del usuario
      localStorage.setItem('userWallet', accounts[0]);
      localStorage.setItem('userBalance', balance.toString());

      // Mostrar en la consola
      console.log('Address:', accounts[0]);
      console.log('Balance:', balance, 'ETH');

      navigate('/layout'); 
      // Redireccionar al dashboard
      //navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsConnecting(false);
    }
  };

  const getBalance = async (address: string): Promise<number> => {
    if (!window.ethereum) {
      throw new Error('MetaMask no está instalado');
    }

    const balance = (await window.ethereum.request?.({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })) as string;

    return parseFloat(balance) / 1e18;
  };



  return (
    <main className="min-h-screen bg-white p-6 flex flex-col">
      <div className="container mx-auto flex flex-col flex-grow">
        <header className="mb-8">
          <img
            className="w-40 md:w-50 h-auto"
            src={LogoTrustify}
            alt="Logo de Trustify"
          />
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 flex-grow">
          <section className="w-full lg:w-1/2 flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full max-w-md space-y-6 text-center lg:text-left">
              <h1 className="text-black text-4xl md:text-5xl font-semibold font-poppins">
                Trustify
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium font-poppins">
                <span className="text-black">Más que un </span>
                <span className="text-[#4D47C3]">pago</span>
                <span className="text-black">, una experiencia</span>
              </h2>
              <p className="text-black text-base md:text-lg font-poppins">
                Recibe recompensas por cada compra
              </p>
            </div>
            <figure className="w-48 md:w-56 lg:w-64 h-auto mt-8 lg:mt-0 lg:ml-8 hidden lg:block">
              <img
                className="w-full h-full object-contain"
                src={Saly14}
                alt="Ilustración de Trustify"
              />
            </figure>
          </section>

          <aside className="w-full lg:w-1/3 flex flex-col items-center gap-12">
            <h2 className="text-center text-black text-2xl md:text-3xl font-medium font-poppins">
              Bienvenido
            </h2>
            <figure className="relative w-24 md:w-28 aspect-square">
              <img
                className="w-full h-full rounded-full object-cover"
                src={Avatar}
                alt="Imagen de perfil"
              />
            </figure>
            <button
              className="w-full max-w-sm h-14 md:h-16 flex justify-center items-center bg-[#4D47C3] rounded-lg shadow-lg transition-all hover:bg-[#3d3a9c] focus:outline-none focus:ring-2 focus:ring-[#4D47C3] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              <span className="text-white text-base md:text-lg font-medium">
                {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
              </span>
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
