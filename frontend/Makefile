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

bash:
	docker-compose exec proxy bash
	