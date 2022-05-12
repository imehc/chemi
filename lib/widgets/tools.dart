import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_blog/constant.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:intl/intl.dart';

import '../configuration.dart';

class ToolsTabBarPage extends StatefulWidget {
  const ToolsTabBarPage({Key? key}) : super(key: key);

  @override
  State<ToolsTabBarPage> createState() => _ToolsTabBarPageState();
}

class _ToolsTabBarPageState extends State<ToolsTabBarPage> {
  String? _currentTime;
  Timer? _timer;

  String formatDate(int params) => params.toString().padLeft(2, '0');

  String handleFormatDate() => DateFormat().format(DateTime.now().toLocal());

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
        toolbarHeight: AppConstantConfig.toolbarHeight,
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
            return InkWell(
              onTap: () {
                Navigator.of(context)
                    .pushNamed(entranceList[index]['route'] as String);
              },
              child: Card(
                shadowColor: AppConstantConfig.primaryColor,
                color: entranceList[index]['color'] as Color,
                elevation: 1.0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(AppConstantConfig.cardRadius.r),
                  ),
                ),
                child: Center(
                  child: Text(
                    entranceList[index]['name'] as String,
                    style: TextStyle(
                      // 适配屏幕宽高
                      fontSize: AppConstantConfig.toolsTextSize.sp,
                      color: entranceList[index]['textColor'] as Color,
                    ),
                  ),
                ),
              ),
            );
          },
          itemCount: entranceList.length,
        ),
      ),
    );
  }
}
