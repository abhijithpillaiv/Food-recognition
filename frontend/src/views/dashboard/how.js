import React from 'react'
import aboutimg from '../../assets/img/how.jpg'
export default function how() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>How</h2>
          <p>How can you use this ?</p>
        </div>

        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
            <img src={aboutimg} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
            <h3>Search what you eat and arrange your diet accordingly.</h3>
            <p className="font-italic">
              We help you choose what is right for you to eat according to your body.
            </p>
            <ul>
              <li> Get the best diet plan and nutrients in them.</li>
              <li> Update your datas to know what you can eat and how much to eat.</li>
              <li> Get your BMI,Calorie intake and all you need in just a click.</li>
            </ul>
            <p>
              Life without good health is like an army without soldiers and chocolate without cocoa. Health is important to live life to the fullest.

              When a person leads a healthy lifestyle, the body remains healthy and the mind is active and fresh.

              Living a healthy life would extend longevity and also regenerate the body and mind.

              Having good health is of core importance to human happiness.          </p>
            <a style={{ textDecoration: 'none' }} href="" className="learn-more-btn">Learn More</a>
          </div>
        </div>

      </div>
    </section>
  )
}
