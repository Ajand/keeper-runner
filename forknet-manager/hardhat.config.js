const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");

task("addFund", "Add some fund to an account")
  .addParam("account", "The account address")
  .addParam("amount", "Amount of needed fund in ether")
  .setAction(async ({ account, amount }) => {
    const signers = await ethers.getSigners();
    const sender = signers[0];

    const balance = await ethers.provider.getBalance(account);

    const tx = {
      from: sender.address,
      to: account,
      value: ethers.utils.parseEther(amount),
    };

    await sender.sendTransaction(tx);

    console.log(
      `account ${account} balance after funding ${amount} is: ${await ethers.provider.getBalance(
        account
      )}`
    );
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
};
