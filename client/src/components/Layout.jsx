import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Badge, message } from 'antd';
import Footer from './Footer';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationPage';
import { hideLoading } from "../redux/features/alertSlice"

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  // const { user } = useSelector((state) => state.users);

  const showLogoutConfirmationModal = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(hideLoading());
    navigate('/login');
    window.location.reload();
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowLogoutConfirmation(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };


  return (
    <>
      <div className="flex justify-between items-center bg-slate-600 p-5 max-h-20">
        <h1 className="text-2xl text-white">
          <img alt="Proctor" style={{ width: '175px' }} />
        </h1>
        <div className="flex items-center justify-end ">
          <ul className="flex gap-6 list-none mr-8">
            <li>
              <a
                href={location.pathname === '/' ? '#' : '/'}
                className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#shop"
                className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
                onClick={(e) => {
                  navigate('/about');
                  window.location.reload();
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contactUs"
                className="text-white text-xl hover:text-gray-600 no-underline hover:bg-gray-200 p-1 hover:rounded"
              >
                Contact Us
              </a>
            </li>
          </ul>

          <div className="bg-white px-2 py-3 rounded flex gap-1 items-center">
            {/* <i className="ri-user-2-fill"></i>
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  if (user.role === 'user') {
                    navigate('/profile');
                  } else {
                    navigate('/admin');
                  }
                }}
              >
                {user.name}
              </span> */}

            <i
              className="ri-logout-circle-r-line ml-2 cursor-pointer"
              onClick={showLogoutConfirmationModal}
            ></i>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>Children Here</h1>
        {children}
      </div>
      <Footer />
      <ConfirmationModal
          visible={showLogoutConfirmation}
          onConfirm={handleLogoutConfirmation}
          onCancel={handleLogoutCancel}
        />
    </>
  );
};

export default Layout;
