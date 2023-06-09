import { useParams } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

function Payment(props) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCar, setSelectedCar] = useState();
    const [formattedDate, setFormattedDate] = useState();
    const [account, setAccount] = useState();

    const getRequestAccount = async () => {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return account;
    };

    useEffect(() => {
        (async () => {
            try {
                setAccount(await getRequestAccount());

            setSelectedCar(props.cars && props.cars.find((x) => x.idx === id)); 

            const selectedDate = location.state.selectedDate;
            const offset = selectedDate && selectedDate.getTimezoneOffset() * 60000; // 날짜-1 오류 해결
            const offsetDate = new Date(selectedDate.getTime() - offset);
            setFormattedDate(offsetDate.toISOString().split('T')[0]); // yyyy-mm-dd 형태로 변경
            } catch(e) {
                console.log(e);
            }
        })();
    })

    const handlePayment = async () => {
        try {
            // 길이가 0이면 대여 가능 
            // 반납이 완료되었으면 대여 가능 
            const length = await props.contract.methods.getAccountBorrowLength(account).call();

            let flag;
            if (length != 0) {
                const bor = await props.contract.methods.getBorrow(account).call();
                if (bor.returnDate == "" && bor.addr != "0x0000000000000000000000000000000000000000") flag = false;
                else flag = true;
            }
            if (length == 0 || flag) {
                const txHash = await props.web3.eth.sendTransaction({
                    from: account,
                    to: selectedCar.owner,
                    value: props.web3.utils.toWei(props.web3.utils.BN(selectedCar.rentalFee), "ether")
                }); 
                // const txHash1 = txHash.transactionHash;
                await props.contract.methods.startRental(selectedCar.idx, formattedDate).send({ from: account });
    
                navigate("/registration/success"); // 주소 재지정 필요
                console.log("대여 가능");
            } else {
                console.log("대여가 불가능함. 반납을 먼저 진행할 것");
            }
        } catch (e) {
            console.log(e);
        }
      };

    return (
        <div>
            <p>대여인 : {selectedCar?.owner.toUpperCase()}</p>
            <p>대여자 : {account?.toUpperCase()}</p>
            <p>모델명 : {selectedCar?.modelName}</p>
            <p>날짜 : {formattedDate}</p>
            <p>대여료 : {selectedCar?.rentalFee}</p>
            <p>주행료 : {selectedCar?.drivingFee}</p>
            <p>합계 : {Number(selectedCar?.rentalFee) + Number(selectedCar?.drivingFee)}</p>
            <button onClick={handlePayment}>결제하기</button>          
        </div>
    );
}

export default Payment;
