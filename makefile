# generate address 
# https://openapi-generator.tech/docs/generators

# generate dart Api Documentation
generate-person-api:
	@echo "Generating person API"
	@openapi-generator generate -i ./openapi.yaml -g dart-dio-next -o ./packages/person_api -c ./openapi-generator.config.yaml
	@cd ./packages/person_api && flutter pub get && flutter pub run build_runner build --delete-conflicting-outputs