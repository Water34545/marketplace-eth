import {BaseLayout} from '@components/ui/layout';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {EthRates, WalletBar} from '@components/ui/web3';
import {useWalletInfo} from '@components/hooks/web3';
import {CourseCard} from "@components/ui/course";
import {Button} from '@components/ui/common';
import {OrderModal} from '@components/ui/order';
import {useState} from 'react';
import {useEthPrice} from '@components/hooks/useEthPrice';

const Marketplace = ({courses}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {account, network, canPurchaseCourse} = useWalletInfo();
  const {eth} = useEthPrice();

  return <>
    <div className='py-4'>
      <WalletBar 
        address={account.data}
        network={network}
      />
    </div>
    <EthRates 
      eth={eth.data}
      perItem={eth.perItem}
    />
    <CourseList courses={courses}>
      {course => <CourseCard 
        key={course.id} 
        disabeled={!canPurchaseCourse}
        course={course}
        Footer={() => <div className='mt-4'>
          <Button
            disabeled={!canPurchaseCourse}
            onClick={() => setSelectedCourse(course)} 
            variant='lightPurple'
          >
            Purchase
          </Button>
        </div>}
      />}
    </CourseList>
    {selectedCourse && 
      <OrderModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    }
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

Marketplace.Layout = BaseLayout;

export default Marketplace;
