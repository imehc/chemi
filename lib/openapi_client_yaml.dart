import 'package:open_api_yaml/open_api_yaml.dart';

class PersonApiClient extends OpenApiYaml {
  static PersonApiClient? _instance;
  PersonApiClient._() {
    _instance = this;
  }
  factory PersonApiClient() => _instance ?? PersonApiClient._();

  static setBasePath(String? basePath) {
    if (basePath == null || basePath.isEmpty) {
      return;
    }
    basePath = basePath.endsWith("/") ? basePath : "$basePath/";
    final client = PersonApiClient();
    client.dio.options.baseUrl = basePath;
  }
}
