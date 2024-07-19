import { useEffect, useState } from "react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Link } from "react-router-dom";
import { ShyftSdk, Network } from "@shyft-to/js";

const ListAll = () => {
  const [walletAddress, setwalletAddress] = useState(null);
  const [data, setData] = useState(null);
  const [netWrk, setNetWork] = useState("devnet");
  const xAPIKey = "m6K49DCC-ibT6BUA"; //Your X-API-KEY here

  //code for connecting wallet
  const solanaConnect = async () => {
    const { solana } = window;
    if (!solana) {
      alert("Please Install Solana");
    }

    try {
      const network = "devnet";
      const phantom = new PhantomWalletAdapter();
      await phantom.connect();
      const rpcUrl = clusterApiUrl(network);
      const connection = new Connection(rpcUrl, "confirmed");
      const wallet = {
        address: phantom.publicKey.toString(),
      };

      if (wallet.address) {
        //we will get the wallet address here, we can assign it to a state variable
        setwalletAddress(wallet.address);
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(wallet.address),
          "confirmed"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const shyft = new ShyftSdk({
      apiKey: xAPIKey,
      network: Network.Devnet,
    });

    const fetchData = async () => {
      const token = await shyft.wallet.getAllTokenBalance({
        wallet: walletAddress,
      });
      setData(token);
    };

    if (walletAddress) {
      fetchData();
    }
  }, [walletAddress]);

  return (
    <div>
      <div className="container py-3">
        <div className="card border border-primary p-5">
          <h2 className="display-4 text-center">
            Liệt kê tất cả các mã thông báo có thể thay thế của bạn bằng API Shyft
          </h2>
          {!walletAddress && (
            <div>
              <h4 className="text-center py-3 text-primary">
                Kết nối Ví của bạn để bắt đầu
              </h4>
              <div className="text-center pt-3">
                <button
                  className="btn btn-primary px-4 py-2"
                  onClick={solanaConnect}
                >
                  Kết nối ví
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="py-3">
          <div className="w-25 mx-auto">
            <select
              name="network"
              className="form-control form-select"
              id=""
              onChange={(e) => setNetWork(e.target.value)}
            >
              <option value="devnet">Devnet</option>
              <option value="testnet">Testnet</option>
              <option value="mainnet-beta">Mainnet Beta</option>
            </select>
          </div>
          <div className="card mt-3 py-3 border-0">
            <table className="table w-75 mx-auto text-center">
              <thead>
                <tr>
                  <td className="w-25 border-2">Hình ảnh mã thông báo</td>
                  <td className="w-50 border-2">
                    Chi tiết mã thông báo</td>
                  <td className="w-25 border-2">Cân bằng</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((tokn) => (
                    <tr key={tokn.address}>
                      <td className="w-25 border-2">
                        <img
                          src={tokn.info.image}
                          className="img-fluid w-75 mx-auto"
                          alt=""
                        />
                      </td>
                      <td className="w-50 border-2">
                        <Link
                          to={`/view-details?token_address=${tokn.address}&network=${netWrk}`}
                          target="_blank"
                        >
                          <h4>{tokn.info.name}</h4>
                          {tokn.address}
                        </Link>
                      </td>
                      <td className="w-25 border-2">
                        {tokn.balance} {tokn.info.symbol}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAll;