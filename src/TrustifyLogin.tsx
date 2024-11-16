
import { Saly14, LogoTrustify, Avatar } from './assets/img.ts';
import { useMetaMaskConnection } from './hook/useMetaMaskConnection.tsx';
import { useNavigate } from 'react-router-dom';

export default function TrustifyLogin() {
  const navigate = useNavigate();
  const { connectWallet, isConnecting } = useMetaMaskConnection();

  const handleConnect = async () => {
    try {
      const { address, balance } = await connectWallet();
      if (!address) {
        console.log('No se pudo conectar a la wallet');
      }
      console.log('Conectado:', address);
      console.log('Balance:', balance, 'ETH');
      navigate('/layout');
    } catch (err) {
      console.error('Error al conectar:', err);
    }
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
              onClick={handleConnect}
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
