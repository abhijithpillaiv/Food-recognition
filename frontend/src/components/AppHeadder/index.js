import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../../container/dashboard';
import logo from '../../assets/logo.png'
import { cookie } from '../../context/collection'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { port } from '../../context/collection';
import Profile from './profile_dropDown'
import picon from '../../assets/img/icon/profileicon.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'react-router-dom';

const AppHeader = () => {
  const location = useLocation();
  const { pathname } = location;
  const loc = pathname.split("/");
  const [tog, settog] = useState(false)
  const [cookies,] = useCookies([cookie]);
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
  useEffect(() => {
    cookies.data1 && axios.get(port + '/api/getUser/' + cookies.data1).then((res) => {
      if (res.data !== false) {
        console.log(res.data);
        setuser(res.data)
      }
    })
  }, [cookies])
  const [user, setuser] = useState(0)
  return (
    <div>
      <header style={{ margin: '0px', marginTop: '0px', fontFamily: 'sans-serif', fontSize: '300px' }} id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo mr-auto"><a style={{ textDecoration: 'none' }} href="/dashboard"><img style={{paddingBottom:'10px'}} src={logo}/></a></h1>

          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li className={loc[1] === 'dashboard' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/dashboard">Home</Link></li>
              <li className={loc[1] === 'blog' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/blog/chicken">Recipes</Link></li>
              <li className={loc[1] === 'about' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/about">About us</Link></li>
              <li className={loc[1] === 'fooddiary' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/fooddiary">food diary</Link></li>
              <li className={loc[1] === 'login' ? 'active' : loc[1] === 'signup'?'active':null}>{user ? <Link to='/account' style={{ fontWeight: 'bold', textDecoration: 'none' }}>Account</Link> : <Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/login">Signin</Link>}</li>
            </ul>
          </nav>
          {/* <!-- .nav-menu --> */}

          {/* <a style={{ fontWeight: 'bold', textDecoration: 'none' }} href="/personalise" className="get-started-btn">Dashboard</a> */}

          <div onClick={() => settog(!tog)} className='container align-items-center' style={{ cursor: 'pointer', fontSize: '20px', textAlign: 'right', fontFamily: 'sans-serif', fontWeight: 'bolder', paddingLeft: '0px' }}>
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <span>{user.name?user.name:'user'}</span>
                <span><img style={{ paddingLeft: '10px', width: 'auto', height: '20px' }} src={picon} /></span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
              <Profile user={user}/>
              </Dropdown.Menu>
            </Dropdown>

          </div>

        </div>

      </header>
    </div>
  )
}

export default AppHeader
