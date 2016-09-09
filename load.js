var Web3 = require('web3');
var web3 = new Web3();
var storage = require('./storage')

web3.setProvider(new web3.providers.HttpProvider('http://54.218.108.172:8545'));

var current = web3.eth.blockNumber
var blocks = []
const transactions = []

for (let i=0 ; i <= current ; i++ ) {
  blocks.push(i)
}



storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").catch((data) => {
  storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", [])
})

setInterval(function(){
  load()
  tx()
},100)

function load(){
  const block = blocks.pop()
  web3.eth.getBlock(block, function(error, result){
    if(!error || result.transactions[0]){
      result.transactions.forEach((tx) => {
        transactions.push(tx)
      })
    }else{
      blocks.push(block)
      console.error(error);
    }
  })
}


function tx(){
  const tx = transactions.pop()
  if (!tx) return 0
  storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2").then((data) => {
    if (data.indexOf(tx) < 0 ){
      data.push(tx)
      console.log(tx)
      return storage.save("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2", data)
    }else
      return storage.get("1a0f74a2-fe2a-4bd0-9663-f762c16c31a2")
  }).then((result) => {
    
  }).catch((err) => {
    transactions.push(tx)
  })
}
