run:
	@npm run android

deploy:
	@cd ./functions
	@firebase deploy --only functions
	@cd ..
