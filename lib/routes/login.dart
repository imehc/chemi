import 'package:flutter/cupertino.dart';

class ChemiLogin extends StatelessWidget {
  const ChemiLogin({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Login'),
        previousPageTitle: 'Mine',
      ),
      child: Center(child: Text("LoginPage")),
    );
  }
}
