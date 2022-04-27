import 'package:flutter/material.dart';

class ChimiScan extends StatefulWidget {
  const ChimiScan({Key? key}) : super(key: key);

  @override
  State<ChimiScan> createState() => _ChimiScanState();
}

class _ChimiScanState extends State<ChimiScan> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('扫描'),
      ),
      body: const Center(
        child: Text('扫描'),
      ),
    );
  }
}
