import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../views/dashboard/Dashboard';
const AppHeader = () => {
  const [scroll, setscroll] = useState(null);
  useEffect(() => {
    if (scroll) {
      window.scrollTo({
        top: 2550,
        behavior: 'smooth'
      })
      setscroll(null)
    }
  }, [scroll]);
  const [user, setuser] = useState(0)
  const [highlight, sethighlight] = useState('home')
  return (
      <header style={{margin:'10px',marginTop:'0px',fontFamily:'sans-serif',fontSize:'300px'}} id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo mr-auto"><a style={{textDecoration:'none'}} href="/dashboard">Food</a></h1>

          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li  className={highlight==='home'?'active':null}><Link style={{fontWeight:'bold',textDecoration:'none'}} to="/dashboard"><span onClick={()=>sethighlight('home')}>Home</span></Link></li>
              <li className={highlight==='diet'?'active':null}><Link to="/login" style={{fontWeight:'bold',textDecoration:'none',cursor:'pointer'}}><span onClick={()=>sethighlight('diet')}>Diet</span></Link></li>
              <li className={highlight==='blog'?'active':null}><Link style={{fontWeight:'bold',textDecoration:'none'}} to="/blog/chicken"><span onClick={()=>sethighlight('blog')}>Blog</span></Link></li>
              <li className={highlight==='about'?'active':null}><Link style={{fontWeight:'bold',textDecoration:'none'}} to="/about"><span onClick={()=>sethighlight('about')}>About us</span></Link></li>

              <li >{user?<Link style={{fontWeight:'bold',textDecoration:'none'}}to="/login">Account</Link>:<Link style={{fontWeight:'bold',textDecoration:'none'}}to="/login">Signin</Link>}</li>
            </ul>
          </nav>
          {/* <!-- .nav-menu --> */}

          <a style={{fontWeight:'bold',textDecoration:'none'}} href="/personalise" className="get-started-btn">Dashboard</a>

        </div>
      </header>
  )
}

export default AppHeader
