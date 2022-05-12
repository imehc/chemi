import 'package:flutter/material.dart';
// ignore: implementation_imports
import 'package:flutter_screenutil/src/size_extension.dart' show SizeExtension;

import '../constant.dart';

class ChemiScan extends StatefulWidget {
  final String title;
  const ChemiScan(this.title, {Key? key}) : super(key: key);

  @override
  State<ChemiScan> createState() => _ChemiScanState();
}

class _ChemiScanState extends State<ChemiScan> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: Column(
          children: [
            Card(
              margin: EdgeInsets.symmetric(
                horizontal: AppConstantConfig.horizontalMarginSize.w,
                vertical: AppConstantConfig.verticalMarginSize.w,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(AppConstantConfig.cardRadius.r),
                ),
              ),
              child: Container(
                padding: EdgeInsets.all(
                  AppConstantConfig.horizontalPaddingSize.w,
                ),
                width: MediaQuery.of(context).size.width,
                height: MediaQuery.of(context).size.height / 2,
                child: Text(
                  "unknow",
                  style: TextStyle(
                    fontSize: AppConstantConfig.primaryFontSize.sp,
                  ),
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {},
              child: const Text('MobileScanner with Controller'),
            ),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Use camera scan code'),
            ),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Use local image scan code'),
            ),
          ],
        ),
      ),
    );
  }
}
