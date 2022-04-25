import {MarketHeader} from "@components/ui/marketplace";
import {CourseFilter, ManagedCourseCard, VerivicationInput} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {useAdmin, useManageCourses} from "@components/hooks/web3";

const ManagedCourses = () => {
  const {account} = useAdmin({riderectTo: "/marketplace"});
  const {managedCourses} = useManageCourses(account);

  if(!account.isAdmin) return null;

  return <>
    <MarketHeader/>
    <CourseFilter/>
    <section className="grid grid-cols-1">
      {managedCourses.data && managedCourses.data.map(course => 
        <ManagedCourseCard key={course.proof} course={course}>
          <VerivicationInput hash={course.hash} proof={course.proof}/>
        </ManagedCourseCard>
      )}
    </section>
  </>
};

ManagedCourses.Layout = BaseLayout;

export default ManagedCourses;