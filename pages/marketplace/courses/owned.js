import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Button, Massage} from "@components/ui/common";
import {useAccount, useOwnedCourses} from "@components/hooks/web3";
import {getAllCourses} from '@content/courses/fetcher';
import {useRouter} from "next/router";

const OwnedCourses = ({courses}) => {
  const router = useRouter();
  const {account} = useAccount();
  const {ownedCourses} = useOwnedCourses(courses, account.data);

  if(!ownedCourses.data) return

  return <>
    <MarketHeader/>
    <section className="grid grid-cols-1">
      {ownedCourses.data.map(course => 
        <OwnedCourseCard key={course.id} course={course}>
          <Massage>
            My massage
          </Massage>
          <Button
            onClick={() => router.push(`/courses/${course.slug}`)}
          >
            Watch the course
          </Button>
        </OwnedCourseCard>
      )}
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