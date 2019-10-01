pragma solidity ^0.4.2;

contract Auctioning {

	struct Bid {

		address bidder;
		uint256 amount;
		uint timestamp;

	}

	enum AuctionStatus {Pending,Active,Inactive}

	struct Auction {

		address seller;
		address contractAddress;
		string recordId;
		string title;
		string description;
		uint blockNumberOfDeadline;
		AuctionStatus status;
		uint256 startingPrice;
		uint256 currentBid;
		Bid[] bids;

	}

	Auction[] public auctions;

	mapping(address => uint[]) public auctionsRunByUser;
	mapping(address => uint[]) public auctionsBidOnByUser;
    mapping(string => bool) activeContractRecordConcat;
    mapping(address => uint) refunds;

	address owner;		

	event AuctionCreated(uint id, string title, uint256 startingPrice);
    event AuctionActivated(uint id);
    event BidPlaced(uint auctionId, address bidder, uint256 amount);
    event AuctionEndedWithWinner(uint auctionId, address winningBidder, uint256 amount);

    function Auctioning() {

    	owner=msg.sender;

    }

    function createAuction(
					    	string _title,
					    	string _description,
					    	address _contractAddressOfAsset,
					    	string _recordIdOfAsset,
					    	uint _deadline,
					    	uint256 _startingPrice) returns (uint auctionId) {

    	auctionId = auctions.length++;
	    Auction a = auctions[auctionId];
	    a.seller = msg.sender;
	    a.contractAddress = _contractAddressOfAsset;
	    a.recordId = _recordIdOfAsset;
	    a.title = _title;
	    a.description = _description;
	    a.blockNumberOfDeadline = _deadline;
	    a.status = AuctionStatus.Pending;
	    a.startingPrice = _startingPrice;
	    a.currentBid = _startingPrice;
	    auctionsRunByUser[a.seller].push(auctionId);
        activeContractRecordConcat[strConcat(addrToString(_contractAddressOfAsset), _recordIdOfAsset)] = true;
        AuctionCreated(auctionId, a.title, a.startingPrice);
        return auctionId;

    }

    function getAuction(uint idx) returns (address, address, string, string, string, uint , uint256 , uint256, uint) {
        Auction a = auctions[idx];
        return (a.seller,
                a.contractAddress,
                a.recordId,
                a.title,
                a.description,
                a.blockNumberOfDeadline,
                a.startingPrice,
                a.currentBid,
                a.bids.length
                );
    }

    function getAuctionCount() returns (uint) {
        return auctions.length;
    }

    function getStatus(uint idx) returns (uint) {
        Auction a = auctions[idx];
        return uint(a.status);
    }

    function getAuctionsCountForUser(address addr) returns (uint) {
        return auctionsRunByUser[addr].length;
    }

    function getAuctionIdForUserAndIdx(address addr, uint idx) returns (uint) {
        return auctionsRunByUser[addr][idx];
    }

    function getActiveContractRecordConcat(string _contractRecordConcat) returns (bool) {
        return activeContractRecordConcat[_contractRecordConcat];
    }

    function activateAuction(uint auctionId) returns (bool){
        Auction a = auctions[auctionId];
        a.status = AuctionStatus.Active;
        AuctionActivated(auctionId);
        return true;
    }

    function getBidCountForAuction(uint auctionId) returns (uint) {
        Auction a = auctions[auctionId];
        return a.bids.length;
    }

    function getBidForAuctionByIdx(uint auctionId, uint idx) returns (address bidder, uint256 amount, uint timestamp) {
        Auction a = auctions[auctionId];
        Bid b = a.bids[idx];
        return (b.bidder, b.amount, b.timestamp);
    }

    function placeBid(uint auctionId) payable returns (bool success) {
        uint256 amount = msg.value;
        Auction a = auctions[auctionId];

        uint bidIdx = a.bids.length++;
        Bid b = a.bids[bidIdx];
        b.bidder = msg.sender;
        b.amount = amount;
        b.timestamp = now;
        a.currentBid = amount;

        auctionsBidOnByUser[b.bidder].push(auctionId);

        if (bidIdx > 0) {
            Bid previousBid = a.bids[bidIdx - 1];
            refunds[previousBid.bidder] += previousBid.amount;
        }

        BidPlaced(auctionId, b.bidder, b.amount);
        return true;
    }

    function getRefundValue() returns (uint) {
        return refunds[msg.sender];
    }

    function withdrawRefund() {
        uint refund = refunds[msg.sender];
        refunds[msg.sender] = 0;
        if (!msg.sender.send(refund))
            refunds[msg.sender] = refund;
    }

    function endAuction(uint auctionId) returns (bool success) {
      
        Auction a = auctions[auctionId];
        activeContractRecordConcat[strConcat(addrToString(a.contractAddress), a.recordId)] = false;

        Bid topBid = a.bids[a.bids.length - 1];

        AuctionEndedWithWinner(auctionId, topBid.bidder, a.currentBid);
        refunds[topBid.bidder] += a.currentBid;

        a.status = AuctionStatus.Inactive;
        return true;
    }

    function strConcat(string _a, string _b) internal returns (string) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory ab = new bytes (_ba.length + _bb.length);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) ab[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) ab[k++] = _bb[i];
        return string(ab);
    }

    function addrToString(address x) returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }

}