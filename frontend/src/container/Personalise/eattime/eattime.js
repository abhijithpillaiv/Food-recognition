import React from 'react'
import Eatsub from './eatsub'
import './eat.css'
export default function ({carb,fat,protein,calories,setcarb,setfat,setprotein,setcalories}) {
  return (
    <div className='container-fluid'>
        <div id="eatborder" className='row'>
          <div  className="col-lg-3 col-sm-12"><Eatsub carb={carb}fat={fat}protein={protein} calories={calories} setcarb={setcarb} setfat={setfat} setprotein={setprotein}    setcalories={setcalories}  time={'BREAKFAST'}/></div>
          <div className="col-lg-3 col-sm-12"><Eatsub carb={carb}fat={fat}protein={protein} calories={calories} setcarb={setcarb} setfat={setfat} setprotein={setprotein}  setcalories={setcalories}  time={'LUNCH'}/></div>
          <div className="col-lg-3 col-sm-12"><Eatsub carb={carb}fat={fat}protein={protein} calories={calories} setcarb={setcarb} setfat={setfat} setprotein={setprotein}  setcalories={setcalories}  time={'DINNER'}/></div>
          <div className="col-lg-3 col-sm-12"><Eatsub carb={carb}fat={fat}protein={protein} calories={calories} setcarb={setcarb} setfat={setfat} setprotein={setprotein}  setcalories={setcalories}  time={'EXTRA'}/></div>   
        </div>
    </div>
  )
}
