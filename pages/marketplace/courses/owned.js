import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';

const OwnedCourses = () => {
  return <>
    <MarketHeader/>
    <section className="grid grid-cols-1">
      <OwnedCourseCard/>
    </section>
  </>
};

OwnedCourses.Layout = BaseLayout;

export default OwnedCourses;