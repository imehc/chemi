import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

import 'constant.dart';
import 'routes/routes.dart';
import 'widgets/widgets.dart';

void main() async {
  /// 初始化
  WidgetsFlutterBinding.ensureInitialized();

  /// 状态栏颜色和主题色保持统一
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ),
  );
  await ScreenUtil.ensureScreenSize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // debugShowCheckedModeBanner: false,
      title: 'tools',
      theme: ThemeData(
        primarySwatch: themeBlue,
        canvasColor: Colors.grey[100],
      ),
      routes: routes,
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _currentIndex = 0;
  late PageController pageController;
  @override
  void initState() {
    super.initState();
    pageController = PageController(initialPage: _currentIndex);
  }

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(375, 812));
    return Scaffold(
      body: PageView(
        controller: pageController,
        physics: const BouncingScrollPhysics(),
        children: const <Widget>[
          SunnyTabBarPage(),
          ToolsTabBarPage(),
          DailyTabBarPage(),
          MoonTabBarPage(),
        ],
        onPageChanged: (i) => setState(() => _currentIndex = i),
      ),
      bottomNavigationBar: SalomonBottomBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() {
          _currentIndex = i;
          pageController.animateToPage(
            _currentIndex,
            duration: const Duration(milliseconds: 400),
            curve: Curves.easeOutQuad,
          );
        }),
        items: [
          SalomonBottomBarItem(
            icon: const Icon(Icons.light_mode_outlined),
            title: const Text("Sunny"),
            selectedColor: primaryColor,
          ),
          SalomonBottomBarItem(
            icon: const Icon(Icons.business_center_outlined),
            title: const Text("Tools"),
            selectedColor: primaryColor,
          ),
          SalomonBottomBarItem(
            icon: const Icon(Icons.space_dashboard_outlined),
            title: const Text("Daily"),
            selectedColor: primaryColor,
          ),
          SalomonBottomBarItem(
            icon: const Icon(Icons.nightlight_outlined),
            title: const Text("Moon"),
            selectedColor: primaryColor,
          ),
        ],
      ),
    );
  }
}

// 路由
Map<String, Widget Function(BuildContext)> routes = {
  "/scan": (context) => const ChimiScan(),
  "/pdf": (context) => const ChimiPdf(),
};
