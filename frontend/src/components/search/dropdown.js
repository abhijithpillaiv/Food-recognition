import React, { useEffect, useState } from 'react'
import Select from 'react-select'

const options = [
  { value: 'low-sodium', label: 'low-sodium' },
  { value: 'low-fat', label: 'low-fat' },
  { value: 'low-carb', label: 'low-carb' },
  { value: 'high-protein', label: 'high-protein' },
  { value: 'high-fiber', label: 'high-fiber' },
  { value: 'balanced', label: 'balanced' },
]

export default function dropdown({setdiet}) {
  const [Item, setItem] = useState([])
const [state, setstate] = useState()

useEffect(() => {
  setdiet(Item)
  console.log(Item);
}, [Item])

const chnageHandle = (e)=>{
  setItem(Array.isArray(e) ? e.map(x=>"&diet="+x.value):[])
  console.log(e.value);
  setstate(e)
}
  return (
    <div><Select isMulti value={state} onChange={chnageHandle} isSearchable placeholder='Diet' fluid  selection options={options} /></div>
  )
}
