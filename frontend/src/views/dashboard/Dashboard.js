import React, { useEffect, useRef, useState } from 'react'
import Hero from './herosection'
import About from './about'
import Count from './count'
import Bmicalc from '../pages/bmicalc'
import Foodrec from '../pages/foodrec'
import Recipee from './recipee'
import Diet from './diet'
import Customer from './customer'
import CIcon from '@coreui/icons-react'
import {
    cilArrowThickToTop
  } from '@coreui/icons'
const Dashboard = () => {
  const [scroll, setscroll] = useState(null);
  useEffect(() => {
    if (scroll) {
      window.scrollTo({
        top: 1250,
        behavior: 'smooth'
      })
      setscroll(null)
    }
  }, [scroll]);
  return (
    <div >

      <Hero setscroll={setscroll} />
      <main id="main">
        <About />
        <Count />
        {/* <!-- ======= BMI section ======= --> */}
        <section id="why-us" className="why-us">
          <div className="container-fluid" data-aos="fade-up">
            <div className="row">
              <div className="col-lg-4 col-sm-12 d-flex align-items-stretch">
                <Bmicalc />
              </div>
              <div className="col-lg-8 col-sm-12">
                <Foodrec id="foodrec" />
              </div>

            </div>

          </div>
        </section>
        {/* <!-- End Bmi calculator --> */}
        <Recipee />
        <Diet />
        <Customer />
      </main>
      <a href="#" className="back-to-top"><i className="bx bx-up-arrow-alt"><CIcon icon={cilArrowThickToTop}/></i></a>
      <div id="preloadr"></div>
    </div>
  )
}

export default Dashboard
