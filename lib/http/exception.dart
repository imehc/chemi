import 'package:http/http.dart' as http;

class PherryException implements Exception {
  final String message;
  final http.StreamedResponse response;

  PherryException(this.message, this.response);

  @override
  String toString() {
    return 'ServerException{message: $message}';
  }
}

class ServiceException extends PherryException {
  ServiceException(
    http.StreamedResponse response,
  ) : super("服务器异常", response);
}

class ClientException extends PherryException {
  ClientException(
    String message,
    http.StreamedResponse response,
  ) : super(message, response);
}
