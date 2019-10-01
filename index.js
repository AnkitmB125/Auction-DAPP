toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abi = JSON.parse('[ { "constant": false, "inputs": [], "name": "withdrawRefund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "auctionId", "type": "uint256" }, { "name": "idx", "type": "uint256" } ], "name": "getBidForAuctionByIdx", "outputs": [ { "name": "bidder", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "timestamp", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" }, { "name": "idx", "type": "uint256" } ], "name": "getAuctionIdForUserAndIdx", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "auctionId", "type": "uint256" } ], "name": "getBidCountForAuction", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "auctionId", "type": "uint256" } ], "name": "activateAuction", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "auctions", "outputs": [ { "name": "seller", "type": "address" }, { "name": "contractAddress", "type": "address" }, { "name": "recordId", "type": "string" }, { "name": "title", "type": "string" }, { "name": "description", "type": "string" }, { "name": "blockNumberOfDeadline", "type": "uint256" }, { "name": "status", "type": "uint8" }, { "name": "startingPrice", "type": "uint256" }, { "name": "currentBid", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "getRefundValue", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getStatus", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAuction", "outputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "auctionsBidOnByUser", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "auctionId", "type": "uint256" } ], "name": "placeBid", "outputs": [ { "name": "success", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "addr", "type": "address" } ], "name": "getAuctionsCountForUser", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "auctionsRunByUser", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_title", "type": "string" }, { "name": "_description", "type": "string" }, { "name": "_contractAddressOfAsset", "type": "address" }, { "name": "_recordIdOfAsset", "type": "string" }, { "name": "_deadline", "type": "uint256" }, { "name": "_startingPrice", "type": "uint256" } ], "name": "createAuction", "outputs": [ { "name": "auctionId", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "x", "type": "address" } ], "name": "addrToString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "auctionId", "type": "uint256" } ], "name": "endAuction", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getAuctionCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_contractRecordConcat", "type": "string" } ], "name": "getActiveContractRecordConcat", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "title", "type": "string" }, { "indexed": false, "name": "startingPrice", "type": "uint256" } ], "name": "AuctionCreated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "id", "type": "uint256" } ], "name": "AuctionActivated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "auctionId", "type": "uint256" }, { "indexed": false, "name": "bidder", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "BidPlaced", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "auctionId", "type": "uint256" }, { "indexed": false, "name": "winningBidder", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "AuctionEndedWithWinner", "type": "event" } ]');
auctionContract = web3.eth.contract(abi);

contractInstance = auctionContract.at('0x5eb764aa39b632439573f2b62137e235d0ba1a19');
data = "" ;

function createAuction(){

	recordID = $("#nameToAuction").val();
	contractAddress = $("#contractAddress").val();
	title = $("#title").val();
	description = $("#description").val();
	startPrice = $("#startingPrice").val();
	deadline = $("#deadline").val();
    startPrice = startPrice*Math.pow(10,18);
    auctionId = contractInstance.createAuction(title, description, contractAddress, recordID, deadline, startPrice, { from: web3.eth.accounts[toAccount] , gas: 3000000 });
	updateAuction();
    alert("Auction created successfully!");
}

function updateAuction(){
	var auctionSection = document.getElementById("userAuctions");
    var endAuction = document.getElementById("endAuction");
	var res = "";
    var ser = "";
	count=contractInstance.getAuctionsCountForUser.call(web3.eth.accounts[toAccount]);
    // console.log(count);
    for(var i = 0; i < count ; i++ )
        {
            var idx = contractInstance.getAuctionIdForUserAndIdx.call(web3.eth.accounts[toAccount],i)["c"][0];
                var auc = contractInstance.getAuction.call(idx);
                var stat = contractInstance.getStatus.call(idx);
                    if(stat == 0){
                    var bidAmount = web3.fromWei(auc[7], "ether");
                    res = res + "<tr><td><a href='auction.html?auctionId=" + idx + "'>" + auc[3] + "</a></td><td>"+bidAmount+" ETH</td><td>"+auc[8];
                    if(auctionSection != null)
                        auctionSection.innerHTML = res;
                }
                else
                {
                    var bidAmount = web3.fromWei(auc[7], "ether");
                    ser = ser + "<tr><td><a href='auction.html?auctionId=" + idx + "'>" + auc[3] + "</a></td><td>"+bidAmount+" ETH</td><td>"+auc[8];
                            if(endAuction != null)
                        endAuction.innerHTML = ser;
                }

        }
}

window.onload = function(){
	updateAuction();
	updateBlockNumber();
	// performActivation();
	refreshAuction();
}

