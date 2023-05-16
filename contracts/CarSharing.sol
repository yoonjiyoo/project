// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CarSharing {
    int private count = 0;
    
    struct Car {
        int carId;
        address owner;
    }
    int private carCnt = 0;

    mapping(int => Car) public cars;

    // function addCar() public payable {
    //     cars[carCnt] = Car({
    //         carId: carCnt,
    //         owner: msg.sender
    //     });
    //     carCnt += 1;
    // }

    function incrementCounter() public {
        cars[carCnt] = Car({
            carId: carCnt,
            owner: msg.sender
        });
        carCnt += 1;
    }

    function decrementCounter() public {
        delete cars[carCnt - 1];
        carCnt -= 1;
    }

    function getCount() public view returns (int) {
        return carCnt;
    }

    function getCar(int _i) public view returns (Car memory) {
        return cars[_i];
    }
}