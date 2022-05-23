// 导入不存在，pub get 试试
import 'package:open_api_json/open_api_json.dart';

class PersonApiClientJson extends OpenApiJson {
  static PersonApiClientJson? _instance;
  PersonApiClientJson._() {
    _instance = this;
  }
  factory PersonApiClientJson() => _instance ?? PersonApiClientJson._();

  static setBasePath(String? basePath) {
    if (basePath == null || basePath.isEmpty) {
      return;
    }
    basePath = basePath.endsWith("/") ? basePath : "$basePath/";
    final client = PersonApiClientJson();
    client.dio.options.baseUrl = basePath;
  }
}
