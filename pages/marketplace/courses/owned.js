import {MarketHeader} from "@components/ui/marketplace";
import {OwnedCourseCard} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {Button, Massage} from "@components/ui/common";
import {useAccount, useOwnedCourses} from "@components/hooks/web3";
import {getAllCourses} from '@content/courses/fetcher';
import {useRouter} from "next/router";
import Link from "next/link";
import { useWeb3 } from "@components/providers";

const OwnedCourses = ({courses}) => {
  const router = useRouter();
  const {account} = useAccount();
  const {requireInstall} = useWeb3();
  const {ownedCourses} = useOwnedCourses(courses, account.data);

  if(!ownedCourses.data) return

  return <>
    <MarketHeader/>
    <section className="grid grid-cols-1">
      {ownedCourses.isEmpty &&
        <Massage type="warning">
          You do not owned any courses
          <Link href="/marketplace">
            <a className="font-normal hover:underline">
              <i> Purchase Course</i>
            </a>
          </Link>
        </Massage>
      }
      {account.isEmpty &&
        <Massage type="warning">
          Please connect to the metamask
        </Massage>
      }
      {requireInstall &&
        <Massage type="warning">
          Please install to the metamask
        </Massage>
      }
      {ownedCourses.data.map(course => 
        <OwnedCourseCard key={course.id} course={course}>
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