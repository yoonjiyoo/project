import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Return(props) { // 차량 반납 - 반납용 페이지를 따로 만들거라면 상관없는데, 마이페이지 안에서 반납 이루어지게 할거라면 수정해서 components로 넘길 예정 
    const [account, setAccount] = useState();
    const [mileage, setMileage] = useState();
    const navigate = useNavigate();

    const getRequestAccount = async () => {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return account;
    };

    const dateDiff = (d1, d2) => {
        const oneDay = 24 * 60 * 60 * 1000; // 1일을 밀리초로 표현
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diff = Math.round(Math.abs((date1 - date2) / oneDay));
        return diff;
    }

    const handleReturn = async () => {
        try {
            setAccount(await getRequestAccount());
            
            // 1. 반납할 차량이 있는지
            // 2. 반납 기한을 지켰는지 (당일 대여, 당일 반납)
            const [carNumber, returnDueDate] = await props.contract.methods.getResInfo(account).call();
            if (carNumber === "") {
                console.log("반납할 차량이 없음"); // 확인을 위해 임시로 구성, 실제 반납할 차량이 없다면 버튼 비활성화, 또는 안내 메세지 화면에 노출 
            } else {
                const cars = await props.contract.methods.getAllCars().call();
                const selectedCar = cars.find(x => x.carNumber == carNumber);
                const today = new Date().toISOString().split('T')[0];

                const totalDrivingFee = selectedCar.drivingFee * mileage;
                let lateFee = 0;
                if (today > returnDueDate) { // 하루 연체될 때마다 대여료의 1% 부과 
                    lateFee = selectedCar.rentalFee * 0.01 * (dateDiff(returnDueDate, today));
                } 

                const txHash = await props.web3.eth.sendTransaction({
                    from: account,
                    to: selectedCar.owner,
                    value: props.web3.utils.toWei(props.web3.utils.BN(totalDrivingFee + lateFee), "ether")
                });
                await props.contract.methods.returnReservation(account).send({ from: account });
                // console.log("예약현황" + await props.contract.methods.getResInfo(account).call());
                // console.log("예약리스트" + await props.contract.methods.getReservedDates(carNumber).call());
                navigate("/review/"+carNumber); // 주소 재지정 필요
            }
        } catch (e) {
            console.log(e);
        }
      };

    return (
        <div>
            <p>
                <input placeholder="주행거리" onChange={ (e)=>{ setMileage(e.target.value)}}></input>
            </p>
            <button onClick={handleReturn}>반납하기</button>
        </div>
    );
}

export default Return;