// src/ListAll.js
import { useState } from "react";
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const ListAll = () => {

    const xKey = "YPguVA8niasnf_7l";
    const [wallID, setWallID] = useState("");
    const [network, setNetwork] = useState("devnet");
    const [isLoaded, setLoaded] = useState(false);
    const [dataFetched, setDataFetched] = useState();
    const [connStatus, setConnStatus] = useState(false);

    const solanaConnect = async () => {
        console.log('clicked solana connect');
        const { solana } = window;
        if (!solana) {
            alert("Please Install Solana");
            return;
        }

        try {
            const phantom = new PhantomWalletAdapter();
            await phantom.connect();
            const rpcUrl = clusterApiUrl(network);
            const connection = new Connection(rpcUrl, "confirmed");
            const wallet = {
                address: phantom.publicKey.toString(),
            };

            if (wallet.address) {
                console.log(wallet.address);
                setWallID(wallet.address);
                const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address), "confirmed");
                console.log(accountInfo);
                setConnStatus(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchNFTs = (e) => {
        e.preventDefault();
        let nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${wallID}`;
        axios({
            url: nftUrl,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
        })
            .then((res) => {
                console.log(res.data);
                setDataFetched(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.warn(err);
            });
    };

    return (
        <div className="grd-back">
        <div className="container-lg">
          <div className="py-4 text-center">
            <h1>List All Your NFTs</h1>
            <p>
              This is a sample project which will list all your NFTs associated
              with your wallet
            </p>
          </div>
        </div>
      
        <div className="container-lg">
          {!connStatus && (<div className="card border border-primary rounded py-3 px-5 w-50 mx-auto">
            <div className="card-body text-center">
              <h2 className="card-title p-2">Connect Your Wallet</h2>
              <p className="card-text p-1">You need to connect your wallet to deploy and interact with your contracts.</p>
              <button className="btn btn-primary mt-5 px-3" onClick={solanaConnect}>Connect Phantom Wallet</button>
              {/* <select className="form-select" onChange={(e) => {
                console.log(e.target.value);
                (e.target.value === 'mtmsk') ? mtmskConnect() : solanaConnect();
              }}>
                <option value="none">Connect</option>
                <option value="phntm">Phantom</option>
              </select> */}
            </div>
          </div>)}
          {connStatus && (<div className="w-50 border border-primary rounded-3 mx-auto">
            <div className="form-container p-3">
              <form>
                <div className="row d-flex justify-content-center">
      
                  <div className="col-12 p-2">
                    <select
                      name="network"
                      className="form-control form-select"
                      id=""
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="devnet">Devnet</option>
                      <option value="testnet">Testnet</option>
                      <option value="mainnet-beta">Mainnet Beta</option>
                    </select>
                  </div>
                  <div className="col-12 p-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Wallet Id"
                      value={wallID}
                    />
                  </div>
      
                </div>
                <div className="text-center p-3">
                  <button
                    className="btn btn-primary"
                    onClick={fetchNFTs}
                  >
                    Get
                  </button>
                </div>
              </form>
            </div>
          </div>)}
        </div>
      
        <div className="container-lg">
          <div className="cards-section py-4">
            <div className="row">
              {isLoaded &&
                dataFetched.result.map((item) => (
                  <div className="col-xs-12 col-sm-3 p-3" key={item.mint}>
                    <div className="card nft-card">
                      <div className="card-body">
                        <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`} target="_blank" rel="noreferrer">
                          <img className="img-fluid" src={item.image_uri} alt="img" />
                        </a>
                        <a href={`/get-details?token_address=${item.mint}&apiKey=${xKey}`} target="_blank" rel="noreferrer">
                          <h5>{item.name}</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
      
            </div>
          </div>
        </div>
      </div>
    );
};

export default ListAll;
