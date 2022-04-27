import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_blog/constant.dart';

class SunnyTabBarPage extends StatefulWidget {
  const SunnyTabBarPage({Key? key}) : super(key: key);

  @override
  State<SunnyTabBarPage> createState() => _SunnyTabBarPageState();
}

class _SunnyTabBarPageState extends State<SunnyTabBarPage> {
  String? _currentTime;
  Timer? _timer;

  String handleFormatDate() {
    var hh = DateTime.now().hour;
    var mm = DateTime.now().minute;
    var ss = DateTime.now().second;
    return hh > 12 ? '下午 ${hh - 12}:$mm:$ss' : '上午 $hh:$mm:$ss';
  }

  void _startTime() {
    const Duration duration = Duration(seconds: 1);
    _timer = Timer.periodic(duration, (timer) {
      setState(() {
        _currentTime = handleFormatDate();
      });
    });
  }

  @override
  void initState() {
    super.initState();
    // 初始化时间
    _currentTime = handleFormatDate();
    // 更新时间
    _startTime();
  }

  @override
  void dispose() {
    super.dispose();
    if (_currentTime != null) {
      _currentTime = null;
    }
    if (_timer != null) {
      _timer?.cancel();
      _timer = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_currentTime ?? '22'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: GridView.builder(
          shrinkWrap: true, // 内容适配
          reverse: false, // 是否反向排序
          padding: const EdgeInsets.only(
            left: 10.0,
            right: 10.0,
            top: 10.0,
            bottom: 10.0,
          ),
          // physics: const NeverScrollableScrollPhysics(), // 禁止滑动
          // physics: const AlwaysScrollableScrollPhysics(), // 允许滑动
          // physics: const BouncingScrollPhysics(), // 弹性滑动
          physics: const ClampingScrollPhysics(), // 限制滑动
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            mainAxisSpacing: 5.0, // 主轴间距
            crossAxisSpacing: 5.0, // 交叉轴间距
            crossAxisCount: 2, // 列数量
            childAspectRatio: 1.5, // 子项宽高比
          ),
          itemBuilder: (context, index) {
            return GestureDetector(
              onTap: () => handleJumpPage(index, context: context),
              child: Card(
                shadowColor: primaryColor,
                color: secondaryColor,
                elevation: 1.0,
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0),
                  ),
                ),
                child: Center(
                  child: Text(
                    handleJumpPage(index),
                    style: const TextStyle(
                      fontSize: sunnyTextSize,
                      color: primaryColor,
                    ),
                  ),
                ),
              ),
            );
          },
          itemCount: 1,
        ),
      ),
    );
  }
}

String handleJumpPage(int index, {BuildContext? context}) {
  switch (index) {
    case 0:
      if (context != null) Navigator.pushNamed(context, '/scan');
      return 'scan';
    default:
      return '未知页面';
  }
}
