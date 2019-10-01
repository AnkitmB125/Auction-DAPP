fs = require('fs');
Web3 = require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
console.log("Connected to Blockchain !!");
code = fs.readFileSync("final.sol").toString();
solc = require('solc');
console.log("Compiling final.sol ...");
compiledCode = solc.compile( code );
console.log("Compiled successfully!!");
abi = JSON.parse( compiledCode.contracts[":Auctioning"].interface );
byteCode = compiledCode.contracts[':Auctioning'].bytecode ;
auctionContract =  web3.eth.contract(abi) ;
console.log("Deploying ...")
deployedContract = auctionContract.new({data: byteCode , from: web3.eth.accounts[0] , gas: 3000000 },
( e , contract )=>{
      if( contract.address )
        {
          console.log("Deployed successfully...\n\n\nDeployed Address : " + contract.address );
          console.log("Use the above deployed address in index.js ...\n\n");
        }
});
