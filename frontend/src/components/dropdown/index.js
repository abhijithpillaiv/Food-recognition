import React from 'react'
import './index.css'
export default function index({setnut}) {
  return (
    <div >
  <select onChange={(e)=>setnut(e.target.value)} className="dd">
  <option value="calories">calories</option>
  <option value="fat">fat</option>
  <option value="Carbohydrate">Carbohydrate</option>
  <option value="protein">protein</option>
</select>
</div>
  )
}
