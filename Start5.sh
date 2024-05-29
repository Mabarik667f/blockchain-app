!/bin/sh

geth --datadir ./ --networkid 15 --http --http.corsdomain "*" --allow-insecure-unlock --http.api="admin,debug,web3,eth,txpool,personal,ethash,miner,net" &
sleep 3

geth --exec "miner.setEtherbase('0x15bDC5Ff2d3a12690EA91A5B8E45C9AcdE72869C')" attach geth.ipc
geth --exec "miner.start(1)" attach geth.ipc

sleep 3
geth --exec "personal.unlockAccount('0x15bDC5Ff2d3a12690EA91A5B8E45C9AcdE72869C', '1234', 0)" attach geth.ipc
geth --exec "personal.unlockAccount('0xAC6846ee88cA107B3f4bAC52D324010Fa1e3734b', '1234', 0)" attach geth.ipc
geth --exec "personal.unlockAccount('0xAb792Ac65e93c467ab3a6BE36dAC404F23d40a62', '1234', 0)" attach geth.ipc
geth --exec "personal.unlockAccount('0xdB84B6A285120502c47DfdDDcB56062b75f43342', '1234', 0)" attach geth.ipc
geth --exec "personal.unlockAccount('0x586a7114dd69B9Ac8708d10cfaAfB07D43b8d3cC', '1234', 0)" attach geth.ipc

npm run serve &
chromium "http://localhost:8080"
