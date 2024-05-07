import 'package:chemi/helper.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

// 来源： https://blog.csdn.net/qq_41806966/article/details/121984458
class LocalNotification {
  static final FlutterLocalNotificationsPlugin _np =
      FlutterLocalNotificationsPlugin();

  /// 是否初始化了
  static var _isInit = false;

  /// 初始化
  static Future<void> _init() async {
    if (_isInit) return;
    _isInit = true;

    var android = const AndroidInitializationSettings("@mipmap/ic_launcher");
    var iOS = const DarwinInitializationSettings();

    try {
      await _np.initialize(InitializationSettings(android: android, iOS: iOS));
    } catch (e) {
      logger.e("LocalNotification init error: $e");
    }
  }

  static void send(String title, String body) async {
    // 初始化
    await _init();

    // 构建描述
    var androidDetails = const AndroidNotificationDetails('id描述', '名称描述',
        importance: Importance.max, priority: Priority.high);
    var iosDetails = const DarwinNotificationDetails();
    var details = NotificationDetails(android: androidDetails, iOS: iosDetails);

    // ⚠️:iOS Notifications are not displayed if the app is in the foreground
    // https://github.com/MaikuB/flutter_local_notifications/issues/1291

    // 显示通知, 第一个参数是id,id如果一致则会覆盖之前的通知
    try {
      _np.show(
          DateTime.now().millisecondsSinceEpoch >> 10, title, body, details);
    } catch (e) {
      logger.e("LocalNotification send error: $e");
    }
  }
}
