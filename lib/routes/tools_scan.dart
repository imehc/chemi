import 'package:flutter/material.dart';
// ignore: implementation_imports
import 'package:flutter_screenutil/src/size_extension.dart' show SizeExtension;
import 'package:fluttertoast/fluttertoast.dart';

import '../constant.dart';
import '../utils/utils.dart';

class ChemiScan extends StatefulWidget {
  final String title;
  const ChemiScan(this.title, {Key? key}) : super(key: key);

  @override
  State<ChemiScan> createState() => _ChemiScanState();
}

class _ChemiScanState extends State<ChemiScan> {
  String qrcode = "unknow";
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
                // 选中文字
                child: SelectableText(
                  qrcode,
                  onTap: () {
                    if (_isUrl(qrcode)) {
                      UrlUtil.open(qrcode);
                    }
                  },
                  style: TextStyle(
                      fontSize: AppConstantConfig.primaryFontSize,
                      color: _isUrl(qrcode)
                          ? AppConstantConfig.primaryColor
                          : Colors.black),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              mainAxisSize: MainAxisSize.max,
              children: [
                TextButton(
                  onPressed: () async {
                    final result = await Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => const CreameScanCode(),
                      ),
                    );
                    if (result != null) {
                      setState(() => qrcode = result);
                    }
                  },
                  child: const Text('Use camera scan code'),
                ),
                TextButton(
                  onPressed: () async {
                    final result = await LocalImagesScanCode.start();
                    if (result != null) {
                      setState(() => qrcode = result);
                    } else {
                      Fluttertoast.showToast(
                        msg: "无法识别",
                        gravity: ToastGravity.CENTER,
                      );
                    }
                  },
                  child: const Text('Use local image scan code'),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  _isUrl(String str) {
    RegExp reg = RegExp(r"(http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?)");
    if (reg.hasMatch(str)) {
      return true;
    } else {
      return false;
    }
  }
}
