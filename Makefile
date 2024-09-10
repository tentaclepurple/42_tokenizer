all:
	docker compose up -d

down:
	docker compose down

exec:
	docker exec -it polygon-hardhat bash

compile:
	npx hardhat compile

deploy:
	npx hardhat run development/deployTBM.js --network amoy

burn:
	npx hardhat run development/burnRequest.js --network amoy

owner:
	npx hardhat run development/burnApprovalOwner.js --network amoy	

signer:
	npx hardhat run development/burnApprovalSigner.js --network amoy

cleancache:
	npx hardhat clean

clean: down
	yes | docker system prune -a
