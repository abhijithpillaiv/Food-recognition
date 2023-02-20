import React, { useState } from 'react'
import { CForm, CButton, CCol, CRow } from '@coreui/react';
import { Link } from 'react-router-dom';

export default function recipee() {

    const [tog, settog] = useState(0);
    const weightloose = [" Hummus Sandwich", " Spinach Stew", "Salmon-Stuffed Avocados", "Loaded Cauliflower Casserole", "Chhole", "Baked Banana-Nut Oatmeal Cups", "Vegan Superfood Grain Bowls", "Easy Pea", "Cheesy Beef Enchilada Casserole", "Spinach Carbonara", "Vegan Superfood Grain Bowls", "One-Pot Tomato Basil Pasta"]
    const weightgain = ["Homemade protein smoothies",'Peanut Butter on Wholegrain Toas','Chicken','Pasta Salad','Lamb Chops','Cheese Platter','Fruit Smoothie','Spaghetti Bolognese','Barley Soup','Noodle Stir-fry','Yoghurt Parfait']

    return (
        <section style={{paddingTop:'10px'}} id="features" className="features">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Recipe</h2>
                    <p>Some famous recipies for {tog?'Weight gain':'Weight lose'}</p>
                </div>
                <CForm className="row g-4">
                    <CCol xs='auto'>
                        <CButton color={tog == 0 ? "primary" : "light"} onClick={() => { settog(0) }} className="mb-12">
                            Weight lose
                        </CButton>

                    </CCol>
                    <CCol xs='auto'>

                        <CButton color={tog == 1 ? "primary" : "light"} onClick={() => { settog(1) }} className="mb-12">
                            Weight gain
                        </CButton>
                    </CCol>

                </CForm>
                <div className="row" data-aos="zoom-in" data-aos-delay="100">
                    {tog == 0 ? weightloose.map((item, key) => (
                        <div key={key} className="col-lg-3 col-md-4 mt-4">
                            <div className="icon-box">
                                {/* <i className="ri-fingerprint-line" style="color: #29cc61;"></i> */}
                                <h3><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to={`/blog/${item}`}>{item}</Link></h3>
                            </div>
                        </div>
                    )) : weightgain.map((item, key) => (
                        <div key={key} className="col-lg-3 col-md-4 mt-4">
                            <div className="icon-box">
                                {/* <i className="ri-fingerprint-line" style="color: #29cc61;"></i> */}
                                <h3><Link style={{ fontWeight: 'bold', textDecoration: 'none' }} to={`/blog/${item}`}>{item}</Link></h3>
                            </div>
                        </div>))}
                </div>

            </div>
        </section>
    )
}
