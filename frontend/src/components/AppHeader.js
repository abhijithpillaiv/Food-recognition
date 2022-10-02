import React, { useEffect, useState } from 'react'
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
  return (
      <header style={{margin:'10px',marginTop:'0px',fontFamily:'sans-serif',fontSize:'300px'}} id="header" className="fixed-top">
        <div className="container d-flex align-items-center">

          <h1 className="logo mr-auto"><a style={{textDecoration:'none'}} href="/dashboard">Food</a></h1>

          <nav className="nav-menu d-none d-lg-block">
            <ul>
              <li  className="active"><a style={{fontWeight:'bold',textDecoration:'none'}} href="/dashboard">Home</a></li>
              <li><a onClick={()=>{setscroll(1)}}  style={{fontWeight:'bold',textDecoration:'none',cursor:'pointer'}} >Diet</a></li>
      
              <li><a style={{fontWeight:'bold',textDecoration:'none'}} href="/login">Signin</a></li>
              <li><a style={{fontWeight:'bold',textDecoration:'none'}} href="/login">Login</a></li>

            </ul>
          </nav>
          {/* <!-- .nav-menu --> */}

          <a style={{fontWeight:'bold',textDecoration:'none'}} href="/personalise" className="get-started-btn">Personalise your diet</a>

        </div>
      </header>
  )
}

export default AppHeader
