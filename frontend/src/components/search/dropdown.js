import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './search.css'
const options = [
  { value: 'low-sodium', label: 'Low Sodium' },
  { value: 'low-fat', label: 'Low Fat' },
  { value: 'low-carb', label: 'Low Carb' },
  { value: 'high-protein', label: 'High Protein' },
  { value: 'high-fiber', label: 'High Fiber' },
  { value: 'balanced', label: 'Balanced' },
]

export default function dropdown({setdiet}) {
  const [Item, setItem] = useState([])

useEffect(() => {
  setdiet(Item)
  console.log(Item);
  
}, [Item])


const chnageHandle = (e)=>{
  //setItem(Array.isArray(e) ? e.map(x=>"&diet="+x.value):[])
  const x="&diet="+e.value
  Item.includes(x)?setItem(Item.filter(item => item !== x)):setItem([...Item,x])
}
  return (

<div className='container-fluid'>
  <div className='row'>
    {options.map((opt)=>{return(
      <div className="capsule-container col-6" >
      <div onClick={()=>chnageHandle(opt)} className="container capsule"  id={Item.includes("&diet="+opt.value)?'opt-selected':null}>
        <p className="capsule-text" id={opt.value}>{opt.label}</p>
      </div>
    </div>
  
    )})}
</div>
</div> 

    )
}
