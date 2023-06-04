import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.js";
import {db} from '../index.js'
import "firebase/firestore"; 
import 'firebase/storage';

function Rent(props) {
    const [filteredCars, setFilteredCars] = useState();
    let [carImage, setcarImage] = useState();
    let carImage2;
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState('');

    useEffect(() => {
        async function getCount() {
            if (props.contract) {
                // setFilteredCars(props.cars); // 새로고침하면 빈 리스트됨 
                setFilteredCars(await props.contract.methods.getAllCars().call());
                //console.log(await props.contract.methods.getReservedDates("22나2222").call());
            }
        }
        getCount();
      }, [props.contract]);
      function Img(x){
        db.collection('product').where("차량번호","==", x).get().then((결과)=>{
            결과.forEach((doc)=>{
                // setcarImage(결과.이미지)
                // setcarImage(doc.data().이미지)
                // var 템플릿 = `
                //     <div><img src=${doc.data().이미지} alt='이미지'/></div>
                //   `;
                //   document.getElementById("con3").innerHTML=템플릿;
                carImage2= doc.data().이미지
                //   })
                
            })
        })
      }
      return (
        <div className="Day-1488-Job-List-UI-Design" id = "con">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <button key={index} onClick={() => 
                    setFilteredCars(props.cars.filter(
                    x => (x.dayOfWeek & (1 << (6-index))) > 0
                ))}>{day}</button>
            ))}
            {
                filteredCars != undefined ? filteredCars.map((car, i)=>{
                    return(
                        <div className="Rectangle-2" key={i} id="con2">
                            <span>{car.dayOfWeek}</span>
                            <span>{Img(car.carNumber)}</span>
                            <span onClick={()=>navigate("/search/"+car.idx)} >{car.modelName}</span>
                            <h5 class="title">{carImage2}</h5>
                            {/* <span><img height="200" src={carImage2=Img(car.carNumber)} alt='이미지'/></span> */}
                            <div id="con3"></div>
                        </div>
                    )
                    })  
                : null
            }
        </div>
    );
    // return (
    //     <div>
    //         {
    //         props.cars != undefined ? props.cars.map((car, i)=>{
    //             return(
    //                 <p key={i}>{car.idx}, {car.owner}</p>
    //             )
    //             })  
    //         : null
    //         }
    //     </div>
    // );
    // const [arr, setArr] = useState();

    // useEffect(() => {
    //     async function getCount() {
    //       if (props.contract) {
    //         let c = await props.contract.methods.getAllCar().call();
    //         setArr(c);
    //       }
    //     }
    
    //     getCount();
    // }, [props.contract]);

    // return (
    //     <div>
    //         {
    //         arr != undefined ? arr.map((car)=>{
    //             return(
    //                 <p>{car.carId}, {car.owner}</p>
    //             )
    //             })  
    //             : null
    //         }
    //     </div>
    // )
    // return [arr];
}

export default Rent;
