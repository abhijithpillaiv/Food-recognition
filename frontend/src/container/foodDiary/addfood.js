import React from "react";
import FoodTable  from "./foodtable";
import Search from "../../components/search/index";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import DD from "../../components/search/dropdown";
import axios from "axios";

export default function Addfood() {
  const [recip, setrecip] = useState(null);
  const [diet, setdiet] = useState([]);
  const [res, setres] = useState([]);
  const [singlepost, setsinglepost] = useState(null);
  const clickHandler = () => {
    var join = diet.join("");
    axios
      .get(
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          recip +
          "&app_id=d2645311&app_key=905c24c8760889ee37fccc59931366f0" +
          join
      )
      .then((response) => {
        setres(response.data.hits);
        console.log(response.data);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 fooddiary-left">
          <div className="fooddiary-date fooddiary-item">
            <div className="container-fluid blog-search">
              <div className="row">
                <div className="col-9">
                  <Search setrecipe={setrecip} />
                </div>
                <div className="addfood-search-btn col-3">
                  <Button
                    onClick={clickHandler}
                    className="addfood-btn"
                    size="sm"
                    variant="outline-success"
                  >
                    Search
                  </Button>
                </div>
              </div>
              <div className="row">
                <div style={{ paddingTop: "6px" }} className="col-12">
                  <DD setdiet={setdiet} />
                </div>
              </div>
            </div>
          </div>
          <div className="fooddiary-date fooddiary-item">
            <div className="fooddiary-headding">Upload image:</div>
            <input type="file" />
          </div>

          <div className="fooddiary-nutchart fooddiary-item">
            <div className="fooddiary-headding">Nutrition Chart:</div>
            <div className="fooddiary-chart"></div>
          </div>
          <div>
            
          </div>
        </div>
        <div className="col-8 fooddiary-mid">
          <div className="fooddiary-min-heading "> FOOD ITEMS</div>
          <FoodTable setsinglepost={setsinglepost}addfood={true} res={res} />
        </div>
      </div>
    </div>
  );
}
