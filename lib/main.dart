import 'package:flutter/cupertino.dart';
import 'package:flutter_blog/utils/catch.dart';

import 'routes/routes.dart';

void main() async {
  /// 初始化插件前需调用初始化代码 runApp()函数之前
  WidgetsFlutterBinding.ensureInitialized();
  await LocalCache.getInstance();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      debugShowCheckedModeBanner: false,
      routes: _routes,
      initialRoute: '/',
      // onGenerateRoute: _routeGenerator,
    );
  }
}

final Map<String, WidgetBuilder> _routes = {
  "/": (context) => const ChemiTabbar(),
  "/detail": (context, {arguments}) => ChemiDetail(arguments: arguments),
  "/login": (context) => const ChemiLogin(),
};

// Route _routeGenerator(RouteSettings settings) {
//   final Function builder = _routes[settings.name] as Function;
//   if (settings.arguments != null) {
//     // 如果透传了参数
//     return CupertinoPageRoute(
//         builder: (context) => builder(context, arguments: settings.arguments));
//   } else {
//     // 没有透传参数
//     return CupertinoPageRoute(builder: (context) => builder(context));
//   }
// }

