import React, { useState } from 'react';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createMint, createAssociatedTokenAccount, mintTo, createMetadata, createMasterEdition } from '@metaplex-foundation/js';
import bs58 from 'bs58';

// Khởi tạo kết nối với Solana
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Ví Phantom của admin
const adminWalletAddress = '2uy7HrFHwPseLxmhiQD2jfEruHciBSx3xE7k4moZ83xR'; // Địa chỉ ví Phantom của admin

// Khóa bí mật (private key) của ví admin dưới dạng base58
const adminSecretKey = 'your-admin-secret-key-here'; // Thay thế bằng khóa bí mật thực sự

// Chuyển đổi chuỗi base58 thành Uint8Array
const secretKey = Uint8Array.from(bs58.decode(adminSecretKey));

// Tạo Keypair từ khóa bí mật
const payer = Keypair.fromSecretKey(secretKey);

const CreateCertificateNFT = ({ userPublicKey, score, name, imageUrl }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateNFT = async () => {
        setLoading(true);
        setError(null);

        try {
            // Tạo Mint mới
            const mint = await createMint(connection, payer);

            // Tạo Token Account cho admin
            const tokenAccount = await createAssociatedTokenAccount(connection, payer, mint, new PublicKey(adminWalletAddress));

            // Mint Token vào Token Account
            await mintTo(connection, payer, mint, tokenAccount, payer.publicKey, 1);

            // Metadata cho NFT
            const metadataData = {
                name: `Certificate for ${name}`,
                symbol: '',
                uri: '', // Để trống vì không sử dụng URI
                description: "NFT chứng chỉ",
                image: imageUrl || "https://img.giaoduc.net.vn/w1000/Uploaded/2024/bpcgtqvp/2019_06_07/chung_chi_ngoai_ngu.jpg",
                sellerFeeBasisPoints: 500,
                creators: null
            };

            // Tạo Metadata cho NFT
            const metadataTx = await createMetadata(
                connection,
                payer,
                mint,
                new PublicKey(adminWalletAddress),
                metadataData
            );

            // Tạo Master Edition cho NFT
            await createMasterEdition(
                connection,
                payer,
                mint,
                new PublicKey(adminWalletAddress)
            );

            alert('NFT certificate created successfully and stored in the admin Phantom Wallet.');
        } catch (error) {
            setError('Error creating NFT: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Certificate NFT</h2>
            <button onClick={handleCreateNFT} disabled={loading}>
                {loading ? 'Creating NFT...' : 'Create NFT'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateCertificateNFT;
