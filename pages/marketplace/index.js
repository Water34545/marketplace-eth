import {useState} from 'react';
import {BaseLayout} from '@components/ui/layout';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {useWalletInfo} from '@components/hooks/web3';
import {CourseCard} from "@components/ui/course";
import {Button} from '@components/ui/common';
import {OrderModal} from '@components/ui/order';
import {MarketHeader} from '@components/ui/marketplace';

const Marketplace = ({courses}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {canPurchaseCourse} = useWalletInfo();

  const purchaseCourse = (order) => {
    console.log(order);
  };

  return <>
    <MarketHeader/>
    <CourseList courses={courses}>
      {course => <CourseCard 
        key={course.id} 
        disabeled={!canPurchaseCourse}
        course={course}
        Footer={() => <div className='mt-4'>
          <Button
            disabeled={`${!canPurchaseCourse}`}
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
        onSubmit={purchaseCourse}
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
