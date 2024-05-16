import 'package:bottom_bar/bottom_bar.dart';
import 'package:chemi/provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:chemi/routes/tools_crop.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:mmkv/mmkv.dart';
import 'package:provider/provider.dart';

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
  await MMKV.initialize();
  await ScreenUtil.ensureScreenSize();
  runApp(const Provider());
}

class Provider extends StatelessWidget {
  const Provider({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => Counter()),
      ],
      child: const MyApp(),
    );
  }
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
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _currentIndex = 0;
  late PageController _pageController;
  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(375, 812));
    return Scaffold(
      body: PageView(
        controller: _pageController,
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
      // SafeArea设置安全区颜色
      bottomNavigationBar: Material(
        color: AppConstantConfig.primaryColor,
        elevation: 10,
        child: SafeArea(
          maintainBottomViewPadding: true,
          child: BottomBar(
            showActiveBackgroundColor: true,
            // 由于使用Material颜色覆盖，所以不需要再设置backgroundColor
            // backgroundColor: AppConstantConfig.primaryColor,
            selectedIndex: _currentIndex,
            height: 60,
            onTap: (int index) {
              _pageController.jumpToPage(index);
              setState(() => _currentIndex = index);
            },
            items: <BottomBarItem>[
              BottomBarItem(
                icon: const Icon(Icons.light_mode_outlined),
                title: const Text('Sunny'),
                inactiveColor: Colors.black.withOpacity(.5),
                activeColor: Colors.white,
              ),
              BottomBarItem(
                icon: const Icon(Icons.business_center_outlined),
                title: const Text('Tools'),
                inactiveColor: Colors.black.withOpacity(.5),
                activeColor: Colors.white,
              ),
              BottomBarItem(
                icon: const Icon(Icons.space_dashboard_outlined),
                title: const Text('Daily'),
                inactiveColor: Colors.black.withOpacity(.5),
                activeColor: Colors.white,
              ),
              BottomBarItem(
                icon: const Icon(Icons.nightlight_outlined),
                title: const Text('Moon'),
                inactiveColor: Colors.black.withOpacity(.5),
                activeColor: Colors.white,
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
  "/crop": (context) => const ChemiCrop("裁剪"),
  "/hero": (context) => const ChemiHeroAnimation(),
  "/scan": (context) => const ChemiScan("扫码"),
  "/pdf": (context) => const ChemiPdf("PDF"),
  "/blur": (context) => const ChemiBlur("Blur"),
};
