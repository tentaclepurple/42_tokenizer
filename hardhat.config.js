require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');

//require('dotenv').config();

//console.log("Private Key from .env:", process.env.PRIVATE_KEY);
//console.log("Length of Private Key:", (process.env.PRIVATE_KEY || '').length);

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`0xbce74fb4ba78a597feaeeb2ceca3033dd7ffe5d5f8b5228fde993ce96844a8e8`]
      //accounts: [`0x${process.env.PRIVATE_KEY}`] // Asegúrate de que tu clave privada esté en las variables de entorno
    }
  }
};
