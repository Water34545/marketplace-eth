import {Breadcrumbs, Hero} from '@components/ui/common';
import {BaseLayout} from '@components/ui/layout';
import {WalletBar, EthRates} from '@components/ui/web3';
import {OrderCard} from '@components/ui/order';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {useWeb3} from '@components/providers';

const Home = ({courses}) => {
  const {web3, isLoading} = useWeb3();
  return <>
    <p>{isLoading ? 'test' : 'no test'}</p>
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
