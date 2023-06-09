// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract CarSharing {
    
    struct Car {
        uint8 idx;
        address owner;
        string carNumber;
        string modelName;

        uint8 dayOfWeek;
        string location;
        uint32 rentalFee;
        uint32 drivingFee;
        bool isRentable;
    }
    uint8 private carCnt = 0;
    mapping(uint8 => Car) public cars;

    struct RenInfo {
        uint256 idx;
        string modelName;
        address addr;
        string carNumber;
        string rentalDate;
        string returnDate;
        uint32 totalFee;
        // uint32 rentalFee;
        // uint32 drivingFee;
        // string txHash1;
        // string txHash2;
    }
    mapping(address => RenInfo[]) public accountLend; 
    mapping(address => RenInfo[]) public accountBorrow; 
    mapping(string => string[]) private carNumberRen;

    function addCar(string memory _carNumber, string memory _modelName, uint8 _dayOfWeek, string memory _location, uint32 _rentalFee, uint32 _drivingFee) public {
        cars[carCnt] = Car({
            idx: carCnt,
            owner: msg.sender,
            carNumber: _carNumber,
            modelName: _modelName,
            dayOfWeek: _dayOfWeek,
            location: _location,
            rentalFee: _rentalFee,
            drivingFee: _drivingFee,
            isRentable: true
        });
        carCnt += 1;
    }
    
    function modifyCar(uint8 _idx) public {
    // function modifyCar(uint8 _idx, uint8 _dayOfWeek, string memory _location, uint32 _rentalFee, uint32 _drivingFee, bool _isRentable) public {
        // cars[_idx].dayOfWeek = _dayOfWeek;
        // cars[_idx].location = _location;
        // cars[_idx].rentalFee = _rentalFee;
        // cars[_idx].drivingFee = _drivingFee;
        cars[_idx].isRentable = !cars[_idx].isRentable;
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

    function startRental(uint8 _idx, string memory _rentalDate) public {
        Car memory c = getCar(_idx);
        // borrow
        uint256 length = accountBorrow[msg.sender].length;
        accountBorrow[msg.sender].push(RenInfo(length, c.modelName, c.owner, c.carNumber, _rentalDate, "", c.rentalFee));
        
        // lend
        length = accountLend[c.owner].length;
        accountLend[c.owner].push(RenInfo(length, c.modelName, msg.sender, c.carNumber, _rentalDate, "", c.rentalFee));

        carNumberRen[c.carNumber].push(_rentalDate);
    }

    function endRental(address _sender, string memory _returnDate, uint32 _drivingFee) public {
        uint256 length = accountBorrow[_sender].length;
        RenInfo memory ren = accountBorrow[_sender][length-1];

        uint256 lendIdx = getLendIdx(ren.addr, ren.carNumber, ren.rentalDate);
        accountBorrow[_sender][length-1].returnDate = _returnDate;
        accountBorrow[_sender][length-1].totalFee += _drivingFee;
        accountLend[ren.addr][lendIdx].returnDate = _returnDate;
        accountLend[ren.addr][lendIdx].totalFee += _drivingFee;
    }

    function getAllRenDates(string memory _carNumber) public view returns (string[] memory) {
        return carNumberRen[_carNumber];
    }

    function getAccountBorrowLength(address _addr) public view returns(uint256) {
        return accountBorrow[_addr].length;
    }

    function getBorrow(address _addr) public view returns(RenInfo memory) { 
        uint256 length = accountBorrow[_addr].length;
        return accountBorrow[_addr][length-1];
    }

    function getLendIdx(address _addr, string memory _carNumber, string memory _rentalDate) public view returns(uint256) {
        for (uint256 i = 0; i < accountLend[_addr].length; i++) {
            if (bytes(accountLend[_addr][i].returnDate).length != 0) continue; // 완료된 거래 
            if (keccak256(bytes(accountLend[_addr][i].carNumber)) != keccak256(bytes(_carNumber))) continue;
            if (keccak256(bytes(accountLend[_addr][i].rentalDate)) != keccak256(bytes(_rentalDate))) continue;
            return i;
        }
        revert("No matching lend index found");
    }

    function getAllBorrow(address _addr) public view returns(RenInfo[] memory) { 
        return accountBorrow[_addr];
    }

    function getAllLend(address _addr) public view returns(RenInfo[] memory) { 
        return accountLend[_addr];
    }

    function cancelRental(address _sender) public {
        RenInfo memory ren = getBorrow(_sender);
        uint256 length = carNumberRen[ren.carNumber].length;
        for (uint256 i = 0; i < length; i++) {
            if (keccak256(bytes(carNumberRen[ren.carNumber][i])) == keccak256(bytes(ren.rentalDate))) {
                carNumberRen[ren.carNumber][i] = carNumberRen[ren.carNumber][length-1];
                delete carNumberRen[ren.carNumber][length-1];
                break;
            }
        }

        length = accountBorrow[_sender].length;
        uint256 lendIdx = getLendIdx(ren.addr, ren.carNumber, ren.rentalDate);
        delete accountBorrow[_sender][length-1];
        delete accountLend[ren.addr][lendIdx];
    }
}
