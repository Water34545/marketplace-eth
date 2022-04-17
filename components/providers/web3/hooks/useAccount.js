import {useEffect} from 'react';
import useSWR from 'swr';

const adminAddresses = {
  "0x0C843ba74BBe15C96044878EBB9065d34987e3D0": true
}

export const handler = (web3, provider) => () => {
  const {data, mutate, ...rest} = useSWR(()=> {
    return web3 ? 'web3/ccounts' : null},
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );
  
  useEffect(() => {
    provider &&
    provider.on('accountsChanged', 
      accounts => mutate(accounts[0] ?? null)
    )
  }, []);
  
  return {
    account: {
      data,
      isAdmin: (data && adminAddresses[data]) ?? false,
      mutate,
      ...rest
    }
  }
}