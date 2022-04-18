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
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest
    }
  }
}