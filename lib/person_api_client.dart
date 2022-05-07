import 'package:person_api/person_api.dart';

class PersonApiClient extends PersonApi {
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
