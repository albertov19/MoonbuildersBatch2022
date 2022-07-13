require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-ethers');

const { privateKey } = require('./secrets.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',

  networks: {
    // 4. Add the Moonbase Alpha network specification
    dev: {
      url: 'http://127.0.0.1:9933',
      chainId: 1281, // 0x507 in hex,
      accounts: [privateKey],
    },
  },
};
