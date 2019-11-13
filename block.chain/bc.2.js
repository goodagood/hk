

var cryptico = require('cryptico');

// The passphrase used to repeatably generate this RSA key.
var PassPhrase = "No need to re-invent Bitcoins."; 
 
// The length of the RSA key, in bits.
var Bits = 2048; //1024; 
  
var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

//console.log(MattsRSAkey);
var p = console.log;




// copied from js blockchain tut
class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return makeBlock(new Date().getTime(), "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
//
//let jsChain = new Blockchain();
//jsChain.addBlock(makeBlock("12/25/2017", {amount: 5}));
//jsChain.addBlock(makeBlock("12/26/2017", {amount: 10}));
//
//
//console.log(JSON.stringify(jsChain, null, 4));
//console.log("Is blockchain valid? " + jsChain.checkValid());
//
