import { toast } from 'sonner';

// Holesky Chain ID: 17000 (0x4268 in hexadecimal)
const HOLESKY_CHAIN_ID_HEX = '0x4268'; 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HOLESKY_CHAIN_ID_DEC = 17000;

// You'll need the network details if you have to prompt the user to *add* the network
const HOLESKY_NETWORK_DETAILS = {
  chainId: HOLESKY_CHAIN_ID_HEX,
  chainName: 'Holesky Testnet',
  nativeCurrency: {
    name: 'Holesky Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://holesky.drpc.org'], // Use a reliable RPC URL
  blockExplorerUrls: ['https://holesky.etherscan.io'],
};

const useWalletLogin = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // 1. Request accounts (connect wallet)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
          // 2. Check and Switch Network
          const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

          if (currentChainId !== HOLESKY_CHAIN_ID_HEX) {
            
            // Try to switch to the Holesky network
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: HOLESKY_CHAIN_ID_HEX }],
              });
              // Network switched successfully, now proceed
              toast.success(`Switched to Holesky. Connected as: ${accounts[0]}`);

            } catch (switchError: unknown) {
              // This error code (4902) means the chain hasn't been added to MetaMask.
              if (switchError.code === 4902) {
                try {
                  // Prompt user to add the Holesky network
                  await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [HOLESKY_NETWORK_DETAILS],
                  });
                  // After adding, it should automatically switch, but we'll re-check
                  toast.success(`Holesky added. Please approve the network switch.`);
                } catch (addError) {
                  console.error('User rejected adding Holesky network:', addError);
                  toast.error('Please manually switch to Holesky Testnet.');
                  // Throwing the error prevents the success toast from showing
                  throw new Error('Network switch required.'); 
                }
              } else {
                // User rejected the switch
                console.error('User rejected network switch:', switchError);
                toast.error('Please manually switch to Holesky Testnet.');
                throw new Error('Network switch required.');
              }
            }
            
            // If the code reaches here without throwing, the connection is good.
            // A final check can be done, but the switch/add logic covers most cases.
            toast.success(`Successfully connected as: ${accounts[0]}`)

          } else {
            // Already on Holesky
            toast.success(`Successfully connected as: ${accounts[0]}`)
          }

        } else {
          console.error('No accounts found in MetaMask');
        }
      } catch (error: unknown) {
        // Handle both connection and network switch errors gracefully
        if (error.message.includes('Network switch required')) {
            // Error already handled and shown to user via toast/alert in the block above
        } else {
            console.error('Error connecting or switching network:', error);
            toast.error('Could not connect to MetaMask. Please try again.');
        }
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask!');
    }
  };

  const disconnectWalletHandler = () => {
    // Note: Disconnecting from a dApp just revokes the dApp's access.
    // There is no standard EIP-1193 method to *logout* of MetaMask itself.
    toast.success(`Successfully disconnected!`)
  };

  return { connectWallet, disconnectWalletHandler };
};

export default useWalletLogin;