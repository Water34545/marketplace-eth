import {BaseLayout} from '@components/ui/layout';
import {Hero} from '@components/ui/common';
import {getAllCourses} from '@content/courses/fetcher';
import {CourseList} from '@components/ui/course';
import {CourseCard} from "@components/ui/course";

const Home = ({courses}) => {
  return <>
    <Hero/>
    <CourseList courses={courses}>
      {course => <CourseCard key={course.id} course={course}/>}
    </CourseList>
  </>
};

export const getStaticProps = () => {
  const {data} = getAllCourses();

  return {
    props: {
      courses: data
    }
  }
}

Home.Layout = BaseLayout;

export default Home;
