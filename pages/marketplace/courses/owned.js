import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Button, Massage} from "@components/ui/common";

const OwnedCourses = () => {
  return <>
    <MarketHeader/>
    <section className="grid grid-cols-1">
      <OwnedCourseCard>
        <Massage>
          My massage
        </Massage>
        <Button>
          Watch the course
        </Button>
      </OwnedCourseCard>
    </section>
  </>
};

OwnedCourses.Layout = BaseLayout;

export default OwnedCourses;