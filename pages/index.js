import {Breadcrumbs, Hero} from '@components/common';
import {BaseLayout} from '@components/layout';
import {WalletBar, EthRates} from '@components/web3';
import {OrderCard} from '@components/order';
import {CourseList} from '@components/course';
import {getAllCourses} from '@content/courses/fetcher';

const Home = ({courses}) => {
  return <>
    <Hero/>
    <Breadcrumbs/>
    <WalletBar/>
    <EthRates/>
    <OrderCard/>
    <CourseList courses={courses}/>
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
