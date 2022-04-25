import {MarketHeader} from "@components/ui/marketplace";
import {CourseFilter, ManagedCourseCard, VerivicationInput} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {useAccount, useManageCourses} from "@components/hooks/web3";

const ManagedCourses = () => {
  const {account} = useAccount();
  const {managedCourses} = useManageCourses(account);

  return <>
    <MarketHeader/>
    <CourseFilter/>
    <section className="grid grid-cols-1">
      {managedCourses.data && managedCourses.data.map(course => 
        <ManagedCourseCard key={course.ownedCourseID} course={course}>
          <VerivicationInput hash={course.hash} proof={course.proof}/>
        </ManagedCourseCard>
      )

      }
      {/*<OwnedCourseCard>
        <div className="flex mr-2 relative rounded-md">
          <input
            type="text"
            name="account"
            id="account"
            className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
            placeholder="0x2341ab..." />
          <Button>
            Verify
          </Button>
        </div>
</OwnedCourseCard>*/}
    </section>
  </>
};

ManagedCourses.Layout = BaseLayout;

export default ManagedCourses;