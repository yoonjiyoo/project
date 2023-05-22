import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useState, useEffect } from "react";

function MyCdr() {
    const [value, onChange] = useState(new Date());
  
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      // console.log(date.getDay());
      return `${year}${month}${day}`;
    }
    return (
      <div>
        <Calendar onChange={onChange} value={value} />
        <p>{formatDate(value)}</p>
      </div>
    );
  }

function Main() {
    return (
        <div>
            <p>메인~</p>
            <MyCdr/>
        </div>
    );
}

  export default Main;