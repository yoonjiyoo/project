import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import CarSharingContract from "../contracts/CarSharing.json";

const useWeb3 = () => {
  const [account, setAccount] = useState();
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();
  
  const getRequestAccount = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  useEffect(() => {
    (async () => {
      try {
        const account = await getRequestAccount();
        const web3 = new Web3(window.ethereum);
        // await window.ethereum.enable();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CarSharingContract.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          CarSharingContract.abi,
          deployedNetwork.address
        );

        setAccount(account);
        setWeb3(web3);
        setContract(contractInstance);

        } catch (e) {
            console.log(e);
        }
    })();
  }, []);
  return [web3, account, contract];
};

export default useWeb3;

// import React, { useEffect, useState } from "react";
// import Web3 from "web3/dist/web3.min.js";

// const useWeb3 = () => {
//   const [account, setAccount] = useState();
//   const [web3, setWeb3] = useState();
  
//   const getRequestAccount = async () => {
//     const [account] = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     return account;
//   };

//   useEffect(() => {
//     (async () => {
//       const account = await getRequestAccount();
//       const web3 = new Web3(window.ethereum);
//       setAccount(account);
//       setWeb3(web3);
//     })();
//   }, []);
//   return [web3, account];
// };

// export default useWeb3;