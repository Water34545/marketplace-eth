import {Navbar, Footer, Breadcrumbs, Hero} from '@components/common';
import {WalletBar, EthRates} from '@components/web3';
import {OrderCard} from '@components/order';
import {CourseList} from '@components/course';

const Home = () => {
  return <div>
  <div className="relative bg-white overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-4">
      <Navbar/>
      <div className="fit">
        <Hero/>
        <Breadcrumbs/>
        <WalletBar/>
        <EthRates/>
        <OrderCard/>
        <CourseList/>
      </div>
    </div>
    <Footer/>
  </div>
</div>
}

export default Home;
