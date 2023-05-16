import React from "react";
import "./App.css";
import CarSharing from "./components/CarSharing";
import useWeb3 from "./hooks/useWeb3";
function App() {
  const [web3, account] = useWeb3();
  if (!account) return <h1>메타마스크를 연결해주세요</h1>;
  return (
    <div className="App">
      <h2>사과 앱</h2>
      <CarSharing web3={web3} account={account} />
    </div>
  );
}

export default App;