function updateEthNetworkInfo() {
	contractInstance.getRefundValue.call({from: web3.eth.accounts[toAccount]}).then(function(refundBalance){
		var balance = web3.fromWei(refundBalance, "ether");
		withdrawBalance.innerHTML = web3.fromWei(refundBalance, "ether") + " ETH";
	});
}

function withdraw() {
        contractInstance.withdrawRefund({from:web3.eth.accounts[toAccount], gas:500000}, (err, contractInstance) =>
        {
        if (contractInstance.address !== undefined)
                console.log(contractInstance.address)
        }).then(function(txId) {
            updateEthNetworkInfo();
        });
}

function refreshAuction() {
	var auctionId = getParameterByName("auctionId");
	auction = {"auctionId": auctionId};
    var stat = contractInstance.getStatus.call(auctionId);
    if(stat == 1)
    {
        auction["status"] = "Active";
    }
    if(stat == 0)
    {
        auction["status"] = "Active";
    }
    if(stat == 2)
    {
        auction["status"] = "Inactive";
    }
	var result = contractInstance.getAuction.call(auctionId);
            auction["seller"] = result[0];
            auction["contractAddress"] = result[1];
            auction["recordId"] = result[2];
            auction["title"] = result[3];
            auction["description"] = result[4];
            auction["blockNumberOfDeadline"] = result[5].toNumber();
            auction["startingPrice"] = result[6].toNumber();
            auction["currentBid"] = result[7].toNumber();
            auction["bidCount"] = result[8].toNumber();

            var container = document.getElementById("auction_container");
            if(container != null)
                container.innerHTML = constructAuctionView(auction);
		
	

}


function constructAuctionView(auction) {
    $("#auctionTitle").text(auction["title"]);
    
    result = "<table class='auctionDetails'>";
    result += "<tr><td class='auctionlabel'>Status:</td><td>" + auction["status"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Seller:</td><td>" + auction["seller"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Title:</td><td>" + auction["title"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Description:</td><td>" + auction["description"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Current Bid:</td><td>" + web3.fromWei(auction["currentBid"], "ether") + " ETH" + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Number of Bids:</td><td>" + auction["bidCount"] + "</td></tr>";
    result += "<tr><td class='auctionlabel'>Deadline Block Number:</td><td>" + auction["blockNumberOfDeadline"] +"</td></tr>";
    
    
       

    if (auction["status"] == "Active" || auction["status"] == "Pending") {
    result += "<tr><td class='auctionLabel'>Bid (in eth):</td><td><input type='text' id='bid_value' placeholder='eg 3.0'></input></td></tr>";
    result += "<tr><td class='auctionLabel'>&nbsp;</td><td><button id='bid_button' class='btn btn-primary' onclick='placeBid()'>Place Bid</button></td></tr>";
    }

    if (auction["status"] == "Active" || auction["status"] == "Pending") {
    result += "<tr><td class='auctionLabel'>End Auction:</td><td><button id='end_button' onclick='endAuction()'>End Auction</button></td></tr>";
    }


    result += "</table>";
    if(auction["status"] == "Inactive"){
        result += "<h2>Winning Bid is: "+auction["currentBid"]/Math.pow(10,18)+" ETH</h2>";
    }
  return result;
}

function performActivation() {
    contractInstance.activateAuction(auction["auctionId"], {from:web3.eth.accounts[toAccount] , gas: 500000}).then(function(txnId) {
    refreshAuction();
    });
}

function placeBid() {
    var bid = document.getElementById("bid_value").value;
    bid = web3.toWei(bid, "ether");
    contractInstance.placeBid(auction["auctionId"], {from:web3.eth.accounts[toAccount],value: bid , gas: 500000}, (err, contractInstance) =>
        {
        if (contractInstance.address !== undefined)
                console.log(contractInstance.address)
        });
    refreshAuction();
    alert("Bid placed successfully!");
}    

function endAuction() {
  var txnId = contractInstance.endAuction(auction["auctionId"], {from:web3.eth.accounts[toAccount], gas: 500000});
    console.log("End auction txnId: " + txnId)
    refreshAuction();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function updateBlockNumber() {
    web3.eth.getBlockNumber(function(err, blockNumber) {
	currentBlockNumber = blockNumber;
	console.log("Block number is : " + blockNumber);
	console.log("auction is: " + auction);

	if (auction != null) {
	    var blocksLeft = auction['blockNumberOfDeadline'] - currentBlockNumber;

	    if (blocksLeft > 0) {
		var minsLeft = blocksLeft * 12.5 / 60;  
		$("span#deadlineCountdown").text("(" + blocksLeft + " blocks, and " + minsLeft + " minutes from now)");
	    } else if (blocksLeft <= 0 && $("#bid_button").length == 1) {
            refreshAuction();
        }
	}
    });
}


