import {useHooks} from "@components/providers/web3";

const _isEmpty = data => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length == 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  )
}

const enchanceHook = swrRes => {
  const {data, error} = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);
  
  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse
  }
}

export const useAccount = () => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useAccount)());
  return {account: swrRes}
}

export const useNetwork = () => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useNetwork)());
  return {network: swrRes}
}

export const useOwnedCourses = (...args) => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args));
  return {ownedCourses: swrRes}
}
export const useOwnedCourse = (...args) => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useOwnedCourse)(...args));
  return {ownedCourse : swrRes}
}

export const useWalletInfo = () => {
  const {account} = useAccount();
  const {network} = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported);
  
  return {account, network, canPurchaseCourse}
}