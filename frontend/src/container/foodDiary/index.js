import React, { useState } from "react";
import Datepicker from "../../components/datepicker/index";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { useEffect } from "react";
import "./index.css";
import NutritionChart from "../../components/dropdown/index";
import Linechart from "../../components/lineChart/index";
import { FoodTable } from "./foodtable1";
import Addfood from "./addfood";
export default function index() {
  const [date, setdate] = useState(null);
  const [nut, setnut] = useState("calorie");
  const [visible, setvisible] = useState(false);
  const [datesArray, setdatesArray] = useState([]);
  const [singlepost, setsinglepost] = useState(null)
  useEffect(() => {
    const datesArrays = [];
    const today = new Date();
    for (let i = 7; i >= 1; i--) {
      const prevDate = new Date(today);
      prevDate.setDate(today.getDate() - i);
      const formattedDate = prevDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
      datesArrays.push(formattedDate);
    }
    setdatesArray(datesArrays);
  }, []);

  return (
    <>
      <div className="container-fluid ">
        <div className="row fooddiary-main">
          <div className="col-4 fooddiary-left">
            <div className="fooddiary-date fooddiary-item">
              <div className="fooddiary-headding">Select date:</div>
              <Datepicker setdate={setdate} />
            </div>

            <div className="fooddiary-nutchart fooddiary-item">
              <div className="fooddiary-headding">Nutrition Chart:</div>
              <NutritionChart setnut={setnut} />
            </div>
            <div className="fooddiary-chart">
              {datesArray && (
                <Linechart
                  nut={nut + " intake of last 7 days"}
                  labels={datesArray}
                  value={"value"}
                />
              )}
            </div>
          </div>
          <div className="col-8 fooddiary-mid">
            <div className="fooddiary-min-heading "> FOOD ITEMS</div>
            <FoodTable setsinglepost={setsinglepost} addfood={false} />
            <div className="fooddiary-addfood">
              <span>
                You have got <span>240</span> calories remaining{" "}
              </span>
              <span style={{ marginTop: "5px" }}>
                <button onClick={() => setvisible(true)}>Add food</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <CModal
        size="xl"
        alignment="center"
        visible={visible}
        onClose={() => setvisible(false)}
      >
        <CModalHeader>
          <CModalTitle className="fooddiary-addfood-heading">
            Add Food
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <Addfood />
        </CModalBody>
      </CModal>
    </>
  );
}
