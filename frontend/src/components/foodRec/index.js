import React, { useEffect, useState } from 'react';
const axios = require("axios");
import add from '../../assets/add.png'
import { CChart } from '@coreui/react-chartjs'
import {CSpinner} from '@coreui/react';
import foodrecog from '../../hooks/foodRec'
const promise = require('promise');

export default function foodrec() {
    const [img, setimg] = useState(null);
    const [Preview, setPreview] = useState('');
    const [rec, setrec] = useState(null);
    const [toggle, settoggle] = useState(null);


 



    // const handleUploadImage = async() => {
    //     settoggle(true)
    //     let respo = await foodrecog(img,'im.jpg').then(()=>{
    //         console.log(respo);
    //         settoggle(false)
    //     })
    // }
    const handleUploadImage = () => {
        return new promise (async()=>{
            settoggle(true)
        let respo = await foodrecog(img,'im.jpg')
            console.log(respo);
            settoggle(false)
        })
    }

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
                            <div>
                                <button onClick={handleUploadImage} className='btn btn-primary'>Upload</button>
                                {toggle?<span style={{paddingLeft:'30px'}}><CSpinner size='sm' color="danger"/></span>:null}
                            </div>
                        </div>
                    </div>

                    {/* <div style={{ textAlign: 'center' }} className="col-lg-5 col-sm-12">
                        <h3 style={{ fontWeight: 'bolder', fontFamily: 'sans-serif', color: 'green' }}>Nutrition value (100g)</h3>
                        <div style={{ paddingBottom: '30px', paddingTop: '15px' }}>
                            {nutretionData[rec] ? <CChart
                                type="bar"
                                data={{
                                    labels: ['Carbohydrate', 'fat', 'protein'],
                                    datasets: [
                                        {
                                            label: 'in grams',
                                            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#36A2EB'],
                                            data: [nutretionData[rec]['Carbohydrate'], nutretionData[rec]['fat'], nutretionData[rec]['protein']],
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
                        <span style={{fontSize:'20px',fontWeight:'bold',color:'green',textDecoration:'underline'}}>{rec}</span>
                        <table>
                            <tbody>
                                {nutretionData[rec] ? Object.keys(nutretionData[rec]).map((key, index) =>
                                    <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }} key={index}>
                                        <td style={{ textAlign: 'left', fontSize: '25px' }}>{key}</td>
                                        <td /><td /><td />
                                        <td style={{ fontSize: '20px' }}>{nutretionData[rec][key]}</td></tr>
                                ) : <tr><td>Upload the image to get result..</td></tr>}
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </div>

        </>
    )
}