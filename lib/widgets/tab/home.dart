import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_blog/utils/catch.dart';

class ChemiHome extends StatelessWidget {
  const ChemiHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemBackground,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CupertinoButton(
            onPressed: () async {
              // rootNavigator 为true时，表示在当前页面打开，为false时，表示在新页面打开
              // Navigator.of(context, rootNavigator: true)
              //     .pushNamed("/detail", arguments: "我是传递的参数");
              //测试LocalCache
              await LocalCache.setLocalStorage("desc", "我是一个描述");
              print(LocalCache.getLocalStorage<String>("desc"));
            },
            child: const Icon(Icons.hourglass_empty),
          )
        ],
      ),
    );
  }
}
