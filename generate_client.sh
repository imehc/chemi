# bash generate_client.sh
# https://github.com/igoriuz/dart-dio-next-example/blob/main/generate_client.sh
openapi-generator generate -i openapi.json -g dart-dio-next -c openapi-generator.config.json -o ./openapi/generated_client
cd ./openapi/generated_client
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs