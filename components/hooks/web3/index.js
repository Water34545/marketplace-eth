import {useHooks} from "@components/providers/web3";

const enchanceHook = swrRes => ({
  ...swrRes,
  hasInitialResponse: swrRes.data || swrRes.error
})

export const useAccount = () => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useAccount)());
  return {account: swrRes}
}

export const useNetwork = () => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useNetwork)());
  return {network: swrRes}
}

export const useWalletInfo = () => {
  const {account} = useAccount();
  const {network} = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported);
  
  return {account, network, canPurchaseCourse}
}