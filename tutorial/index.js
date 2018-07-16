//index.js

//Import the Web3 library at the top of your file
const Web3 = require("web3");

//Built-in dependency for file streaming
const fs = require("fs");
//Our solidity compiler
const solc = require("solc");

//Read the file...
const input = fs.readFileSync("HelloWorld.sol");
//...and compile it
const output = solc.compile(input.toString(),1);

//Log the result
//console.log(output);

//Set up a provider
const provider = new Web3.providers.HttpProvider("http://localhost:8545");

//Connect to the network and save it as "web3"
const web3 = new Web3(provider);


//get the compiled contract's interface and bytecode
const {interface,bytecode} = output.contract["HelloWorld"];

//Convert the interface into JSON
const abi = JSON.parse(interface);

//Initialize a new contract object:
const contract = new web3.eth.Contract(abi);

const deployAndRunContract = async () => {
  const addresses = await web3.eth.getAccounts();
  const gasPrice = await web3.eth.getGasPrice();

  try {
    const contractInstance = await contract.deploy({
      data: bytecode
    }).send({
      from: addresses[0],
      gas: 1000000,
      gasPrice,
    });

    console.log("Deployed at", contractInstance.options.address);

    const myName = await contractInstance.methods.getMyName().call();
    console.log("Result from blockchain:", myName);

  } catch (err) {
    console.log("Failed to deploy", err);
  }
}
