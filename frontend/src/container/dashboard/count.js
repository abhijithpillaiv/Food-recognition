import React from 'react'
import CountUp from 'react-countup'
export default function count() {
  return (
    <section id="counts" className="counts section-bg">
      <div className="container-fluid">

        <div className="row counters">

          <div className="col-lg-3 col-6 text-center">
            <CountUp start={0} end={4} delay={0} duration={4}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <p>Experts</p>
          </div>
          <div className="col-lg-3 col-6 text-center">
          <CountUp start={0} end={7000} delay={0} duration={4}> 
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <p>Recipes</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
          <CountUp start={0} end={64} delay={0} duration={4}> 
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <p>Diet plans</p>
          </div>

          <div className="col-lg-3 col-6 text-center">
          <CountUp start={0} end={101} delay={0} duration={4}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            <p>Food items</p>
          </div>



        </div>

      </div>
    </section>)
}
