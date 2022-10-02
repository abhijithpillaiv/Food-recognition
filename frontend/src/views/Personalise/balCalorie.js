import React, { useState } from 'react'
import { CChart } from '@coreui/react-chartjs'

export default function balCalorie({ carb, fat, protein, calories, amrval }) {
    return (
        <div style={{ paddingTop: '50px' }} className='container'>
            <div className='row'>
                <div className='col-4'>
                    <div style={{ textAlign: 'center' }}>
                        <CChart
                            type="doughnut"
                            data={{
                                labels: ['Used Calories', 'Remaining Calories'],
                                datasets: [
                                    {
                                        backgroundColor: ['#E46651', '#41B883'],
                                        data: [calories, amrval - calories],
                                    },
                                ],
                            }}
                        />
                        <div style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold', fontSize: '20px' }}> {amrval - calories >= 0 ? <div>You have remaining of {amrval - calories} calories</div> : <div>You have exceeded your limit.</div>}</div>
                    </div>
                </div>
                <div className='col-4'>
                <h3 style={{ fontWeight: 'bolder', fontFamily: 'sans-serif', color: 'green' }}>Nutrition value</h3>
                    <table>
                        <tbody>
                            <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                <td style={{ textAlign: 'left', fontSize: '25px' }}>Total Carbohydrate</td>
                                <td /><td /><td />
                                <td style={{ fontSize: '20px' }}> : {carb}g</td>
                            </tr>
                            <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                <td style={{ textAlign: 'left', fontSize: '25px' }}>Total Fat</td>
                                <td /><td /><td />
                                <td style={{ fontSize: '20px' }}> : {fat}g</td>
                            </tr>
                            <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                <td style={{ textAlign: 'left', fontSize: '25px' }}>Total Protein</td>
                                <td /><td /><td />
                                <td style={{ fontSize: '20px' }}> : {protein}g</td>
                            </tr>
                            <tr style={{ paddingTop: '5px', fontFamily: 'cursive', fontWeight: 'bold' }}>
                                <td style={{ textAlign: 'left', fontSize: '25px' }}>Total Calories</td>
                                <td /><td /><td />
                                <td style={{ fontSize: '20px' }}> : {calories}g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-4'>
                     <CChart
                        type="bar"
                        data={{
                            labels: ['Carbohydrate', 'fat', 'protein'],
                            datasets: [
                                {
                                    label: 'in grams',
                                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#36A2EB'],
                                    data: [carb, fat,protein]
                                },
                            ],
                        }}
                    />
                </div>
            </div>
        </div>

    )
}
