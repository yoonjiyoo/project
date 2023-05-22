import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.js";

function Rent(props) {
    const [filteredCars, setFilteredCars] = useState();
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

      return (
        <div className="Day-1488-Job-List-UI-Design">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <button key={index} onClick={() => setFilteredCars(props.cars.filter(
                    x => (x.dayOfWeek & (1 << (6-index))) > 0
                ))}>{day}</button>
            ))}
            {
                filteredCars != undefined ? filteredCars.map((car, i)=>{
                    return(
                        <div className="Rectangle-2" key={i}>
                            <span>{car.dayOfWeek}</span>
                            <span onClick={()=>navigate("/search/"+car.idx)} >{car.modelName}</span>
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
