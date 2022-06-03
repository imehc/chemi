import 'package:flutter/material.dart';

import '../constant.dart';

class ChemiHeroAnimation extends StatefulWidget {
  const ChemiHeroAnimation({Key? key}) : super(key: key);

  @override
  State<ChemiHeroAnimation> createState() => _ChemiHeroAnimationState();
}

class _ChemiHeroAnimationState extends State<ChemiHeroAnimation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Row(
        children: [
          Hero(
            tag: 'HeroAnimation1',
            child: ClipOval(
              child: Container(
                height: 200,
                width: 200,
                decoration: const BoxDecoration(
                  // 渐变
                  gradient: LinearGradient(
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
        ],
      ),
    );
  }
}
