import {useState} from 'react';
import {BaseLayout} from '@components/ui/layout';
import {CourseList} from '@components/ui/course';
import {getAllCourses} from '@content/courses/fetcher';
import {useOwnedCourses, useWalletInfo} from '@components/hooks/web3';
import {CourseCard} from "@components/ui/course";
import {Button, Loader} from '@components/ui/common';
import {OrderModal} from '@components/ui/order';
import {MarketHeader} from '@components/ui/marketplace';
import {useWeb3} from '@components/providers';
import {withToast} from "@utils/toast";

const Marketplace = ({courses}) => {
  const {web3, contract, requireInstall} = useWeb3();
  const {hasConnectedWallet, isConnecting, account} = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const {ownedCourses} = useOwnedCourses(courses, account.data);
  const [busyCourseId, setBusyCourseId] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);

  const purchaseCourse = async (order, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);
    const orderHash = web3.utils.soliditySha3(
      {type: 'bytes16', value: hexCourseId},
      {type: 'address', value: account.data}
    );

    const value = web3.utils.toWei(String(order.price));
    setBusyCourseId(course.id);

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        {type: 'bytes32', value: emailHash},
        {type: 'bytes32', value: orderHash}
      );

      withToast(_purchaseCourse({hexCourseId, proof, value}, course));
    } else {
      withToast(_repurchaseCourse({courseHash: orderHash, value}, course));
    }
  };

  const _purchaseCourse = async ({hexCourseId, proof, value}, course) => {
    try {
      const result = await contract.methods.purchaseCourse(
        hexCourseId,
        proof
      ).send({from: account.data, value});

      ownedCourses.mutate([
        ...ownedCourses.data, {
          ...course,
          proof,
          state: "purchased",
          owner: account.data,
          price: value
        }
      ]);

      return result;
    } catch(error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null)
    }
  }

  const _repurchaseCourse = async ({courseHash, value}, course) => {
    try {
      const result = await contract.methods.repurchaseCourse(
        courseHash
      ).send({from: account.data, value});

      const index = ownedCourses.data.findIndex(c => c.id === course.id);

      if (index >= 0) {
        ownedCourses.data[index].state = "purchased";
        ownedCourses.mutate(ownedCourses.data);
      } else {;
        ownedCourses.mutate()
      }

      return result;
    } catch(error) {
      throw new Error(error.message);
    } finally {
      setBusyCourseId(null)
    }
  }

  const cleanupModal = () => {
    setSelectedCourse(null)
    setIsNewPurchase(true)
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
              return <Button
                  disabled={true}
                  size="sm"
                  variant="lightPurple">
                  <Loader size="sm" />
                </Button>
            }
            
            if (!ownedCourses.hasInitialResponse) {
              return <Button
                variant="white"
                disabled={true}
                size="sm">
                Loading State...
              </Button>
            }

            const isBusy = busyCourseId === course.id;

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
                    disabled={isBusy}
                    size="sm"
                    onClick={() => {
                      setIsNewPurchase(false)
                      setSelectedCourse(course)
                    }}
                    variant="purple">
                    {isBusy ?
                      <div className="flex">
                        <Loader size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div> :
                      <div>Fund to Activate</div>}
                  </Button>}
              </div>
            }
            
            return <Button
            disabled={!hasConnectedWallet || isBusy}
              size="sm"
              onClick={() => setSelectedCourse(course)} 
              variant='lightPurple'
            >
              {isBusy ?
                <div className="flex">
                  <Loader size="sm" />
                  <div className="ml-2">In Progress</div>
                </div> :
                <div>Purchase</div>
              }
            </Button>}}
      />}}
    </CourseList>
    {selectedCourse && 
      <OrderModal
        course={selectedCourse}
        isNewPurchase={isNewPurchase}
        onSubmit={(formData, course) => {
          purchaseCourse(formData, course)
          cleanupModal()
        }}
        onClose={cleanupModal}
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
