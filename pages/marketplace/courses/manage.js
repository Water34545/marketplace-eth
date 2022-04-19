import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';

const ManageCourses = () => {
  return <>
    <MarketHeader/>
    <section className="grid grid-cols-1">
      <OwnedCourseCard/>
    </section>
  </>
};

ManageCourses.Layout = BaseLayout;

export default ManageCourses;