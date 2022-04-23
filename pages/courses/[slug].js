import {CourseHero, Keypoints, Curriculum} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Massage, Modal} from "@components/ui/common";
import {getAllCourses} from "@content/courses/fetcher";
import {useAccount, useOwnedCourse} from "@components/hooks/web3";

const Course = ({course}) => {
  const {account} = useAccount();
  const {ownedCourse} = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  const isLock = courseState != 'activated';

  return <>
    <div className="py-4">
      <CourseHero
        hasOwner={!!ownedCourse.data}
        title={course.title}
        description={course.description}
        image={course.coverImage}
      />
    </div>
    <Keypoints points={course.wsl}/>
    {courseState && <div className="max-w-5xl mx-auto">
      {courseState === 'purchased' && 
        <Massage type="warning">
          Course purchased and waiting for activation. Process can take up to 24 hours.
          <i className="block font-normal">In case of any questions, please contact admin@ebanat.com</i>
        </Massage>
      }
      {courseState === 'activated' && 
        <Massage type="success">
          We wishes you happy watching of the course!
        </Massage>
      }
      {courseState === 'deactivated' && 
        <Massage type="danger">
          Course has been deactivated due the incorrect purchase data.
          <i className="block font-normal">In case of any questions, please contact admin@ebanat.com</i>
        </Massage>
      }
    </div>}
    <Curriculum locked={isLock} courseState={courseState}/>
    <Modal/>
  </>
}

export const getStaticPaths = () => {
  const {data} = getAllCourses();

  return {
    paths: data.map(c => ({
      params: {
        slug: c.slug
      }
    })),
    fallback: false
  }
}

export const getStaticProps = ({params}) => {
  const {data} = getAllCourses();
  const course = data.filter(c => c.slug === params.slug)[0];
  
  return {
    props: {
      course
    }
  }
}

Course.Layout = BaseLayout;

export default Course;