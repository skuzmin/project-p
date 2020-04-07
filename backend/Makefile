build:
	docker-compose build

dev: | build
	docker-compose up

run: | build
	docker-compose up -d

run-db:
	docker-compose up -d db

stop:
	docker-compose down

bash:
	docker-compose exec backend bash
