import {useHooks} from "@components/providers/web3";
import {useEffect} from "react";
import {useWeb3} from "@components/providers";
import {useRouter} from "next/router";

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

export const useAdmin = ({riderectTo}) => {
  const {account} = useAccount();
  const {requireInstall} = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if((
    requireInstall || account.hasInitialResponse && !account.isAdmin) ||
    account.isEmpty) {
      router.push(riderectTo);
    }
  }, [account])
  
  return {account}
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

export const useManageCourses = (...args) => {
  const swrRes = enchanceHook(useHooks(hooks => hooks.useManagedCourses)(...args));
  return {managedCourses : swrRes}
}

export const useWalletInfo = () => {
  const {account} = useAccount();
  const {network} = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported);
  
  return {account, network, canPurchaseCourse}
}