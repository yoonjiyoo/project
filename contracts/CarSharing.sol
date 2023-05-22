// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CarSharing {
    
    struct Car {
        uint8 idx;
        address owner;
        string carNumber;
        uint8 dayOfWeek;
        uint32 rentalFee;
        uint32 drivingFee;
        string modelName;
        string location;
        uint64 registrationDate;
        // string manufacturer;  
    }

    struct Reservation {
        string[] carNumberArr;
    }
    
    uint8 private carCnt = 0;

    mapping(uint8 => Car) public cars;
    // mapping(string => Reservation) private reservations; 
    mapping(string => string[]) private reservations;

    function addCar(string memory _carNumber, string memory _modelName, uint8 _dayOfWeek, string memory _location, uint32 _rentalFee, uint32 _drivingFee, uint64 _registrationDate) public {
        cars[carCnt] = Car({
            idx: carCnt,
            owner: msg.sender,
            carNumber: _carNumber,
            modelName: _modelName,
            dayOfWeek: _dayOfWeek,
            location: _location,
            rentalFee: _rentalFee,
            drivingFee: _drivingFee,
            registrationDate: _registrationDate
        });
        carCnt += 1;
    }

    function deleteCar(uint8 _idx) public {
        cars[_idx] = cars[carCnt-1];
        delete cars[carCnt-1];
        carCnt -= 1;
    }

    function getCar(uint8 _idx) public view returns (Car memory) {
        return cars[_idx];
    }

    function getAllCars() public view returns (Car[] memory) {
        Car[] memory ret = new Car[](carCnt);
        for (uint8 i = 0; i < carCnt; i++) {
            ret[i] = cars[i];
        }
        return ret;
    }

    function addReservation(string memory _carNumber, string memory _date) public {
        reservations[_carNumber].push(_date);
    }

    function getReservedDates(string memory _carNumber) public view returns (string[] memory) {
        return reservations[_carNumber];
    }

    // function isReservationAvailable(uint32 _date, string memory _carNumber) public view returns (bool){
    //     string[] memory carNumberArr = reservations[_date].carNumberArr;
    //     for (uint i = 0; i < carNumberArr.length; i++) {
    //         if (keccak256(bytes(carNumberArr[i])) == keccak256(bytes(_carNumber))) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // function getReservableCars(uint32 _date, uint8 _day) public view returns (Car[] memory) {
    //     Car[] memory ret = new Car[](carCnt);
    //     for (uint8 i = 0; i < carCnt; i++) {
    //         if (isReservationAvailable(_date, cars[i].carNumber) == false) continue;
    //         if (cars[i].dayOfWeek & (1 << (6-_day)) > 0) {
    //             ret[i] = cars[i];
    //         }
    //     }
    //     return ret;
    // }
}
// pragma solidity ^0.8.0;

// contract CarSharing {
//     int private count = 0;
    
//     struct Car {
//         uint256 carId;
//         address owner;
//         string model;
//     }
//     uint256 private carCnt = 0;

//     mapping(uint256 => Car) public cars;

//     // function addCar() public payable {
//     //     cars[carCnt] = Car({
//     //         carId: carCnt,
//     //         owner: msg.sender
//     //     });
//     //     carCnt += 1;
//     // }

//     function incrementCounter(string memory _model) public {
//         cars[carCnt] = Car({
//             carId: carCnt,
//             owner: msg.sender,
//             model: _model
//         });
//         carCnt += 1;
//     }

//     function decrementCounter() public {
//         delete cars[carCnt - 1];
//         carCnt -= 1;
//     }

//     function getCount() public view returns (uint256) {
//         return carCnt;
//     }

//     function getCar(uint256 _i) public view returns (Car memory) {
//         return cars[_i];
//     }

//     function getAllCar() public view returns (Car[] memory) {
//         Car[] memory ret = new Car[](carCnt);
//         for (uint256 i = 0; i < carCnt; i++) {
//             ret[i] = cars[i];
//         }
//         return ret;
//     }
// }