require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    holesky: {
    url: "https://holesky.drpc.org",
    accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
  }}
};
