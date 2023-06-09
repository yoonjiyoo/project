import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.js";

import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';

function Rent(props) {
    const [filteredCars, setFilteredCars] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData() {
        if (props.contract) {
          const cars = await props.contract.methods.getAllCars().call();
          setFilteredCars(cars);
  
          const urls = await Promise.all(
            cars.map((car) => getImageUrl(car.carNumber))
          );
          setImageUrls(urls);
        }
      }
      fetchData();
    }, [props.contract]);
  
    async function getImageUrl(carNumber) {
      try {
        const doc = await db.collection('product').where("차량번호", "==", carNumber).get();
        if (!doc.empty) {
          const imageUrl = doc.docs[0].data().이미지;
          return imageUrl;
        }
        return null;
      } catch (error) {
        console.error("Error getting image URL:", error);
        return null;
      }
    }
  
    return (
      <div className="Day-1488-Job-List-UI-Design">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                  <button key={index} onClick={() => setFilteredCars(props.cars.filter(
                      x => (x.dayOfWeek & (1 << (6-index))) > 0
                  ))}>{day}</button>
              ))}
        {filteredCars.map((car, i) => (
           car.isRentable && (
           <div key={i} onClick={() => navigate("/search/" + car.idx)}>
            <div>
              {imageUrls[i] && <img src={imageUrls[i]} alt="차량 이미지" style={{ width: '300px', height: 'auto' }}/>}
            </div>
            <span>{car.carNumber}, </span>
            <span>{car.modelName}, </span>
            <span>{car.dayOfWeek}</span>
          </div>
        )))
      }
      </div>
    );
  }
  
  export default Rent;
