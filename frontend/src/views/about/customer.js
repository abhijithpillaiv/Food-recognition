import React from 'react'
import { } from '@coreui/icons'
import fb from '../../assets/img/socialmedia/fb.png'
import linkedin from '../../assets/img/socialmedia/linkidin.png'
import insta from '../../assets/img/socialmedia/insta.png'
import twitter from '../../assets/img/socialmedia/twitter.png'
import srj from '../../assets/img/sooraj.jpg'
import abhi from '../../assets/img/abhi.jpg'
import vinsha from '../../assets/img/vinsha.jpg'
import reenu from '../../assets/img/reenu.jpg'

export default function customer() {
    return (
        <section id="trainers" className="trainers">
            <div className="container" data-aos="fade-up">

                <div className="section-title">
                    <h2>experts</h2>
                    <p>Contact our qualified team</p>
                </div>

                <div className="row" data-aos="zoom-in" data-aos-delay="100">
                    <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="member">
                            <img style={{ height: '300px', width: 'auto' }} src={abhi} className="img-fluid" alt="" />
                            <div className="member-content">
                                <h4>Abhijith V Pillai</h4>
                                <span>Expert</span>
                                <p>
                                    Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                                </p>
                                <div className="social">
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={fb} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={insta} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={twitter} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={linkedin} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="member">
                            <img style={{ height: '300px', width: '250px' }} src={reenu} className="img-fluid" alt="" />
                            <div className="member-content">
                                <h4>Reenumol S</h4>
                                <span>Expert</span>
                                <p>
                                    Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
                                </p>
                                <div className="social">
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={fb} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={insta} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={twitter} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={linkedin} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="member">
                            <img style={{ height: '300px', width: 'auto' }} src={srj} className="img-fluid" alt="" />
                            <div className="member-content">
                                <h4>Sooraj Varrma</h4>
                                <span>Expert</span>
                                <p>
                                    Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                                </p>
                                <div className="social">
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={fb} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={insta} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={twitter} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={linkedin} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="member">
                            <img style={{ height: '300px', width: '270px' }} src={vinsha} className="img-fluid" alt="" />
                            <div className="member-content">
                                <h4>Vinsha M</h4>
                                <span>Expert</span>
                                <p>
                                    Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                                </p>
                                <div className="social">
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={fb} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={insta} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={twitter} alt='' />
                                    <img style={{height:'40px',width:'auto',padding:'5px'}} src={linkedin} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}
