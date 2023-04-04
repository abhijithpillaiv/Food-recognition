import React from 'react'

export default function herosection({setscroll}) {
  return (
    <div id="hero" className="d-flex justify-content-center align-items-center">
    <div className="position-relative" data-aos="zoom-in" data-aos-delay="100">
      <h1>Don't focus on how much you eat,<br />focus on what you eat.</h1>
      <h2>Search what you eat. </h2>
      <div style={{textDecoration:'none',cursor:'pointer'}} onClick={()=>{setscroll(1)}}   className="btn-get-started">Search food</div>
    </div>
  </div>
  )
}
