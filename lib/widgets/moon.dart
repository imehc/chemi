import 'package:flutter/material.dart';

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
      ),
      body: const Center(
        child: Text('MoonTabBarPage'),
      ),
    );
  }
}
