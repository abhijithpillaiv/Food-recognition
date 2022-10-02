import React from 'react'
import wlose from '../../assets/img/weightloose.jpg'
import wgain from '../../assets/img/wgain.jpg'
import wbody from '../../assets/img/wbody.jpg'

export default function diet() {
    return (
        <section id="popular-courses" className="courses">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>Diet</h2>
                    <p>Diet plans</p>
                </div>

                <div className="row" data-aos="zoom-in" data-aos-delay="100">

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                        <div className="course-item">
                            <img style={{ height: '400px', width: 'auto' }} src={wlose} className="img-fluid" alt="..." />
                            <div className="course-content">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 style={{ fontWeight: 'bolder', fontSize: '20px' }}>Weight Loose</h4>
                                </div>

                                <h3 ><a style={{ fontWeight: 'bold', textDecoration: 'none' }} href="">Low Carb Diet</a></h3>
                                <p>A low-carb diet is a diet that restricts carbohydrates, such as those found in sugary foods, pasta and bread. It is high in protein, fat and healthy vegetables.

                                    There are many different types of low-carb diets, and studies show that they can cause weight loss and improve health.

                                    This is a detailed meal plan for a low-carb diet. It explains what to eat, what to avoid and includes a sample low-carb menu for one week.

                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Course Item--> */}

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                        <div className="course-item">
                            <img style={{ height: '400px', width: '430px' }} src={wgain} className="img-fluid" alt="..." />
                            <div className="course-content">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 style={{ fontWeight: 'bolder', fontSize: '20px' }}>Weight Gain</h4>
                                    {/* <p className="price">$250</p> */}
                                </div>

                                <h3><a style={{ fontWeight: 'bold', textDecoration: 'none' }} href="">High Calorie diet</a></h3>
                                <p>A diet plan for weight gain should focus on high calorie and good quality protein intake. However, it is also essential to choose the right diet plan for weight gain that includes a healthy, well-balanced diet rather than just empty calories and fats. A proper diet plan for weight gain provides you with essential nutrients while helping you build muscle mass.

                                </p>
                                {/* <div className="trainer d-flex justify-content-between align-items-center">
                                    <div className="trainer-profile d-flex align-items-center">
                  <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt="" />
                  <span>Lana</span>
                </div>
                                    <div className="trainer-rank d-flex align-items-center">
                  <i className="bx bx-user"></i>&nbsp;35
                  &nbsp;&nbsp;
                  <i className="bx bx-heart"></i>&nbsp;42
                </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Course Item--> */}

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                        <div className="course-item">
                            <img style={{ height: '400px', width: '400px' }} src={wbody} className="img-fluid" alt="..." />
                            <div className="course-content">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 style={{ fontWeight: 'bolder', fontSize: '20px' }}>Muscle Building</h4>
                                </div>

                                <h3><a style={{ fontWeight: 'bold', textDecoration: 'none' }} href="">High protein diet</a></h3>
                                <p>Both nutrition and physical activity are critical if you want to gain lean muscle. It’s essential to challenge your body through physical activity but without proper nutritional support, your progress will stall.

                                    High protein foods are very important for gaining muscle, but carbohydrates and fats are also necessary sources of energy.

                                    If your goal is to gain lean muscle, you should focus on exercising regularly and eating more calories each day from muscle building foods.</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Course Item--> */}

                </div>

            </div>
        </section>
    )
}
