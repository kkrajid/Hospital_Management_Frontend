import { Outlet } from 'react-router-dom';
// import Header from './Header';
import { Toaster } from 'react-hot-toast';

const Layout = () => {

  return (
    <>
    <Outlet />
    <Toaster />
    </>
  )
}

export default Layout