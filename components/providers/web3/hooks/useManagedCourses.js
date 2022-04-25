import useSWR from 'swr';
import {normilizedOwnedCourse} from '@utils/normalize';

export const handler = (web3, contract) => account => {
  const swrRes = useSWR(() => 
    (web3 && contract && account) ? `web3/managedCourses/${account}` : null,
    async () => {
      const courses = [];
      const courseCount = await contract.methods.getCoursesCount().call();

      for(let i=Number(courseCount); i >=0; i--) {
        const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
        const course = await contract.methods.getCourseByHash(courseHash).call();

        if(course) {
          const normilized = normilizedOwnedCourse(web3)({hesh: courseHash}, course)
          courses.push(normilized);
        }
      }

      return courses;
    }
  )
  return swrRes
}