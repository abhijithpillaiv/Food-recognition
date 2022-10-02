import React, { useEffect, useState } from 'react'
import './public/style.css'
const fitnessCalculatorFunctions = require("fitness-calculator");

export default function details({setamrval}) {
    const [name, setname] = useState(null);
    const [gender, setgender] = useState(null);
    const [age, setage] = useState(null);
    const [height, setheight] = useState(null);
    const [weight, setweight] = useState(null);
    const [activity, setactivity] = useState(null);

    const [bmi, setbmi] = useState(null);
    const [bmr, setbmr] = useState(null);
    const [amr, setamr] = useState(null);
    const [idealBodyWeight, setidealBodyWeight] = useState(null);
    var flag = 0;

    useEffect(() => {
        setamrval(Math.trunc(amr))
    }, [amr]);
    useEffect(() => {
        if (bmr) {

            if (activity == 'sedentary') {
                setamr(bmr * 1.2)
            }
            else if (activity == 'light') {
                setamr(bmr * 1.375)
            }
            else if (activity == 'moderate') {
                setamr(bmr * 1.55)
            }
            else if (activity == 'active') {
                setamr(bmr * 1.725)
            }
            else if (activity == 'extreme') {
                setamr(bmr * 1.9)
            }
            else {
                setamr(0)
            }
        }
    }, [bmr,activity]);
    const submitHandler = (e) => {
        e.preventDefault()
        if (gender && age && height && weight && activity) {

            if (gender == 'Male') {
                setbmr(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age))
                setidealBodyWeight(50 + (0.91 * (height - 152.4)))
            } else {
                setbmr(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age))
                setidealBodyWeight(45.5 + (0.91 * (height - 152.4)))
            }
        }
        setbmi(weight / ((height / 100) * (height / 100)))
    }
    return (
        <div className='container-fluid' style={{ backgroundColor: 'white' }}>
            <div style={{ paddingTop: '100px' }} className="card height-auto">
                <div className="card-body">
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3>Add Your details</h3>
                        </div>
                    </div>
                    <form className="new-added-form">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Name *</label>
                                <input required name="name" type="text" onChange={(e) => setname(e.target.value)} className="form-control" />
                            </div>

                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Gender *</label>
                                <select required name="gender" onChange={(e) => setgender(e.target.value)} className="select2 form-control ">
                                    <option value="">Please Select Gender *</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Age *</label>
                                <input required name="age" type="number" onChange={(e) => setage(e.target.value)} placeholder="" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Height *</label>
                                <input required name="height" type="number" onChange={(e) => setheight(e.target.value)} placeholder="cm" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Weight *</label>
                                <input required name="weight" type="number" onChange={(e) => setweight(e.target.value)} placeholder="kg" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Activity *</label>
                                <select required name="gender" onChange={(e) => setactivity(e.target.value)} className="select2 form-control ">
                                    <option value="">Please Select your activity type *</option>
                                    <option value="sedentary">sedentary</option>
                                    <option value="light">light</option>
                                    <option value="moderate">moderate</option>
                                    <option value="active">active</option>
                                    <option value="extreme">extreme</option>
                                </select>
                            </div>

                            <div className="col-12 form-group mg-t-8">
                                <button onClick={(e) => submitHandler(e)} className="btn-fill-lg btn-gradient-yellow btn-hover-bluedark">Save</button>
                                <button type="reset" className="btn-fill-lg bg-blue-dark btn-hover-yellow">Reset</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        {bmi&&bmr&&amr && <table>
                            <tbody>
                                <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'left', fontSize: '25px' }}>Your BMI</td>
                                    <td /><td /><td />
                                    <td style={{ fontSize: '20px' }}>: {bmi}</td></tr>

                                <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'left', fontSize: '25px' }}>Your BMR</td>
                                    <td /><td /><td />
                                    <td style={{ fontSize: '20px' }}>: {bmr}</td></tr>

                                <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'left', fontSize: '25px' }}>Your AMR</td>
                                    <td /><td /><td />
                                    <td style={{ fontSize: '20px' }}>: {amr}</td></tr>

                                <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'left', fontSize: '25px' }}>Your Ideal body weight</td>
                                    <td /><td /><td />
                                    <td style={{ fontSize: '20px' }}>: {idealBodyWeight}</td></tr>

                                <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                    <td style={{ textAlign: 'left', fontSize: '25px' }}>Your daily calorie needs</td>
                                    <td /><td /><td />
                                    <td style={{ fontSize: '20px' }}>: balance:{Math.trunc(amr)}  || mildWeightLoss:{Math.trunc(amr)-200}  || mildWeightGain:{Math.trunc(amr)+200}  || heavyWeightLoss:{Math.trunc(amr)-500}  || heavyWeightGain:{Math.trunc(amr)+500}</td>
                                </tr>
                            </tbody>
                        </table>}
                    </div>
                </div>

            </div>

        </div>
    )
}
