import {createContext, useContext, useEffect, useState, useMemo} from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import {setupHooks} from './hooks/setupHooks';

const Web3Context = createContext(null);

const Web3Provider = ({children}) => {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks(),
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
          isLoading: false,
          hooks: setupHooks(web3, provider),
        });
       } else {
        setWeb3Api(api => ({
          ...api,
          isLoading: false
        }));
        console.error('install metamask')
       }
    }
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const {web3, provider, isLoading} = web3Api;
    return {
      ...web3Api,
      requareInstall: !isLoading && !web3,
      connect: provider ? 
      async() => {
        try {
          await provider.request({method: "eth_requestAccounts "})
        } catch {
          location.reload();
        }
      } :
      () => console.log('can not connect to metamask')
    }
  }, [web3Api]);

  return <Web3Context.Provider value={_web3Api}>
    {children}
  </Web3Context.Provider> 
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}

export const useHooks = (cb) => {
  const {hooks} = useWeb3();
  return cb(hooks);
}

export default Web3Provider;