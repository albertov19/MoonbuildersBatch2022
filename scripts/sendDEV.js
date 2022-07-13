const hre = require('hardhat');
const { batch } = require('../addresses.json');

async function main() {
  const provider = ethers.provider;

  // Alice and Bob
  const alice = {
    address: '0x4867Bc21A5Ab7b7B8449398a654f55B18bA34DC3',
    value: '2000000000000000000',
  };
  const bob = {
    address: '0x5E3D4ef50ECF1C43Af197dBFCAdfeB20B3121d3D',
    value: '1000000000000000000',
  };

  //Print Balance
  console.log(
    `Alice balance: ${ethers.utils.formatEther(await provider.getBalance(alice.address))} DEV`
  );
  console.log(
    `Bob balance: ${ethers.utils.formatEther(await provider.getBalance(bob.address))} DEV`
  );

  // Load Batch
  const batchContract = await hre.ethers.getContractAt('Batch', batch);

  // Send tokens to Alice and Bob using Batch
  const tx = await batchContract.batchAll(
    [alice.address, bob.address],
    [alice.value, bob.value],
    [],
    []
  );
  await tx.wait();

  console.log(`Tx sent with hash ${tx.hash}`);

  //Print Balance
  console.log(
    `Alice balance: ${ethers.utils.formatEther(await provider.getBalance(alice.address))} DEV`
  );
  console.log(
    `Bob balance: ${ethers.utils.formatEther(await provider.getBalance(bob.address))} DEV`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
