import {Navbar, Footer} from '@components/common';

 const BaseLayout = ({children}) => {
  return <>
  <div className="relative max-w-7xl mx-auto px-4">
    <Navbar/>
    <div className="fit">
      {children}
    </div>
  </div>
  <Footer/>
</>
 }

 export default BaseLayout;