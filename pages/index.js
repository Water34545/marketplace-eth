import {Breadcrumbs, Hero} from '@components/common';
import {BaseLayout} from '@components/layout';
import {WalletBar, EthRates} from '@components/web3';
import {OrderCard} from '@components/order';
import {CourseList} from '@components/course';

const Home = () => {
  return <>
    <Hero/>
    <Breadcrumbs/>
    <WalletBar/>
    <EthRates/>
    <OrderCard/>
    <CourseList/>
  </>
};

Home.Layout = BaseLayout;

export default Home;
