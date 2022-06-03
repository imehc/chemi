import 'package:flutter/material.dart';

import '../constant.dart';

class DailyTabBarPage extends StatefulWidget {
  const DailyTabBarPage({Key? key}) : super(key: key);

  @override
  State<DailyTabBarPage> createState() => _DailyTabBarPageState();
}

class _DailyTabBarPageState extends State<DailyTabBarPage>
    with SingleTickerProviderStateMixin {
  //通过 SingleTickerProviderStateMixin 实现的createTicker可以通过传入一个回调方法获得一个Ticker，Ticker就是一个帧定时器，在执行start之后会一直在指定时间内执行回调，多个AnimationController使用TickerProviderStateMixin
  var year = 999;
  // late AnimationController _animationController;
  // late Animation _animation;

  // https://github.com/flutter/samples/blob/master/animations/lib/src/basics/07_tween_sequence.dart
  static const Duration duration = Duration(seconds: 3);
  late final AnimationController controller;
  late final Animation<Color?> animation;
  static final colors = [
    Colors.red,
    Colors.orange,
    Colors.yellow,
    Colors.green,
    Colors.blue,
    Colors.indigo,
    Colors.purple,
  ];

  @override
  void initState() {
    super.initState();
    // _animationController = AnimationController(
    //   vsync: this,
    //   duration: const Duration(microseconds: 300),
    // );
    // _animationController.addListener(() {
    //   setState(() {});
    // });
    // _animation = TweenSequence([
    //   // 这是一个动画序列，weight表示权重
    //   TweenSequenceItem(
    //     tween: Tween(
    //       begin: 50.0,
    //       end: 100.0,
    //     ).chain(CurveTween(curve: Curves.easeOut)),
    //     weight: 50,
    //   ),
    //   TweenSequenceItem(
    //     tween: Tween(
    //       begin: 100.0,
    //       end: 150.0,
    //     ).chain(CurveTween(curve: Curves.easeOut)),
    //     weight: 50,
    //   ),
    // ]).animate(_animationController);

    final sequenceItems = <TweenSequenceItem<Color?>>[];
    for (var i = 0; i < colors.length; i++) {
      final beginColor = colors[i];
      final endColor = colors[(i + 1) % colors.length];
      final weight = 1 / colors.length;

      sequenceItems.add(
        TweenSequenceItem<Color?>(
          tween: ColorTween(begin: beginColor, end: endColor),
          weight: weight,
        ),
      );
    }
    controller = AnimationController(duration: duration, vsync: this);
    animation = TweenSequence<Color?>(sequenceItems).animate(controller);
  }

  @override
  void dispose() {
    // _animationController.dispose();
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Daily"),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: Container(
        alignment: Alignment.center,
        child: Column(
          children: [
            TweenAnimationBuilder(
              duration: const Duration(milliseconds: 500),
              tween: IntTween(
                begin: 0,
                end: year,
              ),
              builder: (BuildContext context, int value, Widget? child) {
                return Padding(
                  padding: const EdgeInsets.only(top: 10),
                  child: Text(
                    value.toString(),
                    style: const TextStyle(
                      fontSize: 30,
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 20),
            // InkWell(
            //   onTap: () {
            //     // isDismissed 动画是否停止
            //     if (_animationController.isDismissed) {
            //       // 运行这个动画
            //       _animationController.forward();
            //     } else {
            //       // 反向运行动画
            //       _animationController.reverse();
            //     }
            //   },
            //   child: Container(
            //     width: _animation.value,
            //     height: _animation.value,
            //     decoration: const BoxDecoration(
            //       shape: BoxShape.circle,
            //       color: Colors.blue,
            //     ),
            //   ),
            // ),
            AnimatedBuilder(
              animation: animation,
              builder: (context, child) {
                return MaterialButton(
                  color: animation.value,
                  onPressed: () async {
                    await controller.forward();
                    controller.reset();
                  },
                  child: child,
                );
              },
            )
          ],
        ),
      ),
    );
  }
}
