
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout({userData ,clearUserData}) {
  return <>
       <Navbar clearUserData={clearUserData} userData={userData} />
       <div className="m-5 pb-2">
       <Outlet className=""></Outlet>
  
       </div>

   
       <Footer/>
    </>
  
}
