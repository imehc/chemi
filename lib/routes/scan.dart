import 'package:flutter/material.dart';

import '../constant.dart';

class ChimiScan extends StatefulWidget {
  const ChimiScan({Key? key}) : super(key: key);

  @override
  State<ChimiScan> createState() => _ChimiScanState();
}

class _ChimiScanState extends State<ChimiScan> {
  final String _scanResult = 'unknown';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('scan'),
        toolbarHeight: toolbarHeight,
      ),
      body: Center(
        child: Column(
          children: [
            InkWell(
              onTap: () {
                print('tap');
              },
              child: const Text('Scan'),
            ),
            RichText(
              text: TextSpan(
                text: "扫描结果: ",
                children: [
                  TextSpan(text: _scanResult),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
