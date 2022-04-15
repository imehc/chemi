import 'package:shared_preferences/shared_preferences.dart';

class LocalCache {
  LocalCache._();

  /// factory 可以让你的类变得可以通过 . 来调用
  factory LocalCache() => _instance;
  static late final LocalCache _instance = LocalCache._();
  static late SharedPreferences _prefs;

  /// 获取唯一的实例
  static Future<SharedPreferences> getInstance() async {
    _prefs = await SharedPreferences.getInstance();
    return _prefs;
  }

  ///设置通用持久化数据
  static setLocalStorage<T>(String key, T value) {
    String type = value.runtimeType.toString();
    switch (type) {
      case "String":
        _prefs.setString(key, value as String);
        break;
      case "int":
        _prefs.setInt(key, value as int);
        break;
      case "double":
        _prefs.setDouble(key, value as double);
        break;
      case "bool":
        _prefs.setBool(key, value as bool);
        break;
      case "List<String>":
        _prefs.setStringList(key, value as List<String>);
        break;
      default:
        _prefs.setString(key, value.toString());
    }
  }

  ///获取持久化数据
  static dynamic getLocalStorage<T>(String key) {
    String type = T.toString();
    switch (type) {
      case "String":
        return _prefs.getString(key);
      case "int":
        return _prefs.getInt(key);
      case "double":
        return _prefs.getDouble(key);
      case "bool":
        return _prefs.getBool(key);
      case "List<String>":
        return _prefs.getStringList(key);
      default:
        return _prefs.getString(key);
    }
  }

  ///删除持久化数据中的某一项
  static Future<bool> removeLocalStorage(String key) async {
    return await _prefs.remove(key);
  }

  ///清空持久化数据
  static Future<bool> clearLocalStorage() async {
    return await _prefs.clear();
  }

  ///check是否存在某一项
  static bool hasLocalStorage(String key) {
    return _prefs.containsKey(key);
  }

  ///重新加载持久化数据
  static Future<void> reloadLocalStorage() async {
    return await _prefs.reload();
  }
}
