import React from 'react'
import { useEffect, useState } from "react";
import Posts from "./components/posts/Posts";
import axios from "axios";
import './blog.css'
import { useParams } from 'react-router';
import Search from '../pages/search/searc.js';
import DD from '../pages/search/dropdown'
import Button from 'react-bootstrap/Button';


export default function blog() {

  const { rec } = useParams()
  const [posts, setPosts] = useState(null);
  const [recipe, setrecipe] = useState(null)
  const [diet, setdiet] = useState([])
  const [recip, setrecip] = useState(null)

  useEffect(() => {
    setrecipe(rec)
  }, [rec]);

  useEffect(() => {
    recipe && axios.get('https://api.edamam.com/search?q=' + recipe + '&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0').then((response) => {
      setPosts(response.data)
      console.log(response.data);
    })
  }, [recipe]);

const clickHandler = () => {
  var join=diet.join("");
  axios.get('https://api.edamam.com/api/recipes/v2?type=public&q='+recip+'&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0'+join).then((response) => {
      setPosts(response.data)
      console.log(response.data);
    })
  }
  return posts ? (
    <div className="container-fluid home" >
      <div className='row'>
        <div className='col-4 heading'><h1>Recipes</h1></div>
        <div style={{ paddingTop: '6px' }} className='col-4 '><DD setdiet={setdiet} /></div>
        <div className='col-3'><Search setrecipe={setrecip} /></div>
        <div className='col-1'> 
          <Button onClick={clickHandler} className='btn' size="sm" variant="outline-success">Search</Button>
        </div>
      </div>
      <Posts posts={posts} />
    </div>
  ) : <h1>waiting...</h1>;
}