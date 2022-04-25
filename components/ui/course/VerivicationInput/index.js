import {useState} from "react";
import {useWeb3} from "@components/providers";
import {Button, Massage} from "@components/ui/common";

const VerivicationInput = ({hash, proof}) => {
  const {web3} = useWeb3();
  const [email, setEmail] = useState("");
  const [isProofed, setIsProofed] = useState(null);

  const verifyCourse = (email, hash, proof) => {
    const emailHash = web3.utils.sha3(email);
    const proofToChek = web3.utils.soliditySha3(
      {type: 'bytes32', value: emailHash},
      {type: 'bytes32 ', value: hash}
    );

    proofToChek === proof ?
      setIsProofed(true) :
      setIsProofed(false);
  };

  return <>
    <div className="flex mr-2 mb-2 relative rounded-md">
      <input
        value={email}
        onChange={({target: {value}}) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="email" />
      <Button onClick={() => verifyCourse(email, hash, proof)}>
        Verify
      </Button>
    </div>
    {isProofed && <Massage type="success">Verify</Massage>}
    {isProofed === false && <Massage type="danger">Wrong Proof!</Massage>}
  </>
}

export default VerivicationInput;