import React, { useEffect, useState } from 'react';
const axios = require("axios");
import add from '../../assets/add.png'
import { CChart } from '@coreui/react-chartjs'
import {CSpinner} from '@coreui/react';
import { Link } from 'react-router-dom';

export default function foodrec() {
    const [img, setimg] = useState(null);
    const [Preview, setPreview] = useState('');
    const [rec, setrec] = useState(null);
    const [toggle, settoggle] = useState(null);


 



    const handleUploadImage = async() => {
        settoggle(true)
        const data = new FormData();
        data.append('file', img);
        data.append('filename', 'filename');
        axios({
            method: "post",
            url: 'http://localhost:5000/upload',
             data: data,
        }).then((response) => {
            setrec(response.data)
            console.log(response);
            settoggle(false)
        })
    }
    const toshow =['Carbohydrate','fat','calories','protein']

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div style={{ textAlign: 'center' }} className="col-lg-7 col-sm-12">
                        <h3 style={{ fontWeight: 'bolder', fontFamily: 'sans-serif', color: 'green' }} >Upload to find what you eat</h3>
                        <div style={{ padding: '10px' }}>
                            <img style={{ height: '200px', width: 'auto' }} src={Preview ? Preview : add} alt="img" />
                            <div style={{ paddingTop: '50px' }}>
                                <input onChange={(e) => { setimg(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])) }} type="file" />
                            </div>
                            <br />
                            <div >
                                {rec?<Link to={`/blog/${rec.value.replace(/_/g, " ")}`} className='btn btn-success'>Get Recipe</Link>
                                :<button onClick={handleUploadImage} className='btn btn-success'>Upload</button>}
                                {toggle?<span style={{paddingLeft:'30px'}}><CSpinner size='sm' color="danger"/></span>:null}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }} className="col-lg-5 col-sm-12">
                        <h3 style={{ fontWeight: 'bolder', fontFamily: 'sans-serif', color: 'green' }}>Nutrition value (100g)</h3>
                        <div style={{ paddingBottom: '30px', paddingTop: '15px' }}>
                            {rec ? <CChart
                                type="bar"
                                data={{
                                    labels: ['Carbohydrate', 'fat', 'protein'],
                                    datasets: [
                                        {
                                            label: 'in grams',
                                            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#36A2EB'],
                                            data: [rec.cal.Carbohydrate, rec.cal.fat, rec.cal.protein],
                                        },
                                    ],
                                }}
                            /> :
                                <CChart
                                    type="bar"
                                    data={{
                                        labels: ['Carbohydrate', 'fat', 'protein'],
                                        datasets: [
                                            {
                                                label: 'gram',
                                                backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#36A2EB'],
                                                data: [0, 0, 0, 0],
                                            },
                                        ],
                                    }}
                                />}
                        </div>
                        <span style={{fontSize:'20px',fontWeight:'bold',color:'green',textDecoration:'underline'}}>{rec?rec.value:null}</span>
                        {/* Calorie response showcase */}
                        {rec&&rec.cal?<div className='cal_showcase'>
                            <div className='cal_showcase_r1'>
                                <div className='cal_showcase_carb'>
                                    <span className='key'>Carbohydrate</span>
                                    <span className='value'>{rec.cal.Carbohydrate}g</span>
                                </div>
                                <div className='cal_showcase_fat'>
                                    <span className='key'>Fat</span>
                                    <span className='value'>{rec.cal.fat}g</span>
                            </div>
                            </div>
                            <div className='cal_showcase_r2'>
                                <div className='cal_showcase_cal'>
                                    <span className='key'>Calories</span>
                                    <span className='value'>{rec.cal.calories}g</span>
                                </div>
                                <div className='cal_showcase_pro'>
                                    <span className='key'>Protein</span>
                                    <span className='value'>{rec.cal.protein}g</span>
                            </div>
                            </div>
                        </div>: <div>Upload image to get result...</div>}
                        {/* <table>
                           {rec?<tbody>
                                    <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                        <td style={{ textAlign: 'left', fontSize: '20px' }}>Carbohydrate</td>
                                        <td /><td /><td /><td />
                                        <td style={{ fontSize: '20px' }}>{rec.cal.Carbohydrate}</td>
                                        <td /><td /><td /><td /><td /><td /><td /><td />
                                        <td /><td /><td /><td /><td /><td /><td /><td />
                                        <td style={{ textAlign: 'left', fontSize: '20px' }}>fat</td>
                                        <td /><td /><td /><td />
                                        <td style={{ fontSize: '20px' }}>{rec.cal.fat}</td>
                                    </tr>

                                    <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                        <td style={{ textAlign: 'left', fontSize: '20px' }}>calories</td>
                                        <td /><td /><td /><td />
                                        <td style={{ fontSize: '20px' }}>{rec.cal.calories}</td>
                                        <td /><td /><td /><td /><td /><td /><td /><td />
                                        <td /><td /><td /><td /><td /><td /><td /><td />
                                        <td style={{ textAlign: 'left', fontSize: '20px' }}>protein</td>
                                        <td /><td /><td /><td />
                                        <td style={{ fontSize: '20px' }}>{rec.cal.protein}</td>
                                    </tr>
                            </tbody>:
                            <tbody><tr>Upload image to get result...</tr></tbody>
                            } 
                        </table> */}
                    </div>
                </div>
            </div>

        </>
    )
}