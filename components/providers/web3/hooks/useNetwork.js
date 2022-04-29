import {useEffect} from 'react';
import useSWR from 'swr';

const NETWORKS = {
  1: 'Etherium main network',
  3: 'Ropsten test network',
  4: 'Rinkeby test network',
  5: 'Georly test network',
  42: 'Kovan test network',
  56: 'Binance smart chain',
  1337: 'Ganache',
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = web3 => () => {
  const {data, ...rest} = useSWR(()=>
    web3 ? 'web3/network' : null,
    async () => {
      const chainId = await web3.eth.getChainId();

      if(!chainId) {
        throw new Error("Cannot retreive network. Please refresh the browser");
      }
      
      return NETWORKS[chainId];
    }
  );
  
  return {
    data,
    targetNetwork: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest
  }
}