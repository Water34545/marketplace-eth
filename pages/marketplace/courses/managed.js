import {MarketHeader} from "@components/ui/marketplace";
import {Button, Message} from "@components/ui/common";
import {CourseFilter, ManagedCourseCard, VerivicationInput} from "@components/ui/course";
import {BaseLayout} from '@components/ui/layout';
import {useAdmin, useManageCourses} from "@components/hooks/web3";
import {useWeb3} from "@components/providers";
import {normilizedOwnedCourse} from "@utils/normalize";
import {useState} from "react";

const ManagedCourses = () => {
  const {contract, web3} = useWeb3();
  const {account} = useAdmin({riderectTo: "/marketplace"});
  const {managedCourses} = useManageCourses(account);
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({state: "all"});

  const changeCourseHash = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({from: account.data});
    } catch(e) {
      console.log(e.message);
    }
  }

  const activateCourse = courseHash => {
    changeCourseHash(courseHash, "activateCourse");
  }

  const deactivateCourse = courseHash => {
    changeCourseHash(courseHash, "deactivateCourse");
  }

  const searchCourse = async hash => {
    const re = /[0-9A-Fa-f]{6}/g;

    if(hash && hash.length === 66 && re.test(hash)) {
      const course = await contract.methods.getCourseByHash(hash).call();

      if (course.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = normilizedOwnedCourse(web3)({hash}, course);
        setSearchedCourse(normalized);
        return;
      }
    }
    setSearchedCourse(null);
  }

  if(!account.isAdmin) return null;

  const renderCard = (course, isSearched) => <ManagedCourseCard key={course.proof} course={course} isSearched={isSearched}>
    <VerivicationInput hash={course.hash} proof={course.proof}/>
    {course.state === "purchased" && <div className="mt-2">
      <Button variant="green" onClick={() => activateCourse(course.hash)}>Activate</Button>
      <Button variant="red" onClick={() => deactivateCourse(course.hash)}>Deactivate</Button>
    </div>}
  </ManagedCourseCard>

  const filteredCourses = managedCourses.data
    ?.filter((course) => {
      if (filters.state === "all") {
        return true;
      }
      return course.state === filters.state;
    })
    .map(course => renderCard(course));

  return <>
    <MarketHeader/>
    <CourseFilter 
      onFilterSelect={(value) => setFilters({state: value})}
      onSearchSubmit={searchCourse}/>
    <section className="grid grid-cols-1">
      {searchedCourse &&
        <div>
          <h1 className="text-2xl font-bold p-5">Search</h1>
          {renderCard(searchedCourse, true)}
        </div>}
      <h1 className="text-2xl font-bold p-5">All Courses</h1>
      {filteredCourses}
        {filteredCourses?.length === 0 &&
          <Message type="warning">
            No courses to display
          </Message>}
    </section>
  </>
};

ManagedCourses.Layout = BaseLayout;

export default ManagedCourses;