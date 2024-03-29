import {useEffect} from 'react';
import useSWR from 'swr';

const adminAddresses = {
  "0x294bb7c230e2974d9cd44a3a5d1c0b4f37c6e318891dbd3280fa7093e04f7fdb": true
}

export const handler = (web3, provider) => () => {
  const {data, mutate, ...rest} = useSWR(() => 
    web3 ? 'web3/accounts' : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if(!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser");
      }

      return account;
    }
  );
  
  useEffect(() => {
    const mutator = accounts => {mutate(accounts[0]) ?? null}
    provider?.on('accountsChanged', mutator);
    return () => {
      provider?.removeListener('accountsChanged', mutator);
    }
  }, [provider]);
  
  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest
  }
}