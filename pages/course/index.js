import {CourseHero, Keypoints, Curriculum} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Modal} from "@components/ui/common";

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