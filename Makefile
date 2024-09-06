all:
	docker compose up -d

down:
	docker compose down

exec:
	docker exec -it polygon-hardhat bash

clean: down
	yes | docker system prune -a
