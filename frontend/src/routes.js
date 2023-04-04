import React from 'react'

const Dashboard = React.lazy(() => import('./container/dashboard'))


const Login = React.lazy(() => import('./login&Signup/login/login'))
const logout = React.lazy(() => import('./views/settings/logout'))
const signup = React.lazy(() => import('./login&Signup/signup/signup'))

const personalise = React.lazy(() => import('./views/Personalise/index'))
const account = React.lazy(() => import('./views/account/account'))

const blog = React.lazy(() => import('./container/blog/blog'))

const about = React.lazy(() => import('./container/about/index'))
const singlerec = React.lazy(() => import('./container/blog/components/singlePost/SinglePost'))

const signupSucess = React.lazy(() => import('./forgotPassword/signupSucess/signupSucess'))
const forgotPassword = React.lazy(() => import('./forgotPassword/forgotPass/forgotPassword'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/login', name: 'Settings / login', element: Login },
  { path: '/signup', name: 'signup', element: signup },

  { path: '/signupSucess/:token', name: 'signupSucess', element: signupSucess },
  { path: '/forgotPassword/:token', name: 'forgotPassword', element: forgotPassword },


  { path: '/logout', name: 'notice / Edit Notice', element: logout },


  { path: '/personalise', name: 'Personalise', element: personalise },
  { path: '/account', name: 'account', element: account },

  { path: '/blog/:rec', name: 'blog', element: blog },

  { path: '/about', name: 'about', element: about },
  { path: '/singlerec/:id', name: 'singlerec', element: singlerec },



]

export default routes
