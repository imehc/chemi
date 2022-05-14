import 'package:flutter/material.dart';
import 'package:chemi/constant.dart';
import 'package:scan/scan.dart';

class CreameScanCode extends StatefulWidget {
  const CreameScanCode({Key? key}) : super(key: key);

  @override
  State<CreameScanCode> createState() => _CreameScanCodeState();
}

class _CreameScanCodeState extends State<CreameScanCode> {
  ScanController controller = ScanController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: ScanView(
          controller: controller,
          scanAreaScale: .7,
          scanLineColor: AppConstantConfig.primaryColor,
          onCapture: (data) {
            Navigator.pop(context, data);
          },
        ),
      ),
    );
  }
}
