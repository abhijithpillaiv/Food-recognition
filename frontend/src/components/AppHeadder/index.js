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

const AppHeader = () => {
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
  const [highlight, sethighlight] = useState('home')
  return (
    <div>
      <header style={{ margin: '10px', marginTop: '0px', fontFamily: 'sans-serif', fontSize: '300px' }} id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo mr-auto"><a style={{ textDecoration: 'none' }} href="/dashboard"><img style={{paddingBottom:'10px'}} src={logo}/></a></h1>

          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li className={highlight === 'home' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/dashboard"><span onClick={() => sethighlight('home')}>Home</span></Link></li>
              {/* <li className={highlight === 'diet' ? 'active' : null}><Link to="/login" style={{ fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer' }}><span onClick={() => sethighlight('diet')}>Diet</span></Link></li> */}
              <li className={highlight === 'blog' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/blog/chicken"><span onClick={() => sethighlight('blog')}>Blog</span></Link></li>
              <li className={highlight === 'about' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/about"><span onClick={() => sethighlight('about')}>About us</span></Link></li>
              <li className={highlight === 'personalise' ? 'active' : null}><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/personalise"><span onClick={() => sethighlight('personalise')}>food diary</span></Link></li>
              <li className={highlight === 'account' ? 'active' : highlight === 'signin'?'active':null}>{user ? <Link to='/account' style={{ fontWeight: 'bold', textDecoration: 'none' }}><span onClick={() => sethighlight('account')}>Account</span></Link> : <Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to="/login"><span onClick={() => sethighlight('signin')}>Signin</span></Link>}</li>
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
