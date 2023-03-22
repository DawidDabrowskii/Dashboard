import { useContext, useEffect } from 'react';
import { UsersContext } from '../contexts/UsersContext';
import { LoggedInContext } from '../contexts/LoggedInContext';

import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

import { motion as m } from 'framer-motion';

const Dashboard = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { isLogged, currentUser } = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/');
  }, [isLogged, navigate]);

  const handleRemove = id => {
    if (Number(currentUser.id) === Number(id)) return;

    setUsers(users.filter(user => Number(id) !== Number(user.id)));
  };

  // Page transition
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };

  return (
    <>
      <Navbar />
      <m.main
        initial='hidden'
        animate='visible'
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        className=' bg-white flex flex-col items-center mx-12 md:mx-24 lg:mx-48 xl:mx-96 rounded-lg'>
        <m.h1
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible,
          }}
          className='text-4xl mt-4'>
          Dashboard
        </m.h1>
        <div className='my-12 text-2xl font-latoBold flex justify-center w-full'>
          <ul className='flex flex-col gap-4 w-full px-4'>
            <p className='text-center'>Users List</p>
            {users.map(({ userName, email, id }) => {
              return (
                <m.li
                  variants={itemVariants}
                  key={id}
                  className='flex justify-between font-latoRegular px-8'>
                  <span className='my-4 '>{userName}</span>
                  <span className='my-4 '>{email}</span>
                  {Number(currentUser.id) === Number(id) ? (
                    <p className='my-4 whitespace-nowrap text-emerald-500'>
                      Logged in
                    </p>
                  ) : (
                    <button
                      onClick={() => handleRemove(id)}
                      className='text-red-500 hover:text-red-600 hover:scale-105 duration-300'>
                      Remove
                    </button>
                  )}
                </m.li>
              );
            })}
          </ul>
        </div>
      </m.main>
    </>
  );
};

export default Dashboard;
