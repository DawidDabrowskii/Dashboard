import { Link, useNavigate } from 'react-router-dom';

import { UsersContext } from '../contexts/UsersContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { useContext } from 'react';

import { useFormik } from 'formik';
import { motion as m } from 'framer-motion';
import * as Yup from 'yup';

const Login = () => {
  const { users } = useContext(UsersContext);
  const { setIsLogged, setCurrentUser } = useContext(LoggedInContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    // Yup - validate logic
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, 'Name must be 20 characters or less')
        .required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),

    // Submit form
    onSubmit: values => {
      const exist = users.find(
        ({ userName, password }) =>
          userName === values.userName && password === values.password
      );
      if (!exist) alert('Wrong username or password');
      if (!exist) return;

      setCurrentUser(exist);
      setIsLogged(true);
      navigate('/dashboard');
    },
  });

  // Page Transitions
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const hidden = { opacity: 0, y: 10 };

  return (
    <m.div
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      onSubmit={formik.handleSubmit}
      className='h-screen flex items-center justify-center'>
      <form className='bg-white flex rounded-lg w-1/3 font-latoRegular'>
        <div className=' text-gray-700 px-20 py-10 w-full flex flex-col justify-center items-center'>
          <h1 className='text-5xl pb-2 font-latoBold'>Login</h1>
          <div className='mt-6 flex flex-col justify-center items-center'>
            {/* USERNAME */}
            <div className='pb-4 mt-4 flex flex-col justify-center '>
              <label
                htmlFor='username'
                className='block font-latoBold text-lg pb-2 '>
                Username
              </label>
              <input
                type='text'
                name='userName'
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                className='w-full border-2 border-gray-500 p-2 rounded-md focus:border-slate-500 focus:ring-slate-500'
              />
            </div>
            {/* PASSWORD */}
            <div className='pb-4 mt-4 flex flex-col justify-center '>
              <label
                htmlFor='password'
                className='block font-latoBold text-lg pb-2'>
                Password
              </label>
              <input
                type='password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className='w-full border-2 border-gray-500 p-2 rounded-md  focus:border-slate-500 focus:ring-slate-500'
              />
            </div>
            <div>
              <button
                type='submit'
                className='mt-8 px-8 border-2 border-slate-700 bg-slate-500 text-slate-100 p-2 rounded-md hover:bg-cyan-900 hover:scale-105 duration-300'>
                Login
              </button>
            </div>
            <div className='mt-4 '>
              <span className='flex flex-col items-center justify-center'>
                Don't have an account?
                <Link
                  to='/register'
                  className='font-semibold hover:scale-105 duration-300'>
                  Register
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </m.div>
  );
};

export default Login;
