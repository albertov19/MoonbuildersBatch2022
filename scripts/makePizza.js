const hre = require('hardhat');
const addresses = require('../addresses.json');

async function main() {
  // Load Contracts
  const batchContract = await hre.ethers.getContractAt('Batch', addresses.batch);
  const pizzaToken = await hre.ethers.getContractAt('PizzaToken', addresses.pizzaToken);
  const makePizza = await hre.ethers.getContractAt('MakePizza', addresses.makePizza);

  // Print Pizza Counts
  console.log(`There are currently ${await makePizza.pizzaCounter()} pizzas!`);

  // Pizza Token Contract Call
  let tx = await pizzaToken.populateTransaction.approve(
    makePizza.address,
    ethers.utils.parseEther('1')
  );
  let pizzaTokenCall = tx.data;

  // Make Pizza Contract Call
  tx = await makePizza.populateTransaction.makePizza();
  let makePizzaCall = tx.data;

  // Batch Transactions
  tx = await batchContract.batchAll(
    [pizzaToken.address, makePizza.address],
    [],
    [pizzaTokenCall, makePizzaCall],
    []
  );
  await tx.wait();

  console.log(`Tx sent with hash ${tx.hash}`);

  // Print Pizza Counts
  console.log(`There are currently ${await makePizza.pizzaCounter()} pizzas!`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

0x095ea7b3000000000000000000000000f060818668c38deb0cca1b9746977d696a5a1def0000000000000000000000000000000000000000000000000de0b6b3a7640000;
0x095ea7b30000000000000000000000004867bc21a5ab7b7b8449398a654f55b18ba34dc30000000000000000000000000000000000000000000000000de0b6b3a7640000;
