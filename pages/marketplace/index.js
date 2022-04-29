import {useState} from 'react';
import {BaseLayout} from '@components/ui/layout';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {useOwnedCourses, useWalletInfo} from '@components/hooks/web3';
import {CourseCard} from "@components/ui/course";
import {Button, Loader, Message} from '@components/ui/common';
import {OrderModal} from '@components/ui/order';
import {MarketHeader} from '@components/ui/marketplace';
import {useWeb3} from '@components/providers';

const Marketplace = ({courses}) => {
  const {web3, contract, requireInstall} = useWeb3();
  const {hasConnectedWallet, isConnecting, account} = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {ownedCourses} = useOwnedCourses(courses, account.data);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const purchaseCourse = async order => {
    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
    const orderHash = web3.utils.soliditySha3(
      {type: 'bytes16', value: hexCourseId},
      {type: 'address', value: account.data}
    );

    const value = web3.utils.toWei(String(order.price));

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        {type: 'bytes32', value: emailHash},
        {type: 'bytes32', value: orderHash}
      );

      _purchaseCourse(hexCourseId, proof, value)
    } else {
      _repurchaseCourse(orderHash, value)
    }
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value});
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  }

  const _repurchaseCourse = async (courseHash, value) => {
    try {
      await contract.methods.repurchaseCourse(
        courseHash
      ).send({from: account.data, value});
    } catch {
      console.error("Purchase course: Operation has failed.");
    }
  }

  return <>
    <MarketHeader/>
    <CourseList courses={courses}>
      {course => {
        const owned = ownedCourses.lookup[course.id]
        return <CourseCard 
          key={course.id} 
          state={owned?.state}
          disabeled={!hasConnectedWallet}
          course={course}
          Footer={() => {

            if (requireInstall) {
              return (
                <Button
                  disabled={true}
                  size="sm"
                  variant="lightPurple">
                  Install
                </Button>
              )
            }

            if (isConnecting) {
              return (
                <Button
                  disabled={true}
                  size="sm"
                  variant="lightPurple">
                  <Loader size="sm" />
                </Button>
              )
            }
            
            if (!ownedCourses.hasInitialResponse) {
              return (
                <div style={{height: "42px"}}></div>
              )
            }

            if (owned) {
              return <div className="flex">
                <Button
                  disabled={true}
                  size="sm"
                  variant="white">
                  Yours &#10004;
                </Button>
                {owned.state === "deactivated" &&
                  <Button
                    disabled={false}
                    size="sm"
                    onClick={() => {
                      setIsNewPurchase(false)
                      setSelectedCourse(course)
                    }}
                    variant="purple">
                    Fund to Activate
                  </Button>}
              </div>
            }
            
            return <Button
              disabeled={`${!hasConnectedWallet}`}
              size="sm"
              onClick={() => setSelectedCourse(course)} 
              variant='lightPurple'
            >
              Purchase
            </Button>}}
      />}}
    </CourseList>
    {selectedCourse && 
      <OrderModal
        course={selectedCourse}
        isNewPurchase={isNewPurchase}
        onSubmit={purchaseCourse}
        onClose={() => {
          setSelectedCourse(null)
          setIsNewPurchase(true)
        }}
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
