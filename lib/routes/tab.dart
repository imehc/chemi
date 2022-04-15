import 'package:flutter/cupertino.dart';
import 'package:flutter_blog/widgets/tab/home.dart';
import 'package:flutter_blog/widgets/tab/mine.dart';

class ChemiTabbar extends StatefulWidget {
  const ChemiTabbar({Key? key}) : super(key: key);

  @override
  State<ChemiTabbar> createState() => _ChemiTabbarState();
}

class _ChemiTabbarState extends State<ChemiTabbar> {
  late int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return CupertinoTabScaffold(
        tabBar: CupertinoTabBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() => _currentIndex = index);
          },
          activeColor: const Color(0xFF2196FF),
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(
                CupertinoIcons.home,
              ),
            ),
            BottomNavigationBarItem(
              icon: Icon(
                CupertinoIcons.profile_circled,
              ),
            ),
          ],
        ),
        tabBuilder: (BuildContext context, int index) {
          return CupertinoTabView(
            builder: (BuildContext context) {
              switch (index) {
                case 0:
                  return const ChemiHome();
                case 1:
                  return const ChemiMine();
                default:
                  return const ChemiHome();
              }
            },
          );
        });
  }
}
