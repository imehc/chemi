import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_blog/constant.dart';
import 'package:water_drop_nav_bar/water_drop_nav_bar.dart';

import 'widgets/widgets.dart';

void main() {
  /// 初始化
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ),
  );
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
        primarySwatch: white,
        canvasColor: Colors.grey[100],
      ),
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
  int selectedIndex = 0;
  late PageController pageController;
  @override
  void initState() {
    super.initState();
    pageController = PageController(initialPage: selectedIndex);
  }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: const SystemUiOverlayStyle(
        systemNavigationBarColor: navigationBarColor,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
      child: Scaffold(
        body: PageView(
          physics: const NeverScrollableScrollPhysics(),
          controller: pageController,
          children: const <Widget>[
            SunnyTabBarPage(),
            ToolsTabBarPage(),
            MoonTabBarPage(),
          ],
        ),
        bottomNavigationBar: ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
          child: WaterDropNavBar(
            bottomPadding: 15,
            iconSize: 32,
            inactiveIconColor: secondaryColor,
            waterDropColor: primaryColor,
            onItemSelected: (int index) {
              setState(() {
                selectedIndex = index;
              });
              pageController.animateToPage(
                selectedIndex,
                duration: const Duration(milliseconds: 400),
                curve: Curves.easeOutQuad,
              );
            },
            selectedIndex: selectedIndex,
            barItems: <BarItem>[
              BarItem(
                filledIcon: Icons.light_mode,
                outlinedIcon: Icons.light_mode_outlined,
              ),
              BarItem(
                filledIcon: Icons.business_center,
                outlinedIcon: Icons.business_center_outlined,
              ),
              BarItem(
                filledIcon: Icons.nightlight,
                outlinedIcon: Icons.nightlight_outlined,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
