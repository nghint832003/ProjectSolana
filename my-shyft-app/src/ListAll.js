import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const ListAll = () => {
    const xKey = "YPguVA8niasnf_7l";
    const [wallID, setWallID] = useState("");
    const [network, setNetwork] = useState("devnet");
    const [connStatus, setConnStatus] = useState(false);
    const navigate = useNavigate();

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
                sessionStorage.setItem('public_key', wallet.address); // Save to session storage
                const accountInfo = await connection.getAccountInfo(new PublicKey(wallet.address), "confirmed");
                console.log(accountInfo);
                setConnStatus(true);
                navigate('/exam'); // Chuyển hướng sang /exam sau khi kết nối thành công
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="grd-back">
            <div className="container-lg">
                {!connStatus && (
                    <div className="card border border-primary rounded py-3 px-5 w-50 mx-auto">
                        <div className="card-body text-center">
                            <h2 className="card-title p-2">Connect Your Wallet</h2>
                            <button className="btn btn-primary mt-5 px-3" onClick={solanaConnect}>Connect Phantom Wallet</button>
                        </div>
                    </div>
                )}
                {connStatus && (
                    <div className="w-50 border border-primary rounded-3 mx-auto">
                        <div className="form-container p-3">
                            <form>
                                <div className="row d-flex justify-content-center">
                                    <div className="col-12 p-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Wallet Id"
                                            value={wallID}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListAll;
