import 'package:flutter/material.dart';

import '../constant.dart';
import '../utils/utils.dart';

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
      body: InkWell(
        onTap: () {
          // 延迟五秒执行
          Future.delayed(const Duration(seconds: 5), () {
            LocalNotification.send(
              '测试标题',
              '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
            );
          });
        },
        child: const Center(
          child: Text('SunnyTabBarPage'),
        ),
      ),
    );
  }
}
