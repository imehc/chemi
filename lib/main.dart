import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_blog/routes/tools_crop.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
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
        primarySwatch: AppConstantConfig.themeBlue,
        canvasColor: Colors.grey[100],
      ),
      supportedLocales: const [
        Locale('en'),
        Locale('zh'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      locale: const Locale('zh'),
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
        // physics: const BouncingScrollPhysics(),
        physics: const ClampingScrollPhysics(),
        children: const <Widget>[
          SunnyTabBarPage(),
          ToolsTabBarPage(),
          DailyTabBarPage(),
          MoonTabBarPage(),
        ],
        onPageChanged: (i) => setState(() => _currentIndex = i),
      ),
      bottomNavigationBar: Material(
        color: AppConstantConfig.primaryColor,
        elevation: 10,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(25),
            topRight: Radius.circular(25),
          ),
        ),
        child: SafeArea(
          child: SalomonBottomBar(
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
                selectedColor: AppConstantConfig.secondaryColor,
              ),
              SalomonBottomBarItem(
                icon: const Icon(Icons.business_center_outlined),
                title: const Text("Tools"),
                selectedColor: AppConstantConfig.secondaryColor,
              ),
              SalomonBottomBarItem(
                icon: const Icon(Icons.space_dashboard_outlined),
                title: const Text("Daily"),
                selectedColor: AppConstantConfig.secondaryColor,
              ),
              SalomonBottomBarItem(
                icon: const Icon(Icons.nightlight_outlined),
                title: const Text("Moon"),
                selectedColor: AppConstantConfig.secondaryColor,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 路由
Map<String, Widget Function(BuildContext)> routes = {
  "/scan": (context) => const ChemiScan("扫码"),
  "/pdf": (context) => const ChemiPdf("PDF"),
  "/crop": (context) => const ChemiCrop("裁剪"),
};
