import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    
      // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log("accounts =>", accounts)
      this.setState({ account: accounts[0] })
      simpleStorage.deployed().then((instance) => {
        this.simpleStorageInstance = instance
        console.log("accounts[0] =>", accounts[0])
        // Get the value from the contract to prove it worked.
        return this.simpleStorageInstance.get.call(accounts[0])
      }).then((ipfsHash) => {
        // Update state with the result.
        return this.setState({ ipfsHash })
      })
    })
  }

  captureFile(event) {
	console.log('capture file....')
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
  this.setState({ buffer: Buffer(reader.result) })
  console.log('buffer', this.state.buffer)
    }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('on submit')
  ipfs.files.add(this.state.buffer, (error, result) => {
    if(error) {
      console.error(error)
     return
        }

      console.log('result', result)
      console.log('state => ', this.state)
      console.log('state.account => ', this.state.account)

       this.simpleStorageInstance.set(result[0].hash, { from: this.state.account }).then((r) => {
        console.log('ifpsHash', result[0].hash)
      return this.setState({ ipfsHash: result[0].hash })
     })
  })
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">Upload Your Documents & Contracts on Ethereum Blockchain and IPFS</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Documents & Contracts</h1>
              <p>Yours is stored on IPFS & The Ethereum Blockchain!</p>
           <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
	      <h2>Upload Documents & Contracts</h2>
              <form onSubmit={this.onSubmit} >
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
