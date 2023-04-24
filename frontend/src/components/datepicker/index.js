import React, { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
export default function index({setdate}) {
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    setdate(value)
  }, [value])

  
    let handleColor = (time) => {
      return time.getHours() > 12 ? "text-success" : "text-error";
    };
  
    return (
      <DatePicker
        showTimeSelect
        selected={value}
        onChange={onChange}
        timeClassName={handleColor}
      />
    );
  };
