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

export const handler = (web3, provider) => () => {
  const {data, mutate, ...rest} = useSWR(()=>
    web3 ? 'web3/network' : null,
    async () => {
      const chainId = await web3.eth.getChainId();
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider &&
    provider.on('chainChanged', chainId => {
      mutate(parseInt(chainId, 16))
    })
  }, [web3]);
  
  return {
    data,
    mutate,
    targetNetwork: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest
  }
}