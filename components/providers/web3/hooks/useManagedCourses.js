import useSWR from 'swr';
import {normilizedOwnedCourse} from '@utils/normalize';

export const handler = (web3, contract) => account => {
  const swrRes = useSWR(() => 
    (web3 &&
    contract && 
    account.data &&
    account.isAdmin) ? `web3/managedCourses/${account}` : null,
    async () => {
      const courses = [];
      const courseCount = await contract.methods.getCoursesCount().call();

      for(let i=Number(courseCount); i >=0; i--) {
        const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
        const course = await contract.methods.getCourseByHash(courseHash).call();
        
        if(course && course.owner != '0x0000000000000000000000000000000000000000') {
          const normilized = normilizedOwnedCourse(web3)({hash: courseHash}, course)
          courses.push(normilized);
        }
      }

      return courses;
    }
  )
  return swrRes
}