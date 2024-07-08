// src/components/CreateNFT.js

import React, { useState } from 'react';
import axios from 'axios';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

const CreateNFT = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [connStatus, setConnStatus] = useState(false);
    const [uri, setUri] = useState('');
    const network = WalletAdapterNetwork.Devnet; // Hoặc WalletAdapterNetwork.Testnet hoặc WalletAdapterNetwork.Mainnet

    const connectWallet = async () => {
        const { solana } = window;
        if (solana && solana.isPhantom) {
            try {
                const wallet = new PhantomWalletAdapter();
                await wallet.connect();
                setWalletAddress(wallet.publicKey.toString());
                setConnStatus(true);
            } catch (err) {
                console.error("Wallet connection error: ", err);
            }
        } else {
            alert("Please install Phantom Wallet");
        }
    };

    const createNFT = async () => {
        const connection = new Connection(clusterApiUrl(network), 'confirmed');
        const wallet = new PhantomWalletAdapter();
        await wallet.connect();

        try {
            // Tạo metadata cho NFT bằng API Shyft
            const metadata = {
                creator: wallet.publicKey.toString(),
                image: 'https://nftstorage.link/ipfs/bafkreiajrjd7xozubfr7qk6xdktlo3k66jg6jkeamgjugd2p3w5w2pifve',
                name: 'Nirvana',
                symbol: 'NVN',
                description: 'This is a test NFT',
                attributes: [
                    { trait_type: 'anger', value: 0 },
                    { trait_type: 'calmness', value: 100 },
                ],
                sellerFeeBasisPoints: 500,
            };

            const response = await axios.post('https://api.shyft.to/sol/v1/nft/create', metadata, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '<YOUR_API_KEY>' // Thay thế <YOUR_API_KEY> bằng API key của bạn
                }
            });

            const uri = response.data.uri;
            setUri(uri);
            console.log(uri);

            // Tạo NFT trên Solana với metadata
            const nftResponse = await axios.post('https://api.shyft.to/sol/v1/nft/mint', {
                wallet: wallet.publicKey.toString(),
                connection: connection,
                uri: uri
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '<YOUR_API_KEY>'
                }
            });

            console.log('NFT Created: ', nftResponse.data);
        } catch (err) {
            console.error('Error creating NFT: ', err);
        }
    };

    return (
        <div>
            <h1>Create NFT using Phantom Wallet</h1>
            {!connStatus && (
                <button onClick={connectWallet}>Connect Phantom Wallet</button>
            )}
            {connStatus && (
                <div>
                    <p>Connected Wallet: {walletAddress}</p>
                    <button onClick={createNFT}>Create NFT</button>
                    {uri && (
                        <div>
                            <p>Metadata URI: {uri}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateNFT;
