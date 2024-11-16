import { useState } from 'react';

// Tipado mejorado para window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, callback: (params?: any) => void) => void;
      removeListener?: (
        event: string,
        callback: (params?: any) => void
      ) => void;
    };
  }
}

// Tipos para las respuestas de MetaMask
interface WalletResponse {
  address: string;
  balance: string;
}

export const useMetaMaskConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const SEPOLIA_CHAIN_ID = '0xaa36a7';
  const SEPOLIA_NETWORK_PARAMS = {
    chainId: SEPOLIA_CHAIN_ID,
    chainName: 'Sepolia test network',
    nativeCurrency: {
      name: 'SepoliaETH',
      symbol: 'ETH', // Corregido: El símbolo debe ser ETH
      decimals: 18,
    },
    rpcUrls: ['https://rpc.sepolia.org'], // URL RPC pública más confiable
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  };

  const switchToSepolia = async (): Promise<void> => {
    if (!window.ethereum) {
      throw new Error('MetaMask no está instalado');
    }

    try {
      // Intenta cambiar a la red Sepolia
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (switchError: any) {
      // Si la red no está agregada (error 4902) o el usuario rechaza (error 4001)
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [SEPOLIA_NETWORK_PARAMS],
          });
        } catch (addError: any) {
          if (addError.code === 4001) {
            throw new Error('Usuario rechazó agregar la red Sepolia');
          }
          throw new Error('No se pudo agregar la red Sepolia');
        }
      } else if (switchError.code === 4001) {
        throw new Error('Usuario rechazó cambiar a la red Sepolia');
      } else {
        throw switchError;
      }
    }
  };

  const getBalance = async (address: string): Promise<string> => {
    if (!window.ethereum) {
      throw new Error('MetaMask no está instalado');
    }

    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });

      if (typeof balance !== 'string') {
        throw new Error('Balance inválido recibido de MetaMask');
      }

      // Convertir de Wei a ETH y formatear a 4 decimales
      const balanceInWei = BigInt(balance);
      const balanceInEth = Number(balanceInWei) / 1e18;
      return balanceInEth.toFixed(4);
    } catch (error) {
      throw new Error(
        'Error al obtener el balance: ' + (error as Error).message
      );
    }
  };

  const connectWallet = async (): Promise<WalletResponse> => {
    setIsConnecting(true);
    setError('');

    try {
      if (!window.ethereum) {
        alert('MetaMask no está instalado');
        throw new Error('MetaMask no está instalado');
      }

      // Solicitar conexión de cuenta
      const accounts = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('No se encontraron cuentas');
      }

      // Cambiar a la red Sepolia
      await switchToSepolia();

      // Obtener el balance
      const balance = await getBalance(accounts[0]);

      // Guardar datos del usuario
      localStorage.setItem('userWallet', accounts[0]);
      localStorage.setItem('userBalance', balance);

      // Retornar los datos
      return {
        address: accounts[0],
        balance: balance,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  // Función para desconectar
  const disconnectWallet = () => {
    // Limpiar estado
    setIsConnecting(false);
    setError('');

    // Limpiar localStorage
    localStorage.removeItem('userWallet');
    localStorage.removeItem('userBalance');

    // Eventos personalizados para notificar a la aplicación
    window.dispatchEvent(new Event('walletDisconnected'));
  };

  return {
    connectWallet,
    disconnectWallet,
    isConnecting,
    error,
    getBalance,
  };
};