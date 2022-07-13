const fs = require('fs');
const hre = require('hardhat');

async function main() {
  // Deploy Pizza Token
  const PizzaToken = await hre.ethers.getContractFactory('PizzaToken');
  const pizzaToken = await PizzaToken.deploy();

  await pizzaToken.deployed();
  console.log('Pizza Token deployed to:', pizzaToken.address);

  // Deploy Make Pizza
  const MakePizza = await hre.ethers.getContractFactory('MakePizza');
  const makePizza = await MakePizza.deploy(pizzaToken.address);

  await makePizza.deployed();
  console.log('Make Pizza Contract deployed to:', makePizza.address);

  const addresses = {
    pizzaToken: pizzaToken.address,
    makePizza: makePizza.address,
    batch: '0x0000000000000000000000000000000000000808',
  };

  fs.writeFileSync('addresses.json', JSON.stringify(addresses));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
