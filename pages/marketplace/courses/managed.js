import {MarketHeader} from "@components/ui/marketplace";
import {Button} from "@components/ui/common";
import {CourseFilter, ManagedCourseCard, VerivicationInput} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {useAdmin, useManageCourses} from "@components/hooks/web3";
import {useWeb3} from "@components/providers";

const ManagedCourses = () => {
  const {contract} = useWeb3();
  const {account} = useAdmin({riderectTo: "/marketplace"});
  const {managedCourses} = useManageCourses(account);

  const activateCourse = async courseHash => {
    try {
      await contract.methods.activateCourse(courseHash).send({from: account.data});
    } catch(e) {
      console.log(e.massage);
    }
  }

  if(!account.isAdmin) return null;

  return <>
    <MarketHeader/>
    <CourseFilter/>
    <section className="grid grid-cols-1">
      {managedCourses.data && managedCourses.data.map(course => 
        <ManagedCourseCard key={course.proof} course={course}>
          <VerivicationInput hash={course.hash} proof={course.proof}/>
          {course.state === "purchased" && <div className="mt-2">
            <Button variant="green" onClick={() => activateCourse(course.hash)}>Activate</Button>
            <Button variant="red">Deactivate</Button>
          </div>}
        </ManagedCourseCard>
      )}
    </section>
  </>
};

ManagedCourses.Layout = BaseLayout;

export default ManagedCourses;