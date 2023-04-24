import React, { useEffect, useState } from 'react'
import Hero from './herosection'
import How from './how'
import Count from './count'
import Bmicalc from '../../components/bmiCalculator/index'
import Foodrec from '../../components/foodRec/index'
import Recipee from './recipee'
import Bot from '../bot/bot'
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
        <How/>
        <Count />
        {/* <!-- ======= BMI section ======= --> */}
        <section id="why-us" className="why-us">
          <div className="container-fluid" data-aos="fade-up">
            <div className="row">
              <div className="col-12 d-flex align-items-stretch">
                <Foodrec id="foodrec" />
              </div>

            </div>

          </div>
        </section>
        {/* <!-- End Bmi calculator --> */}
        <Recipee />
        {/* <Customer /> */}
      </main>
      <Bot/>
      <div id="preloadr"></div>
    </div>
  )
}

export default Dashboard
