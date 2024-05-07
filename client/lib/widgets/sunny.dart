import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../constant.dart';
import '../provider.dart';
import '../routes/routes.dart';
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
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            InkWell(
              onTap: () {
                // 延迟五秒执行
                Future.delayed(const Duration(seconds: 5), () {
                  LocalNotification.send(
                    '测试标题',
                    '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
                  );
                });
              },
              child: const Text('SunnyTabBarPage'),
            ),
            const SizedBox(height: 20),
            Hero(
              tag: 'HeroAnimation1',
              child: GestureDetector(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(
                      builder: (context) => const ChemiHeroAnimation(),
                    ),
                  );
                },
                child: Container(
                  height: 100,
                  width: 100,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    // 渐变
                    gradient: const LinearGradient(
                      colors: [
                        AppConstantConfig.secondaryColor,
                        AppConstantConfig.primaryColor,
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                  ),
                  child: const Text(""),
                ),
              ),
            ),
            const SizedBox(
              height: 20,
            ),

            /// Extracted as a separate widget for performance optimization.
            /// As a separate widget, it will rebuild independently from [MyHomePage].
            ///
            /// This is totally optional (and rarely needed).
            /// Similarly, we could also use [Consumer] or [Selector].

            /// Calls `context.watch` to make [Count] rebuild when [Counter] changes.
            GestureDetector(
              onTap: () => context.read<Counter>().increment(),
              child: Text(
                'You have pushed the button this many times:${context.watch<Counter>().count}',
                key: const Key('counterState'),
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
