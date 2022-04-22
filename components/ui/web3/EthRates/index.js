import Image from "next/image";
import {useEthPrice, COURSE_PRISE} from '@components/hooks/useEthPrice';
import {Loader} from "@components/ui/common";

const EthRates = () => {
  const {eth} = useEthPrice();

  return <div className="flex flex-col xs:flex-row text-center">
      <div className="p-6 border drop-shadow rounded-md mr-2">
        <div className="flex items-center justify-center">
          {eth.data ? 
          <>
            <Image 
              layout="fixed"
              height="35"
              width="35"
              src="/small-eth.webp"
              alt="eth logo"
            />
            <span className="text-lg font-bold"> = {eth.data}$</span>
          </> :
          <div className="w-full flex justify-center mb-1">
            <Loader/>
          </div>}
        </div>
        <p className="text-lg text-gray-500">Current eth Price</p>
      </div>
      <div className="p-6 border drop-shadow rounded-md">
      <div className="flex items-center justify-center">
          {eth.perItem ? 
          <>
            <span className="text-lg font-bold">{eth.perItem}</span> 
            <Image 
              layout="fixed"
              height="35"
              width="35"
              src="/small-eth.webp"
              alt="eth logo"
            />
            <span className="text-lg font-bold">= {COURSE_PRISE}$</span>
          </> :
          <div className="w-full flex justify-center mb-1">
            <Loader/>
          </div>}
        </div>
        <p className="text-lg text-gray-500">Price per course</p>
      </div>
    </div>
}

export default EthRates;