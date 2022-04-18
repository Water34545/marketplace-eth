import {Breadcrumbs, Hero} from '@components/ui/common';
import {WalletBar, EthRates} from '@components/ui/web3';
import {OrderCard} from '@components/ui/order';
import {CourseList} from '@components/ui/course';
import {useWeb3} from '@components/providers';
import {CourseCard} from "@components/ui/course";

const Home = ({courses}) => {
  const {web3, isLoading} = useWeb3();
  return <>
    <Hero/>
    <Breadcrumbs/>
    <WalletBar/>
    <EthRates/>
    <OrderCard/>
    <CourseList courses={courses}>
      {course => <CourseCard key={course.id} course={course}/>}
    </CourseList>
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

Home.Layout = BaseLayout;

export default Home;
