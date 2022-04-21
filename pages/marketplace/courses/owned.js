import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Button, Massage} from "@components/ui/common";
import {useAccount, useOwnedCourses} from "@components/hooks/web3";
import {getAllCourses} from '@content/courses/fetcher';

const OwnedCourses = ({courses}) => {
  const {account} = useAccount();
  const {ownedCourses} = useOwnedCourses(courses, account.data);

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

export const getStaticProps = () => {
  const {data} = getAllCourses();

  return {
    props: {
      courses: data
    }
  }
}

OwnedCourses.Layout = BaseLayout;

export default OwnedCourses;