import React, { useEffect, useState } from 'react'
import '../Personalise/public/style.css'
const fitnessCalculatorFunctions = require("fitness-calculator");
import { CChart } from '@coreui/react-chartjs'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import { port } from '../../context/collection';
import { cookie } from '../../context/collection'

export default function account() {
    const [name, setname] = useState(null);
    const [cookies,] = useCookies([cookie]);
    const [gender, setgender] = useState(null);
    const [age, setage] = useState(null);
    const [height, setheight] = useState(null);
    const [weight, setweight] = useState(null);
    const [activity, setactivity] = useState(null);

    const [bmi, setbmi] = useState(null);
    const [bmr, setbmr] = useState(null);
    const [amr, setamr] = useState(null);
    const [idealBodyWeight, setidealBodyWeight] = useState(null);

    const [bal, setbal] = useState(0)
    const [mwl, setmwl] = useState(0)
    const [mwg, setmwg] = useState(0)
    const [hwl, sethwl] = useState(0)
    const [hwg, sethwg] = useState(0)
    var flag = 0;
    const [user, setuser] = useState(false)
    // Get details
    useEffect(() => {
        if (cookies.data1) {
            axios.get(port + '/api/getDetails/' + cookies.data1).then((res) => {
                console.log(res.data);
                if (res.data) {
                    setage(res.data.age)
                    setgender(res.data.gender)
                    setheight(res.data.height)
                    setweight(res.data.weight)
                    setactivity(res.data.activity)
                    setamr(res.data.data.hdetails.amr)
                    setbal(res.data.data.cneed.bal)
                    setbmi(res.data.data.hdetails.bmi)
                    setbmr(res.data.data.hdetails.bmr)
                    setidealBodyWeight(res.data.data.hdetails.idealBodyWeight)
                    setmwl(res.data.data.cneed.mwl)
                    setmwg(res.data.data.cneed.mwg)
                    sethwl(res.data.data.cneed.hwl)
                    sethwg(res.data.data.cneed.hwg)
                } setuser(res.data)

            })
            axios.get(port + '/api/getUser/' + cookies.data1).then((res) => {
                setname(res.data.name)
                console.log(res);
            })
        }
    }, [cookies])


    const submitHandler = (e) => {
        e.preventDefault()
        axios.post(port + '/api/setDetails/', { id: cookies.data1, gender: gender, height: height, weight: weight, activity: activity, age: age, data: null }).then((res) => {
            console.log(res);
            window.location.reload(true)            
        })
    }
    return (
        <div className='container-fluid' style={{ backgroundColor: 'white' }}>
            <div style={{ paddingTop: '100px' }} className="card height-auto">
                <div className="card-body">
                    <div className="heading-layout1">
                        <div className="item-title">
                            <h3>{user ? "Details" : "Add Your details"}</h3>
                        </div>
                    </div>
                    <form className="new-added-form">
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Name *</label>
                                <input required name="name" value={name} type="text" className="form-control" />
                            </div>

                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Gender *</label>
                                <select required name="gender" value={gender} onChange={(e) => setgender(e.target.value)} className="select2 form-control ">
                                    <option value="">Please Select Gender *</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Age *</label>
                                <input required name="age" value={age} type="number" onChange={(e) => setage(e.target.value)} placeholder="" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Height *</label>
                                <input required value={height} name="height" type="number" onChange={(e) => setheight(e.target.value)} placeholder="cm" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Weight *</label>
                                <input required value={weight} name="weight" type="number" onChange={(e) => setweight(e.target.value)} placeholder="kg" className="form-control" />
                            </div>
                            <div className="col-xl-3 col-lg-6 col-12 form-group">
                                <label>Activity *</label>
                                <select required value={activity} name="gender" onChange={(e) => setactivity(e.target.value)} className="select2 form-control ">
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
                    <div className='container-fluid'>
                    {bmi && bmr && amr && <div className='row'>
                            <span className='col-6'><table>
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

                            </tbody>
                        </table></span>
                        <div className='col-6'><CChart
                                type="bar"
                                data={{
                                    labels: ['balance', 'mildWeightLoss', 'mildWeightGain', 'heavyWeightLoss', 'heavyWeightGain'],
                                    datasets: [
                                        {
                                            label: 'Calorie needs',
                                            backgroundColor: '#f87979',
                                            data: [bal, mwl, mwg, hwl, hwg],
                                        },
                                    ],
                                }}
                                labels="Your daily calorie needs"
                            /></div>
                        </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}
