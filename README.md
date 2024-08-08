#IPFS

Store IPFS ON ETHEREUM smart contracts using solidity and have interface that lets users to log in and store data like cloud storage

Mostly, people upload NFT metadata on IPFS.
you can think IPFS as file store...

infura provides RPC for EVM networks
because if you want to write or read contract on chains, you must use RPC url

https://github.com/JeffreytheCoder/med-chain

set NODE_OPTIONS=--openssl-legacy-provider

https://github.com/kimdong5374/IPFS_Ethereum_Upload

npm i --ignore-script

run ganache-cli.

run truffle console
run truffle deploy


pls change the Migration.sol file and SimpleStorage.sol file
pragma solidity ^0.5.16;

turffle develop, not truffle console

remove build folder

add ganache network on metamask
	Ganache CLI
	http://localhost:8545
	1337
	ETH

add Sepolia network
	Sepolia Test Network
	https://rpc.sepolia.org
	11155111
	SEP
	https://sepolia.etherscan.io/


switch the network as Sepolia network
0x25580da92f4cd5d0f73c8d970656e35e1a608bc7e088a8c7b8d261b638bd8b33


https://ipfs.io/ipfs/QmVPUgpXLEvX1CrbPUY4tpzUHAcoZwC1NtuNPpk5YJutcd

https://sepolia.etherscan.io/address/0xf262710b61541f917A4535004d0DECfcD76DE67F#code

1. I wrote smart contracts using solidity.
2. I compiled and deployed it on Sepolia network using truffle.
3. I verified the contract deployed on Sepolia test network using truffle and etherscan api key.







