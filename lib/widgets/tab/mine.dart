import 'package:flutter/cupertino.dart';

class ChemiMine extends StatelessWidget {
  const ChemiMine({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      backgroundColor: CupertinoColors.systemBackground,
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Mine'),
      ),
      child: Center(
          child: GestureDetector(
              onTap: () => Navigator.of(context, rootNavigator: true)
                  .pushNamed("/login"),
              child: const Text("go login"))),
    );
  }
}
