all:
	docker compose up -d

down:
	docker compose down

exec:
	docker exec -it polygon-hardhat bash

compile:
	npx hardhat compile

deploy:
	npx hardhat run deployment/deployTBM.js --network amoy

burn:
	npx hardhat run deployment/burnRequest.js --network amoy

owner:
	npx hardhat run deployment/burnApprovalOwner.js --network amoy	

signer:
	npx hardhat run deployment/burnApprovalSigner.js --network amoy

cleancache:
	npx hardhat clean

clean: down
	yes | docker system prune -a
