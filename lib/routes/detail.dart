import 'package:flutter/cupertino.dart';

class ChemiDetail extends StatelessWidget {
  const ChemiDetail({Key? key, arguments}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // ModalRoute 是一个抽象类，它提供了一个抽象方法，可以获取当前路由的路径。
    String tmp = ModalRoute.of(context)!.settings.arguments.toString();
    return CupertinoPageScaffold(
        backgroundColor: CupertinoColors.systemBackground,
        navigationBar: const CupertinoNavigationBar(
          middle: Text("Detail"),
        ),
        child: Center(
          child: GestureDetector(
            child: Text(
              tmp,
              style: const TextStyle(color: CupertinoColors.black),
            ),
            onTap: () {
              Navigator.of(context).pop();
            },
          ),
        ));
  }
}
