import {handler as createUseAccountHook} from "./useAccount";
import {handler as createUseNetworkHook} from "./useNetwork";
import {handler as createOwnedCoursesHook} from "./useOwnedCourses";
import {handler as createOwnedCourseHook} from "./useOwnedCourse";
import {handler as createManagedCoursesHook} from "./useManagedCourses";

export const setupHooks = ({web3, provider, contract}) => {
  return {
    useAccount: createUseAccountHook(web3, provider),
    useNetwork: createUseNetworkHook(web3),
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
    useOwnedCourse: createOwnedCourseHook(web3, contract),
    useManagedCourses: createManagedCoursesHook(web3, contract),
  }
}