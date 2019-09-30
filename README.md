# A decentralized auctioning platform made on Ethereum blockchain.
# It is a Web Application which is connected to the blockchain.

# Working of the Dapp:

1. Seller creates an auction.
2. Bidders bid on the auction in the time given by the seller.
3. At the conclusion of the auction, the highest bidder's amount is paid to the seller and other amounts are refunded to the bidders.

# Steps to be followed:

1. Start ganache-cli
2. Compile the Solidity code using solc from the node command line.(Can use auctioninit.js for reference)
3. Copy the deployed address and paste it in index.js e.g contractInstance = auctionContract.at('0x3950ba410a64b8b1d227a13bfb6355251d5014b2');
4. Open index.html on a web browser

# Note:

The DAPP has been tested on linux. It has NOT been tested on Windows.
