import React from 'react'
import { useEffect, useState } from "react";
import Posts from "./components/posts/Posts";
import axios from "axios";
import './blog.css'
import {  useParams } from 'react-router';
import Search from '../pages/search/search';

export default function blog() {

  const { rec } = useParams()
  const [posts, setPosts] = useState(null);
  const [recipe, setrecipe] = useState(null)

  useEffect(() => {
    setrecipe(rec)
  },[rec]);

  useEffect(() => {
    recipe&&axios.get('https://api.edamam.com/search?q='+recipe+'&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0').then((response)=>{
      setPosts(response.data)
      console.log(response.data);
    })
  },[recipe]);


  return posts ? (
      <div  className="container-fluid home" >
        <div className='container-fluid'>
        <div className='row'>
        <h1 className='col-8 heading'>Recipes</h1>
        <span className='col-4'><Search setrecipe={setrecipe}/></span>
        </div>
        </div>
        <Posts posts={posts} />
      </div>
        ):<h1>waiting...</h1>;
}