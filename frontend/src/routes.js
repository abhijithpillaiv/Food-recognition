import React from 'react'

const Dashboard = React.lazy(() => import('./container/dashboard'))


const Login = React.lazy(() => import('./container/login&Signup/login/login'))
const logout = React.lazy(() => import('./container/settings/logout'))
const signup = React.lazy(() => import('./container/login&Signup/signup/signup'))

const personalise = React.lazy(() => import('./container/Personalise/index'))
const foodDiary = React.lazy(() => import('./container/foodDiary/index'))
// const foodDiary=import('./container/foodDiary/index')
const account = React.lazy(() => import('./container/account/account'))

const blog = React.lazy(() => import('./container/blog/blog'))

const about = React.lazy(() => import('./container/about/index'))

const signupSucess = React.lazy(() => import('./container/forgotPassword/signupSucess/signupSucess'))
const forgotPassword = React.lazy(() => import('./container/forgotPassword/forgotPass/forgotPassword'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/login', name: 'Settings / login', element: Login },
  { path: '/signup', name: 'signup', element: signup },

  { path: '/signupSucess/:token', name: 'signupSucess', element: signupSucess },
  { path: '/forgotPassword/:token', name: 'forgotPassword', element: forgotPassword },


  { path: '/logout', name: 'notice / Edit Notice', element: logout },


  { path: '/personalise', name: 'Personalise', element: personalise },
  { path: '/fooddiary', name: 'fooddiary', element: foodDiary },

  { path: '/account', name: 'account', element: account },

  { path: '/blog/:rec', name: 'blog', element: blog },

  { path: '/about', name: 'about', element: about },



]

export default routes
