import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constant.dart';
import '../provider.dart';

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
      body: Center(
        child: Text('MoonTabBarPage:${context.watch<Counter>().count}'),
      ),
    );
  }
}
