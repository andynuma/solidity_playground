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
