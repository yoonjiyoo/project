import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CarSharingContract from "../contracts/CarSharing.json";

function App() {
  const [count, setCount] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // Web3.js 인스턴스 생성 및 스마트 계약 인스턴스 생성
  useEffect(() => {
    async function init() {
      // MetaMask와 같은 웹3 프로바이더가 설치되어 있는지 확인
      if (window.ethereum) {
        try {
          // MetaMask를 사용하여 Web3.js 인스턴스 생성
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();

          // 스마트 계약 인스턴스 생성
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = CarSharingContract.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(
            CarSharingContract.abi,
            deployedNetwork.address
          );

          setWeb3(web3Instance);
          setContract(contractInstance);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Please install MetaMask!");
      }
    }

    init();
  }, []);

  // 카운트 값 읽기
  useEffect(() => {
    async function getCount() {
      if (contract) {
        const result = await contract.methods.getCount().call();
        setCount(parseInt(result));

        var idx;
        for (idx = 0; idx < result; idx++) {
            const c = await contract.methods.getCar(idx).call();
            console.log(`carId: ${c[0]}, owner: ${c[1]}`);
        }
      }
    }

    getCount();
  }, [contract]);

  // 카운트 값을 렌더링하는 함수
  function renderCount() {
    if (web3 && contract) {
      return <p>Count: {count}</p>;
    } else {
      return <p>Loading...</p>;
    }
  }

  // 카운트를 증가시키는 함수
  async function handleIncrement() {
    if (web3 && contract) {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.incrementCounter().send({ from: accounts[0] });
      } catch (error) {
        console.error(error);
      }
    }
  }

  // 카운트를 감소시키는 함수
  async function handleDecrement() {
    if (web3 && contract) {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.decrementCounter().send({ from: accounts[0] });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      {renderCount()}
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

export default App;