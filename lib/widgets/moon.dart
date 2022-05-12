import 'package:flutter/material.dart';

import '../constant.dart';

class MoonTabBarPage extends StatefulWidget {
  const MoonTabBarPage({Key? key}) : super(key: key);

  @override
  State<MoonTabBarPage> createState() => _MoonTabBarPageState();
}

class _MoonTabBarPageState extends State<MoonTabBarPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Moon"),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: const Center(
        child: Text('MoonTabBarPage'),
      ),
    );
  }
}
