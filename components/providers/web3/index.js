import {createContext, useContext, useEffect, useState} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';

const Web3Context = createContext(null);

const Web3Provider = ({children}) => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false
  });
   
  useEffect(() => {
    const loadProvider = async() => {
       const provider = await detectEthereumProvider();
       if(provider) {
        const web3 = new Web3(provider);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true
        });
       } else {
        setWeb3Api(api => ({
          ...api,
          isInitialized: true
        }));
        console.error('install metamask')
       }
    }
    loadProvider();
  }, []);
  return <Web3Context.Provider value={web3Api}>
    {children}
  </Web3Context.Provider> 
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}

export default Web3Provider;