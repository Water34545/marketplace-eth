import useSWR from 'swr';
import {normilizedOwnedCourse} from '@utils/normalize';
import {createCourseHash} from '@utils/hash';

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(() => 
    (web3 && contract && account) ? `web3/ownedCourse/${account}` : null,
    async () => {
      const courseHash = createCourseHash(web3)(course.id, account);
      const ownedCourse = await contract.methods.getCourseByHash(courseHash).call();

      if(ownedCourse.owner === '0x0000000000000000000000000000000000000000') {
        return null;
      }
        
      return normilizedOwnedCourse(web3)(course, ownedCourse);
    }
  )
  return swrRes
}