import {
    LOGIN_SUCCESSFUL, 
    LOGIN_FAILED, 
    LOGOUT, 
    SIGNUP_SUCCEEDED, 
    SIGNUP_FAILED,
    CHANGE_CONTRACT_ADDRESS,
    CARS_LOADED,
    BUYING_SELLING_FAILED,
    CARDETAILS_LOADED
} from "../constants/action-types";
import _ from 'lodash';
import Web3 from 'web3';
import carAbi from '../contracts/carContract.json';

let web3 = new Web3();
web3.setProvider(
   new Web3.providers.WebsocketProvider(
      //TODO: local blockchain websocket address e.g. 'ws://localhost:8546'
      'ws://localhost:8546'
   )
);

export const login = (address, password) => {
   return dispatch => {
       web3.eth.personal.unlockAccount(address, password, 600)
           .then((response) => {
               console.info('Login successful:', response)
               dispatch({ type: LOGIN_SUCCESSFUL, payload: address });
           }).catch(error => {
               console.log('Login Error:', error)
               dispatch({ type: LOGIN_FAILED, payload: null });
           })
   }
}

export const logout = () => {
   return dispatch => dispatch({ type: LOGOUT, payload: null });
}

export const signup = (password) => {
   return dispatch => {
       web3.eth.personal.newAccount(password)
           .then(response => {
               console.info('new account ', response);
               dispatch({ type: SIGNUP_SUCCEEDED, payload: response })
           }).catch(error => {
               console.error('error creating account ', error);
               dispatch({ type: SIGNUP_FAILED })
           })
   }
}

export const changeContractAddress = (chassis) => {
   return dispatch => {
       let newAddress = 'test';
       let contractABI = null;
       console.log(chassis);
       console.log(typeof(chassis));
       //use this for testing purposes only - smart contract deployed on other instance just for testing
    //    if(chassis === '1') {
    //        newAddress = '0x1e6dd798eb16ae98113d76b810f8467ed72f00cd';
    //        contractABI = abi;
    //    }
       if(chassis === 'TMBJG7NE6E0122334') {
           newAddress = '0x828885d1164e02bf667f2773a2c2355106e42715';
           contractABI = carAbi;
       }
       else if(chassis === 'ZFA31200000541563') {
        newAddress = '0x1e6dd798eb16ae98113d76b810f8467ed72f00cd';
        contractABI = carAbi;
       }
       else {
            newAddress = 'no';
            contractABI = null;
       }
       console.log(contractABI);
       console.log(newAddress);
       if (web3.utils.isAddress(newAddress)) {
           console.log(newAddress);
           let contractInstance = new web3.eth.Contract(contractABI, newAddress);
           console.log(contractInstance);
           dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: newAddress, contractAddressValid: true, contractInstance: contractInstance } });
           if(chassis === 'ZFA31200000541563' || chassis === 'TMBJG7NE6E0122334'){ 
               loadCars(contractInstance, dispatch);
               subscribeToEvents(contractInstance, dispatch);
           }
       } else {
           dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: newAddress, contractAddressValid: false, contractInstance: null } });
       }
   }
}

export const loadCars = (contractInstance, dispatch) => {
    contractInstance.methods.getCars().call()
            .then(response => {
                console.log(response);
               let cars =  _.zipWith(response[0], response[1], response[2], response[3], (owner, forSale, price, carName) => {
                    return {owner, forSale, price, carName};
                })
                dispatch({type: CARS_LOADED, payload: cars})
            })
            .catch(error => console.log(error));
 }

let subscribeToEvents = (contractInstance, dispatch) => {
   let carOwnerChangedEvent = contractInstance.events.CarOwnerChanged(
       {
         fromBlock: 0
       },
       function(error, event) {
         console.log('CarOwnerChanged event : ', event);
         loadCars(contractInstance, dispatch);
       }
     );

     let carPriceChangedEvent = contractInstance.events.CarPriceChanged(
       {
         fromBlock: 0
       },
       function(error, event) {
         console.log('CarPriceChanged event : ', event);
         loadCars(contractInstance, dispatch);
       }
     );

     let carAvailabilityChangedEvent = contractInstance.events.CarAvailabilityChanged(
       {
         fromBlock: 0
       },
       function(error, event) {
         console.log('CarAvailabilityChanged event : ', event);
         loadCars(contractInstance, dispatch);
       }
     );
     
}


export const clearContractAddress = _ => {
   return dispatch => {
       dispatch({ type: CHANGE_CONTRACT_ADDRESS, payload: { contractAddress: null, contractAddressValid: false, contractInstance: null } })
   }
}

export const buyCar = (contractInstance, carId, price, userId) => {
   return dispatch => {
       contractInstance.methods.buyCar(carId).send({value: price, from: userId})
       .then(response => {
           console.log(response);
           loadCars(contractInstance, dispatch);
       })
       .catch(error => {
           dispatch({ type: BUYING_SELLING_FAILED, payload: { showBuySellAlert: true, isBought: false } });
           console.log(error);
       })
   }
}

export const sellCar = (contractInstance, carId, price, userId) => {
   return dispatch => {
       contractInstance.methods.putCarUpForSale(carId, price).send({from: userId})
       .then(response => {
           console.log(response);
           loadCars(contractInstance, dispatch);
       })
       .catch(error => {
           console.log(error);
       })
   }
}

export const takeOffMarket = (contractInstance, carId, userId) => {
   return dispatch => {
       contractInstance.methods.takeOffMarket(carId).send({from: userId})
       .then(response => {
           console.log(response);
           loadCars(contractInstance, dispatch);
       })
       .catch(error => {
           console.log(error);
       })
   }
}

export const carDetails = (contractInstance, carId, userId) => {
    return dispatch => {
        console.log(carId);
        console.log(userId);
        contractInstance.methods.carDetails(carId).call({from: userId})
        .then(response => {
            console.log(response);
            let car =  _.zipWith(response[0], response[1], response[2], response[3], (owner_details, forSale, price, carkm) => {
                return {owner_details, forSale, price, carkm};
            });
            // dispatch({type: CARDETAILS_LOADED, payload: car})
        })
        .catch(error => {
            console.log(error);
        })
    }
 }