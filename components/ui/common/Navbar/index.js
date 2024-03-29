import {useWeb3} from "@components/providers";
import {ActiveLink} from "@components/ui/common";
import {Button} from "@components/ui/common";
import {useAccount} from "@components/hooks/web3";
import {useRouter} from "next/router";

const Navbar = () => {
  const {connect, isLoading, requareInstall} = useWeb3();
  const {account} = useAccount();
  const {pathname} =useRouter();

  return <section>
    <div className="relative py-6 px-4 sm:px-6 lg:px-8">
      <nav className="relative" aria-label="Global">
        <div className="flex flex-col xs:flex-row justify-between">
          <div>
            <ActiveLink href="/">
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</a>
            </ActiveLink>
            <ActiveLink href="/marketplace">
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</a>
            </ActiveLink>
            <ActiveLink href="/blogs">
              <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</a>
            </ActiveLink>
          </div>
          <div className="text-center">
            <ActiveLink href="/wishlist">
              <a className="font-medium xs:mr-8 mr-1 text-gray-500 hover:text-gray-900">Wish List</a>
            </ActiveLink>
            {isLoading ? 
            <Button disabled onClick={connect}>
              Loading...
            </Button> : 
            account.data ?
            <Button hoverable={false} className="cursr-default">
              Hi! {account.isAdmin && 'admin'}
            </Button> :
            requareInstall ?
            <Button onClick={() => window.open("https://metamask.io/download/", "_blank")}>
              Install Metamask
            </Button> :
            <Button onClick={connect}>
              Connect
            </Button>}
          </div>
        </div>
      </nav>
    </div>
    {account.data && !pathname.includes('/marketplace') &&
    <div className="flex justify-end pt-2 sm:px-6 lg:px-8">
      <div className="text-white bg-indigo-600 rounded-md p-2">
        {account.data }
      </div>
    </div>}
  </section>
}

export default Navbar;