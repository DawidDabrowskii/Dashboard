import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoggedInContext } from '../contexts/LoggedInContext';

const Navbar = () => {
  const { setIsLogged, currentUser, setCurrentUser } =
    useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLogged(false);
    setCurrentUser({});

    navigate('/');
  };

  return (
    <nav className='w-full'>
      <div className=' flex justify-between'>
        <div className='p-4 text-2xl text-slate-100'>
          <p>Currently logged: {currentUser.userName}</p>
        </div>
        <div className='p-4 text-2xl text-slate-100'>
          <p
            onClick={handleSignOut}
            className='cursor-pointer hover:scale-105 duration-300'>
            Sign Out
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
