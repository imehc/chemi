import 'dart:convert';

import 'package:flutter_blog/http/exception.dart';
import 'package:http/http.dart' as http;

// String baseUrl = "https://www.wanandroid.com";
enum HttpMethod {
  Get,
  Post,
  Put,
  Delete,
  Patch,
}

class HttpConfig {
  HttpConfig._internal();
  static final HttpConfig _singleton = HttpConfig._internal();
  static http.Client _client = http.Client();

  factory HttpConfig() => _singleton;

  static http.Client get getClient => _client;

  static void setClient(http.Client client) => HttpConfig._client = client;
  static const String _baseUrl = "https://www.wanandroid.com";

  static Future<http.Response> request(
    String url, {
    Map<String, String>? headers,
    Map<String, dynamic>? params,
    Map<String, dynamic>? data,
    String? accessToken,
    HttpMethod method = HttpMethod.Get,
  }) async {
    String _url = _baseUrl + (url.startsWith("/") ? url : "/" + url);
    if (params != null && params.isNotEmpty) {
      final _params =
          params.entries.map((e) => "${e.key}=${e.value}").toList().join("&");
      _url.indexOf("?") > 0 ? _url += "&$_params" : _url += "?$_params";
    }
    var request = http.Request(
      method.toString().split(".")[1].toLowerCase(),
      Uri.parse(_url),
    );
    if (accessToken != null) {
      request.headers.update(
        "Authorization",
        (_) => "Bearer $accessToken",
        ifAbsent: () => "Bearer $accessToken",
      );
    }
    request.headers.addAll(headers ?? {});
    print('url:$_url');
    request.body = jsonEncode(data);
    print("request.body:${request.body}");
    final response = await _client.send(request);
    final statusCode = response.statusCode;
    if (statusCode > 500 && statusCode < 600) {
      throw ServiceException(response);
    }
    if (statusCode >= 400 && statusCode < 500) {
      throw ClientException(
          (await http.Response.fromStream(response)).body, response);
    }
    return http.Response.fromStream(response);
  }
}
