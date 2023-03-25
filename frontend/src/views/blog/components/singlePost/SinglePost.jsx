import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import "./singlePost.css";
import {  useParams } from 'react-router';

export default function SinglePost() {
  const { id } = useParams()
   // state
  const [res, setres] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: 'https://api.edamam.com/api/recipes/v2/'+id+'?type=public&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0',
    }).then((response) => {
      setres(response.data)
      console.log(response.data);
    })
  }, [id]);
  


  return res ? (
    <div style={{paddingTop:'20px'}} className=" singlePost container">
      <h1>Recipes and Healthy Tips</h1>
      <div className="singlePostWrapper row">
        <div className="col-sm-12 col-md-12">
            <img style={{ height: '100%', width: 'auto' }} src={res.recipe.image} alt="" className="singlePostImg imag" />
        </div>
        <div className="col-sm-12 col-md-12 ">
          <div style={{textAlign:'center'}} className='singlePostHeading'>{res.recipe.label}</div>
        </div>

        {/* <div className="col-sm-12 col-md-12 ">
          <div className='singlePostServes'>dietLabels : {res.recipe.dietLabels}</div>
          <p className='singlePostDesc'></p>
        </div>
        <div className="col-sm-12 col-md-12">
          <div className='singlePostHeading'>Ingredients</div><br />
          {res.ingredients.split('\n').map(str => <p className=" singlePostDesc_inc">{str}</p>)}
        </div>
        <div className="col-sm-12 col-md-12">
          <div className='singlePostHeading'>Preparation</div><br />
          {res.preparation.split('\n').map(str => <p className="singlePostDesc">{str}</p>)}
        </div> */}

      </div>
    </div>
  ) : <h1>Waiting</h1>;
}
