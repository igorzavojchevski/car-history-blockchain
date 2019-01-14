#Car History
#Igor Zavojchevski
https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.22-nightly.2018.4.16+commit.d8030c9b.js

https://remix.ethereum.org/#optimize=false&version=soljson-v0.4.25+commit.59dbf8f1.js - novoto 07.01

1. Copy ABI from contract
2. geth --datadir ./datadir --networkid 2018 --port 30306 --nodiscover --rpc --rpcapi “db,personal,eth,net,web3,debug” --rpccorsdomain=”*” --rpcaddr=”localhost” --rpcport 8545 --ws --wsapi "db,personal,eth,net,web3,debug" --wsorigins="*"  --wsaddr="localhost" --wsport 8546 console
3. npm start
4. miner.start()
5. Deploy contract
6. Set address to client app