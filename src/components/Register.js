import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion as m } from 'framer-motion';

const Register = () => {
  const { users, setUsers } = useContext(UsersContext);
  const navigate = useNavigate();

  // Formik logic
  const formik = useFormik({
    initialValues: {
      id: Math.floor(Math.random() * 1000),
      userName: '',
      email: '',
      password: '',
      terms: [],
    },
    // Yup - validate logic
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(20, 'Name must be 20 characters or less')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
      terms: Yup.array().required('Terms of service must be accepted'),
    }),
    // Submit form
    onSubmit: values => {
      console.log(values);

      // Check if email exists
      if (users.some(user => user.email === values.email)) {
        alert('Email already in use');
        return;
      }

      // Check if Username exists
      if (users.some(user => user.userName === values.userName)) {
        alert('Username already in use');
        return;
      }

      setUsers([...users, values]);
      navigate('/');
    },
  });

  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const hidden = { opacity: 0, y: 10 };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };

  return (
    <m.div
      initial={hidden}
      animate={visible}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className='h-screen flex items-center justify-center'>
      <form
        onSubmit={formik.handleSubmit}
        className='bg-white flex rounded-lg w-1/3 font-latoRegular'>
        <div className=' text-gray-700 px-20 py-10 w-full flex flex-col justify-center items-center'>
          <h1 variants={itemVariants} className='text-5xl pb-2 font-latoBold'>
            Register
          </h1>
          <div className='mt-6 flex flex-col justify-center items-center'>
            {/* USERNAME */}
            <div className='pb-4 mt-4 flex flex-col justify-center '>
              <label
                className={`block font-latoBold text-lg pb-2 ${
                  formik.touched.userName && formik.errors.userName
                    ? 'text-red-400'
                    : ''
                }`}
                htmlFor='userName'>
                {formik.touched.userName && formik.errors.userName
                  ? formik.errors.userName
                  : 'Username'}
              </label>
              <input
                type='text'
                name='userName'
                className='w-full border-2 border-gray-500 p-2 rounded-md focus:border-slate-500 focus:ring-slate-500'
                placeholder='Enter your username'
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* EMAIL */}
            <div className='pb-4 mt-4 flex flex-col justify-center '>
              <label
                className={`block font-latoBold text-lg pb-2 ${
                  formik.touched.email && formik.errors.email
                    ? 'text-red-400'
                    : ''
                }`}
                htmlFor='email'>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : 'Email'}
              </label>
              <input
                type='text'
                name='email'
                className='w-full border-2 border-gray-500 p-2 rounded-md focus:border-slate-500 focus:ring-slate-500'
                placeholder='Enter your email'
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* PASSWORD */}
            <div className='pb-4 mt-4 flex flex-col justify-center '>
              <label
                htmlFor='password'
                className={`block font-latoBold text-lg pb-2 ${
                  formik.touched.password && formik.errors.password
                    ? 'text-red-400'
                    : ''
                }`}>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : 'Password'}
              </label>
              <input
                type='password'
                name='password'
                className='w-full border-2 border-gray-500 p-2 rounded-md  focus:border-slate-500 focus:ring-slate-500'
                placeholder='Enter your password'
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* TERMS and SERVICE */}
            <div className='pb-4 w-full'>
              <label
                htmlFor='terms'
                className={`block font-latoBold text-sm pb-2 ${
                  formik.touched.terms && formik.errors.terms
                    ? 'text-red-400'
                    : ''
                }`}>
                {formik.touched.terms && formik.errors.terms
                  ? formik.errors.terms
                  : ''}
              </label>
              <input
                onChange={formik.handleChange}
                type='checkbox'
                name='terms'
                value='checked'
                className=' h-5 w-5 text-slate-500 border-2 focus:border-slate-500 focus:ring-slate-500'
              />
              <p className='text-sm font-latoBold text-gray-500'>
                I agree to the Terms and Service
              </p>
            </div>
            <div>
              <button
                type='submit'
                className='mt-8 px-8 border-2 border-slate-700 bg-slate-500 text-slate-100 p-2 rounded-md hover:bg-cyan-900 hover:scale-105 duration-300'>
                Register
              </button>
            </div>
            <div className='mt-4 '>
              <span className='flex flex-col items-center justify-center'>
                Already have an account?
                <Link
                  to='/'
                  className='font-semibold hover:scale-105 duration-300'>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </m.div>
  );
};

export default Register;
