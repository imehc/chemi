import 'package:flutter/material.dart';

class AppConstantConfig {
  /// 主要色: Color.fromRGBO(67, 142, 219, 1)
  static const Color primaryColor = Color.fromRGBO(67, 142, 219, 1);

  /// 次要色: Color.fromRGBO(192, 210, 240, 1)
  static const Color secondaryColor = Color.fromRGBO(192, 210, 240, 1);

  /// 绿
  static const Color green = Color.fromARGB(255, 165, 238, 165);

  /// Colors.white
  static const Color navigationBarColor = Colors.white;

  /// 主要文字: 14
  static const double primaryFontSize = 14;

  /// 次级文字: 12
  static const double secondaryFontSize = 12;

  /// 30
  static const double toolsTextSize = 30;

  /// card radius: 10
  static const double cardRadius = 10;

  /// margin size: 10
  static const double horizontalMarginSize = 10;

  /// 20
  static const double verticalMarginSize = 20;

  /// padding size: 10
  static const double horizontalPaddingSize = 10;

  /// 10
  static const double verticalPaddingSize = 10;

  /// appbar Height: 48
  static const double toolbarHeight = 48;

  /// aspectRatio: 1.0
  static const double aspectRatio = 1.0;

  /// 主题颜色
  static const MaterialColor themeBlue = MaterialColor(
    0xFF438EDB,
    <int, Color>{
      50: Color(0xFF438EDB),
      100: Color(0xFF438EDB),
      200: Color(0xFF438EDB),
      300: Color(0xFF438EDB),
      400: Color(0xFF438EDB),
      500: Color(0xFF438EDB),
      600: Color(0xFF438EDB),
      700: Color(0xFF438EDB),
      800: Color(0xFF438EDB),
      900: Color(0xFF438EDB),
    },
  );
}
