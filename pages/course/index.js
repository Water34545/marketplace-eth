import {CourseHero, Keypoints, Curriculum} from "@components/course";
import {BaseLayout} from '@components/layout';
import {Modal} from "@components/common";

const Course = () => {

  return <>
    <div className="py-4">
      <CourseHero/>
    </div>
    <Keypoints/>
    <Curriculum/>
    <Modal/>
  </>
}

Course.Layout = BaseLayout;

export default Course;