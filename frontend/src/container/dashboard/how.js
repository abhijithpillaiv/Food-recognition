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
            <ul>
              <li> Get the best diet plan and nutrients in them.</li>
              <li> Update your datas to know what you can eat and how much to eat.</li>
              <li> Get your BMI,Calorie intake and all you need in just a click.</li>
              <li>Search recipes according to your liking</li>
            </ul>
            <p>Signup with a valid email id, update your details on account sections add your food items and track it in the dashboard section.</p>
            <a style={{ textDecoration: 'none' }} href="" className="learn-more-btn">Learn More</a>
          </div>
        </div>

      </div>
    </section>
  )
}
