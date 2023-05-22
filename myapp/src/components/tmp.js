import React, { useEffect, useState, useRef } from "react";
import AppleShopContract from "../contracts/AppleShop.json";

const AppleShop = ({ web3, account }) => {
  const [apple, setApple] = useState();
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();
  const inputRef = useRef();
  let input = useState(1);
  const toAddress  = "0x87346929bf944a29fF037b295A688d41e95c8a77";
  const [pay, setPay] =useState();


  const buy = async () => {
    await deployed.methods.buyApple().send({
      from: account,
      to: CA,
      value: web3.utils.toWei("1", "ether")
    });

    const currentAccount = await deployed.methods.getSender().send();
    console.log(currentAccount);
    console.log(account);

    const currentApple = await deployed.methods.getApple().call();
    setApple(currentApple); // 구매 후 새로운 상태값 업데이트


  };
  
  const send = async () => {
    await props.web3.eth.sendTransaction({
      from: props.account,
      to: props.cars[id].owner,
      value: web3.utils.toWei(web3.utils.BN(buy), "ether")
    });
  };

  return (
    <div>
      <div>사과 한개 가격 : 1ETH</div>
      <div>내가 가지고 있는 사과 : {apple} 개</div>
      <button onClick={buy}>구매하기</button>
      <input
        type="text" ref={inputRef}
        >
      </input>
      <button onClick={()=>{
        setPay(inputRef.current.value);}}
        >등록</button>
      <div>보낼 돈 : {pay}</div>
      <button onClick={send}
        >보내기</button>
    </div>
  );
};

export default AppleShop;