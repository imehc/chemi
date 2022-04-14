import 'package:flutter/cupertino.dart';

import '../page_info.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemBackground,
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Home'),
      ),
      child: Center(
          child: CupertinoButton(
        onPressed: () {
          // rootNavigator is a global key that can be used to access the root
          Navigator.of(context, rootNavigator: true).push(
            CupertinoPageRoute(
              builder: (context) => const InfoPage(),
            ),
          );
        },
        child: const Text("点击详情"),
      )),
    );
  }
}
