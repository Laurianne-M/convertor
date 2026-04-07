
build-all:
	docker compose build

clean:
	docker compose down --rmi all

deploy:
	docker compose up -d

off:
	docker compose down

test:
	/bin/bash scripts/test.sh

e2e:
	/bin/bash scripts/e2e.sh

restart: off deploy

install: 
	cd src && npm install