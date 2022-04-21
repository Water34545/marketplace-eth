import {handler as createUseAccountHook} from "./useAccount";
import {handler as createUseNetworkHook} from "./useNetwork";
import {handler as createOwnedCoursesHook} from "./useOwnedCourses";

export const setupHooks = ({web3, provider, contract}) => {
  return {
    useAccount: createUseAccountHook(web3, provider),
    useNetwork: createUseNetworkHook(web3, provider),
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
  }
}