import React, { useState, useEffect } from 'react';
import { ShyftSdk, Network } from '@shyft-to/js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListAll from "./ListAll";

// function App() {
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const shyft = new ShyftSdk({ apiKey: 'm6K49DCC-ibT6BUA', network: Network.Devnet });
//       (async () => {
//         const balance = await shyft.wallet.getBalance({ wallet: 'CBjikU7vs35pUMJAfx4nDdc8N8tn3SJ71u1YvWwcboj9' });
//         console.log(balance);
//         setBalance(balance);
// })();
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Shyft SDK React Example</h1>
//         <div>
//           <p>Số dư ví là :{balance}</p>
//         </div>
//       </header>
//     </div>
//   );
// }
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListAll />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;