import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Posts from "../blog/posts/Posts";
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
  } from "@coreui/react";
export function FoodTable({setsinglepost,addfood,res}) {

    let columnNamesArray = ['Food item', 'Gram', 'Carb', 'Calories', 'Protein', 'Fat','Delete','Add'];

    const [rows, setrows] = useState(null)
    const [visiblity, setvisiblity] = useState(false)
    const [rec, setpost] = useState(null)
   
    useEffect(() => {
      if(res&&addfood){
        if(res.length==0){
            console.log("no item");
        }else{
            setrows(res.map((food_item,index)=>{
            return <FoodDataRow setpost={setpost} setvisiblity={setvisiblity} key={index} addfood={food_item.recipe.label} nut={food_item} />
        }))
        }
        
      }else{
        // convert data into rows
    const propss=[{data:'1'},{data:'1'}]
    setrows(propss.map((food_item, index) => {
        // return <FoodDataRow key={index} food={food_item} date={props.date} />
        return <FoodDataRow key={index} nut={"check"} addfood={false}/>

    }));
      }
    }, [addfood,res])

    useEffect(() => {
      if(visiblity&&addfood){
        setsinglepost(rec&&<div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
        <div className="singlePostWrapper row">
          <div className="col-12">
              <img style={{ height: '100%', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
          </div>
          <div className="col-12 singlepost-label">
            <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
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
      </div>)
      }else{
        setsinglepost(null)
      }
    }, [visiblity])
    
    
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th style={{width:'40%'}}>{columnNamesArray[0]}</th>
                        <th style={{width:'10%'}}>{columnNamesArray[1]}</th>
                        <th style={{width:'10%'}}>{columnNamesArray[2]}</th>
                        <th style={{width:'10%'}}>{columnNamesArray[3]}</th>
                        <th style={{width:'10%'}}>{columnNamesArray[4]}</th>
                        <th style={{width:'10%'}}>{columnNamesArray[5]}</th>
                        {!addfood?<th style={{width:'10%'}}>{columnNamesArray[6]}</th>:<th style={{width:'10%'}}>{columnNamesArray[7]}</th>}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <CModal
        size="lg"
        alignment="center"
        visible={visiblity}
        onClose={() => setvisiblity(false)}
      >
        <CModalHeader>
          <CModalTitle className="fooddiary-addfood-heading">
            Food Details
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        {rec&&<div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
  <div className="singlePostWrapper row">
    <div className="col-12">
        <img style={{ height: '100%', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
    </div>
    <div className="col-12 singlepost-label">
      <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
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
</div>}
        </CModalBody>
      </CModal>
        </div>
    )
}

function FoodDataRow({setpost,setvisiblity, addfood,nut, date }) { //food = props.food; date = props.date

    // save food item data to firebase realtime database
    const handleAddButton = (event) => {
        // event.preventDefault();

        // const db = getDatabase();
        // const newFoodItemDateData = {
        //     addedFoodItem: food.Food,
        //     date: date.toString().slice(0, 15)
        // }

        // const allAddedFoodData = ref(db, "allAddedFoodData");
        // firebasePush(allAddedFoodData, newFoodItemDateData);
    }
    const dltHandler=()=>{

    }
    const visibleHandler=(nut)=>{
        setpost(nut)
        setvisiblity(true)
        
    }
    return !addfood?<tr>
            <td>{nut}</td>
            <td>Measure</td>
            <td>Grams</td>
            <td>Calories</td>
            <td>Carbs</td>
            <td>Category</td>
            <td onClick={dltHandler} className="foottable-dlt"style={{cursor:'pointer',textAlign:'center'}}><CIcon  icon={icon.cilX} size="lg"/></td>

            </tr>
            :<tr style={{cursor:'pointer'}} onClick={()=>visibleHandler(nut)}>
            <td style={{width:'40%'}}>{addfood}</td>
            <td style={{width:'10%'}}><input style={{width:'50px'}} type='number'/></td>
            <td>{nut.recipe.digest[1].total.toFixed(1)}</td>
            <td>{nut.recipe.calories.toFixed(1)}</td>
            <td>{nut.recipe.digest[2].total.toFixed(1)}</td>
            <td>{nut.recipe.digest[0].total.toFixed(1)}</td>
            <td className="foottable-add"style={{cursor:'pointer',textAlign:'center'}}><CIcon  icon={icon.cilPlus} size="lg"/></td>

        </tr>
}
