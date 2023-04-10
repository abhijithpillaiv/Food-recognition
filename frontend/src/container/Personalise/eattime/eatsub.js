import React, { useState } from 'react'
import Foodrec from './foodrec'
import CIcon from '@coreui/icons-react'
import {
    cilPlus
  } from '@coreui/icons'
  import {
    CButton
  } from '@coreui/react'
export default function eatsub({ carb,fat,protein,calories,setcarb,setfat,setprotein,setcalories, time }) {
    const [state, setstate] = useState([]);
    const clickhandler=(e)=>{
        e.preventDefault()
        setstate([...state,'1'])
        console.log(state);
    }
    return (
        <div>
            <h3 style={{ fontWeight: 'bolder',textDecoration:'underline', fontFamily: 'sans-serif', color: 'green', textAlign: 'center' }} >{time}</h3>

            {state&&state.map((index)=>{return(<Foodrec fat={fat} protein={protein}calories={calories} carb={carb} setcarb={setcarb} setfat={setfat} setprotein={setprotein} setcalories={setcalories} id="foodrec" />)})}
            <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{color:'red',cursor:'pointer'}} onClick={(e)=>clickhandler(e)}><CIcon size='xl' icon={cilPlus}/> Add New Item </div>
            {/* <CButton onClick={(e)=>clickhandler(e)} color="danger" variant="outline" ><span style={{ fontWeight: 'bolder',fontSize:'20px', fontFamily: 'sans-serif', textAlign: 'center' }}>ADD</span><CIcon size='xl' icon={cilPlus}/></CButton> */}
            </div>
        </div>

    )
}
