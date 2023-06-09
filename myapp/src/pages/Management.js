import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Management(props){
    const [filteredCars, setFilteredCars] = useState();
    const [account, setAccount] = useState();
    const [rentedCar, setRentedCar] = useState();
    const [b, setB] = useState([]);
    const [l, setL] = useState();

    const navigate = useNavigate();

    const getRequestAccount = async () => {
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return account;
    };

    useEffect(() => {
        (async () => {
            try {
                
                const acc = await getRequestAccount();
                setAccount(acc);
                const borlen = await props.contract.methods.getAccountBorrowLength(acc).call();
                if (borlen == 0) { // 대여 횟수 0회
                    setRentedCar(undefined);
                } else {
                    const bor = await props.contract.methods.getBorrow(acc).call();
                    if (bor.returnDate != "" || bor.addr == "0x0000000000000000000000000000000000000000") { // 반납 완료
                        setRentedCar(undefined);
                    } else {
                        setRentedCar(bor);
                    }
                }
                

                const cars = await props.contract.methods.getAllCars().call();
                props.setCars(cars);
                setFilteredCars(cars.filter(
                    x => (x.owner.toUpperCase() == account.toUpperCase())
                ));

                const b = await props.contract.methods.getAllBorrow(acc).call();
                setB(b);
                const l = await props.contract.methods.getAllLend(acc).call();
                setL(l);

                // console.log(b);
                // // for (const x of b) {
                // //     console.log('테스트' + x.date);
                // // }

                // // console.log(filteredCars[0].isRentable);
                
            } catch(e) {
                console.log(e);
            }
        })();
    })

    function convertWeiToEth(wei) {
        const eth = wei / 10**18;
        return eth;
    }

    function maskCarNumber(carNumber) {
        const maskedNumber = carNumber.substring(0, carNumber.length - 3) + "***";
        return maskedNumber;
      }
      

    // async function fetchTransactions() {
    //         const fetchedTransactions = [];

    //         for (const car of b) {
    //             const t1 = await props.web3.eth.getTransaction(car.txHash1);

    //             fetchedTransactions.push({
    //                 car,
    //                 t1

    //             });
    //         }

    //         setTransactions(fetchedTransactions)
    //     }
    // fetchTransactions();
    
    // 0xceaa01fa9c62ab0677b77fcfc3f72b599ba2fed27e37a7bc04d601b90f1bba56
    // 누가, 누구에게, 얼마를, // 언제, // 무슨 차량 
    // 어떤 차량을, 누가, 언제 --> 

    //function getTransactionTimestamp(transactionHash) {
    //    //const provider = ethers.getDefaultProvider(); // Ethereum 노드에 연결하는 provider 객체 생성
    //    const transaction = props.web3.eth.getTransaction(transactionHash); // 트랜잭션 조회
    //    const block = props.web3.eth.getBlock(transaction.blockHash); // 트랜잭션이 포함된 블록 조회
     ///   const timestamp = block.timestamp; // 블록의 타임스탬프 가져오기
     //   console.log(timestamp); // JavaScript Date 객체로 변환 (UTC 기준)
    //  }

    return (
        <div>
            <p>{account}님</p>
            <hr></hr>
            <p>현재 등록된 차량</p>
            {
                filteredCars?.length > 0 ? filteredCars.map((car, i)=>{
                    return(
                        <div key={i}>
                            <span>{car.modelName}</span>
                            <span>{car.carNumber}</span>
                            <span>{car.owner}</span>
                            <span>{car.idx}</span><br></br>
                            <span>활성화: {car.isRentable}</span>
                            <button onClick={
                                ()=>{
                                    props.contract.methods.modifyCar(car.idx).send({ from: account })
                                    .then(() => {
                                        console.log(car.isRentable);
                                        // 성공적으로 처리된 경우 실행할 로직
                                      })
                                    .catch((error) => {
                                        console.error('거래 취소', error);
                                        // 에러 처리 로직 추가
                                    })
                                }
                            }>차량 비활성화</button>
                        </div>
                    );
                    })
                : <p>현재 등록된 차량이 없습니다.</p>
            }

            <hr></hr>
            <p>현재 빌리고 있는 차량</p>
            {
                rentedCar == undefined ? <p>현재 대여 중인 차량이 없습니다.</p>
                : 
                <div>
                    <p>{rentedCar}</p>
                    <button onClick={
                        ()=>{
                            navigate("/return");
                    }}>반납하기</button>

                    <button onClick={
                        async()=>{
                            const txHash = await props.web3.eth.sendTransaction({
                                from: account,
                                to: rentedCar.addr,
                                value: props.web3.utils.toWei(props.web3.utils.BN(rentedCar.totalFee), "ether")
                            }); 
                            props.contract.methods.cancelRental(account).send({ from: account });

                    }}>취소하기</button>
                </div>
            }

            <hr></hr>
            <p>빌린 내역</p>
            { 
                b?.length > 0 ? b.map((car, i)=>{
                    if (car.addr === "0x0000000000000000000000000000000000000000") {
                        return null; // 건너뛰기
                      }
                    return(
                        <div style={{border: "1px solid black"}}>
                            <span>{car.modelName}</span><br></br>
                            <span>대여날짜: {car.rentalDate}</span><br></br>
                            <span>반납날짜: {car.returnDate}</span><br></br>
                            <span>차량주: {car.addr}</span><br></br>
                            <span>차량번호: {maskCarNumber(car.carNumber)}</span><br></br>
                            <span>금액: {car.totalFee}</span><br></br>
                        </div>
                    );
                })
                : <p>내역 없음</p>
            }


            <hr></hr>
            <p>빌려준 내역</p>
            {
                l?.length > 0 ? l.map((car, i)=>{
                    if (car.addr === "0x0000000000000000000000000000000000000000") {
                        return null; // 건너뛰기
                      }
                      return(
                        <div style={{border: "1px solid black"}}>
                            <span>대여날짜: {car.rentalDate}</span><br></br>
                            <span>반납날짜: {car.returnDate}</span><br></br>
                            <span>차량번호: {car.carNumber} | {car.modelName}</span><br></br>
                            <span>차용인: {car.addr}</span><br></br>
                            <span>금액: {car.totalFee}</span><br></br>
                        </div>
                    );
                })
                : <p>내역 없음</p>
            }

            {/* <button onClick={()=>{
                props.web3.eth.getTransaction('0xceaa01fa9c62ab0677b77fcfc3f72b599ba2fed27e37a7bc04d601b90f1bba56')
                .then(

                    transaction => {
                        const blockNumber = transaction.blockNumber; // 트랜잭션이 포함된 블록 번호
                        return props.web3.eth.getBlock(blockNumber); // 블록 정보 조회
                    })
                    .then(block => {
                        const timestamp = block.timestamp; // 블록의 타임스탬프
                        console.log('Block timestamp:', new Date(timestamp * 1000));
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
                //</div>props.web3.eth.getTransaction('0xceaa01fa9c62ab0677b77fcfc3f72b599ba2fed27e37a7bc04d601b90f1bba56')
                //.then(x=>console.log(x));
            
            }>확인</button> */}

        </div>
    );
}

export default Management;
