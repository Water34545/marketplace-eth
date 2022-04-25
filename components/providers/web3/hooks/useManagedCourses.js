import useSWR from 'swr';
import {createCourseHash} from '@utils/hash';

export const handler = (web3, contract) => account => {
  const swrRes = useSWR(() => 
    (web3 && contract && account) ? `web3/managedCourses/${account}` : null,
    async () => {
      const courses = [1,2,3,4];

      return courses;
    }
  )
  return swrRes
}