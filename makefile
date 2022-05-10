# generate address 
# https://openapi-generator.tech/docs/generators

# generate dart Api Documentation
generate-person-api-dart:
	@echo "Generating person API"
	@openapi-generator generate -i ./openapi.yaml -g dart-dio-next -o ./packages/person_api -c ./openapi-generator.config.yaml
	@cd ./packages/person_api && flutter pub get && flutter pub run build_runner build --delete-conflicting-outputs

#  generate typescript-rxjs Api Documentation
generate-person-api-typescript:
	@echo "Generating person API test"
	@openapi-generator generate -i ./openapi.yaml -g typescript-rxjs -o ./packages/person_api_typecript_rxjs -c ./openapi-generator.config.yaml
	@cd ./packages/person_api_typecript_rxjs && yarn 

#  generate go-gin-server Api Documentation
generate-person-api-go:
	@echo "Generating person API test"
	@openapi-generator generate -i ./openapi.yaml -g go-gin-server -o ./packages/person_api_go_gin_server -c ./openapi-generator.config.yaml
