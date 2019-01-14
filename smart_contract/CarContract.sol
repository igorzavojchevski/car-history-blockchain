pragma solidity ^0.4.11;

contract CarContract {
    address owner;
    mapping (address => uint) public balances;
    
    struct Car {
        address owner;
        bool forSale;
        uint price;
        string carName;
        uint km;
    }
    
    //struct CDetails {
    //    string name;
    //    string manufactureYear;
    //    uint km;
    //}
    
    Car[12] public cars;
    
    event CarOwnerChanged(
        uint index
    );
    
    event CarPriceChanged(
        uint index,
        uint price
    );
    
    event CarAvailabilityChanged(
        uint index,
        uint price,
        bool forSale
    );
    
    //Testing
    constructor() public {
        owner = msg.sender;
        cars[0].price = 7;
        cars[0].forSale = true;
        cars[0].carName = "Test";
        cars[0].km = 34000;
        cars[1].price = 4;
        cars[1].forSale = true;
        cars[1].km = 23000;
        cars[2].price = 1;
        cars[2].forSale = true;
        cars[3].price = 23;
        cars[3].forSale = true;
        cars[4].price = 2;
        cars[4].forSale = true;
        cars[5].price = 2;
        cars[5].forSale = true;
        //cars[6].price = 5;
        //cars[6].forSale = true;
        //cars[7].price = 7;
        //cars[7].forSale = true;
        //cars[8].price = 1;
        //cars[8].forSale = true;
        //cars[9].price = 5;
        //cars[9].forSale = true;
        //cars[10].price = 6;
        //cars[10].forSale = true;
        //cars[11].price = 1;
        //cars[11].forSale = true;
    }
    
    function putCarUpForSale(uint index, uint price) public {
        Car storage car = cars[index];
        
        require(msg.sender == car.owner && price > 0);
        
        car.forSale = true;
        car.price = price;
        emit CarAvailabilityChanged(index, price, true);
    }
    
    function takeOffMarket(uint index) public {
        Car storage car = cars[index];
        
        require(msg.sender == car.owner);
        
        car.forSale = false;
        emit CarAvailabilityChanged(index, car.price, false);
    }
    
    function carDetails(uint index) public view returns(address, bool, uint, uint) {
        Car storage car = cars[index];
        
        //require(msg.sender == car.owner);
        
        address owner_details = car.owner;
        uint price = car.price;
        bool forSale = car.forSale;
        uint carkm = car.km;
        
        return (owner_details, forSale, price, carkm);
    }
    
    function getCars() public view returns(address[], bool[], uint[], string) {
        address[] memory addrs = new address[](12);
        bool[] memory available = new bool[](12);
        uint[] memory price = new uint[](12);
        string memory carName = new string(1);
        
        for (uint i = 0; i < 12; i++) {
            Car storage car = cars[i];
            addrs[i] = car.owner;
            price[i] = car.price;
            available[i] = car.forSale;
            if(i == 0){
                carName = car.carName;
            }
        }
        
        return (addrs, available, price, carName);
    }
    
    function buyCar(uint index) public payable {
        Car storage car = cars[index];
        
        require(msg.sender != car.owner && car.forSale && msg.value >= car.price);
        
        if(car.owner == 0x0) {
            balances[owner] += msg.value;
        }else {
            balances[car.owner] += msg.value;
        }
        
        car.owner = msg.sender;
        car.forSale = false;
        
        emit CarOwnerChanged(index);
    }
    
    function withdrawFunds() public {
        address payee = msg.sender;
          uint payment = balances[payee];
    
          require(payment > 0);
    
          balances[payee] = 0;
          require(payee.send(payment));
    }
    
    
    function destroy() payable public {
        require(msg.sender == owner);
        selfdestruct(owner);
    }
}