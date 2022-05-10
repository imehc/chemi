import 'package:flutter/material.dart';

import '../constant.dart';

class ToolsTabBarPage extends StatefulWidget {
  const ToolsTabBarPage({Key? key}) : super(key: key);

  @override
  State<ToolsTabBarPage> createState() => _ToolsTabBarPageState();
}

class _ToolsTabBarPageState extends State<ToolsTabBarPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Tools"),
        toolbarHeight: toolbarHeight,
      ),
      body: const Center(
        child: Text('ToolsTabBarPage'),
      ),
    );
  }
}
