build:
	docker-compose build

dev: | build
	docker-compose up

run: | build
	docker-compose up -d

stop:
	docker-compose down

restart:
	docker-compose down && docker-compose up -d

bash-fe:
	docker-compose exec web bash
	
bash-be:
	docker-compose exec backend bash

bash-db:
	docker-compose exec db bash
