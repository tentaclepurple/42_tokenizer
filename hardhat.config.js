require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Asegúrate de que tu clave privada esté en las variables de entorno
    }
  }
};
