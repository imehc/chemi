import 'package:flutter/material.dart';

import '../constant.dart';

class SunnyTabBarPage extends StatefulWidget {
  const SunnyTabBarPage({Key? key}) : super(key: key);

  @override
  State<SunnyTabBarPage> createState() => _SunnyTabBarPageState();
}

class _SunnyTabBarPageState extends State<SunnyTabBarPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Sunny"),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: const Center(
        child: Text('SunnyTabBarPage'),
      ),
    );
  }
}
