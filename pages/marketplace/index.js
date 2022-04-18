import {BaseLayout} from '@components/ui/layout';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {WalletBar} from '@components/ui/web3';
import {useAccount, useNetwork} from '@components/hooks/web3';
import {CourseCard} from "@components/ui/course";

const Marketplace = ({courses}) => {
  const {account} = useAccount();
  const {network} = useNetwork();

  return <>
    <div className='py-4'>
      <WalletBar 
        address={account.data}
        network={network}
      />
    </div>
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

Marketplace.Layout = BaseLayout;

export default Marketplace;
