import React, { useState, useEffect } from 'react';
import { ShyftSdk, Network } from '@shyft-to/js';
import './App.css';

function App() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const shyft = new ShyftSdk({ apiKey: 'YPguVA8niasnf_7l', network: Network.Devnet });
      (async () => {
        const balance = await shyft.wallet.getBalance({ wallet: 'F4HQiC2Ka1rZfLJ1es6a9iChrSos8KFAAPfL8o9A3pTF' });
        console.log(balance);
        setBalance(balance);
})();
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shyft SDK React Example</h1>
        <div>
          <p>Số dư ví là :{balance}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
