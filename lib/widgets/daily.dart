import 'package:flutter/material.dart';

import '../constant.dart';

class DailyTabBarPage extends StatefulWidget {
  const DailyTabBarPage({Key? key}) : super(key: key);

  @override
  State<DailyTabBarPage> createState() => _DailyTabBarPageState();
}

class _DailyTabBarPageState extends State<DailyTabBarPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Daily"),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: const Center(
        child: Text('DailyTabBarPage'),
      ),
    );
  }
}
