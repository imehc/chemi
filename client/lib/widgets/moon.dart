import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constant.dart';
import '../provider.dart';

// 通过rxdart控制load加载框的显示与隐藏

class MoonTabBarPage extends StatefulWidget {
  const MoonTabBarPage({Key? key}) : super(key: key);

  @override
  State<MoonTabBarPage> createState() => _MoonTabBarPageState();
}

class _MoonTabBarPageState extends State<MoonTabBarPage> {
  final _loadingController = StreamController<int>();
  late StreamSubscription _loadingSubscription;

  @override
  void initState() {
    super.initState();
    _loadingSubscription = _loadingController.stream.map((event) {
      showDialog(
          barrierDismissible: false,
          context: context,
          builder: (context) {
            return AlertDialog(
              backgroundColor: Colors.transparent,
              elevation: 0,
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: const [
                  CircularProgressIndicator(),
                  SizedBox(height: 20),
                  Text(
                    "正在加载...",
                    style: TextStyle(
                      color: Colors.blue,
                    ),
                  ),
                ],
              ),
            );
          });
      print("传递进来的参数是：$event");
      return event;
    })
        // 异步使用asyncMap
        .asyncMap((event) async {
      await Future.delayed(const Duration(seconds: 3), () {
        // print("这是正常情况下的返回值");
        throw Exception("这是异常情况下的返回值");
      });
    }).handleError((e) {
      // 在这里处理一些错误
      print("出错了");
      // 关闭Loading
      Navigator.of(context).pop();
    })
        // 可以添加rxdart的一些操作
        // .take(1)
        .listen((_) {
      // 执行到这里说明没有错误
      print("没有错误");
      // pop可以穿参数，在上个页面栈获取参数，
      Navigator.of(context).pop();
    });
  }

  @override
  void dispose() {
    _loadingSubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Moon"),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: Center(
        child: GestureDetector(
          child: Text('MoonTabBarPage:${context.watch<Counter>().count}'),
          onTap: () {
            _loadingController.add(1);
            // _loadingController.sink.add(1);
          },
        ),
      ),
    );
  }
}
