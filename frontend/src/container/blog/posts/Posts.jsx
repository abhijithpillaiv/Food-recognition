import React, { useState } from 'react'
import "./posts.css";
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function Posts({setsrch,srch,posts}) {
  const clickhandler=(post)=>{
    setsinglePost(true)
    setsrch(false)
    setrec(post)
    console.log(post);
  }
  useEffect(() => {
    if(srch){
      setsinglePost(false)
    }
  }, [srch])
  

  const clickHandleradd = () => {
    console.log('in');
    
    }
  
  const [singlePost, setsinglePost] = useState(false)
  const [rec, setrec] = useState(null)
  return !singlePost?
    <div className="posts">
      {posts ? posts.hits.map((post) => (
         <div className="post">
         <img className="postImg" src={post.recipe.image} alt="image" />
         <div className="postInfo">
             <span onClick={()=>clickhandler(post)} className="postTitle">{post.recipe.label}</span>
           <hr />
         </div>
   
       </div>
      )) : <h1> Waiting for the post</h1>}
    </div>
  :
  // Single post section
<div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
  <div className="singlePostWrapper row">
    <div className="col-12">
        <img style={{ height: '100%', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
    </div>
    <div className="col-12 singlepost-label">
      <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
      <Button onClick={clickHandleradd} className='col-2 btn' size="sm" variant="outline-success">Add food</Button>
    </div>
  </div>
  <div className='row'>
    <div className='col-6 singlepost-left'>
      <div className='singlepost-left-item1'>
        <div className='singlepost-headding'>
          Nutrient Info
        </div>
        <div className='singlepost-item-main container'>
          {rec.recipe.digest.map((item)=>(
          <div className='row'>
              <span className='col-4 singlepost-item-label'>
              {item.label}</span><span className='col-2'>:</span> <span className='col-6 singlepost-item-value'>
            {item.total.toFixed(2)}
          </span>
            </div>
          ))}
        </div>
      </div>
     <div className='singlepost-right-item2'>
        <div className='singlepost-headding'>
          Caution
        </div>
        <ul className='singlepost-item-main container'>
          {rec.recipe.cautions.map(item=><li>{item}</li>)}
        </ul>
      </div>
    </div>
    <div className='col-6 singlepost-right'>
    <div className='singlepost-right-item1'>
        <div className='singlepost-headding'>
          Cuisine Type
        </div>
        <ul className='singlepost-item-main container'>
          {rec.recipe.cuisineType.map(item=><li>{item}</li>)}
        </ul>
      </div>
      
      <div className='singlepost-right-item3'>
        <div className='singlepost-headding'>
          Ingredients
        </div>
        <ol className='singlepost-item-main container'>
          {rec.recipe.ingredientLines.map(item=><li>{item}</li>)}
        </ol>
      </div>
      <div className='singlepost-left-item2'>
      <div className='singlepost-headding'>
          Health Labels
        </div>
        <ul>{rec.recipe.healthLabels.map(item=><li>{item}</li>)}</ul>
      </div>
    </div>
  </div>
</div>
}
