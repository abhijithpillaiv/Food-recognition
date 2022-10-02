import React, { useEffect, useState } from 'react'
import { CForm, CFormInput, CButton, CCol, CRow } from '@coreui/react';

export default function bmicalc() {
    const [cal, setcal] = useState(0);
    const [comment, setcomment] = useState(null);
    const [height, setheight] = useState(0);
    const [weight, setweight] = useState(0);
    const clickHandler = () => {
        setcal(parseFloat(weight / ((height / 100) * (height / 100))).toFixed(1));
    }
    useEffect(() => {
        if (cal) {
            if (cal < 18.5) {
                setcomment("You are underWeight")
            }
            else if (cal >= 18.5 && cal < 25) {
                setcomment("Hey your weight is normal.")
            }
            else if (cal >= 25 && cal < 30) {
                setcomment("You are overweight.")
            }
            else {
                setcomment("You are obese.")
            }
        }
    }, [cal]);
    return (
        <div className="content">
            <h3>BMI Calculator</h3>
            <CForm className="row g-4">
                <CCol>
                    <CRow className="mb-3" >
                        <CFormInput onChange={(e) => { setheight(e.target.value) }}
                            type='number'
                            id="exampleFormControlInput1"
                            label="Height (cm)"
                        />
                    </CRow>
                    <CRow className='mb-3'>
                        <CFormInput onChange={(e) => { setweight(e.target.value) }}
                            type='number'
                            id="exampleFormControlInput1"
                            label="Weight (kg)"
                        />
                    </CRow>

                    <CRow className="mb-3" >
                        <CButton onClick={clickHandler} className="mb-12">
                            Calculate
                        </CButton>
                    </CRow>

                    <CRow className="mb-3">
                        <div style={{ fontWeight: 'bolder', fontSize: '20px', color: 'red' }} className="col-form-label">Your BMI is :: {cal ? cal : NaN}
                            <div>{comment ? comment : null}</div>
                        </div>
                    </CRow>
                </CCol>
            </CForm>
        </div>
    )
}
