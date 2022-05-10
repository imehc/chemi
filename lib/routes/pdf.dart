import 'package:flutter/material.dart';

import '../constant.dart';

class ChimiPdf extends StatefulWidget {
  const ChimiPdf({Key? key}) : super(key: key);

  @override
  State<ChimiPdf> createState() => _ChimiPdfState();
}

class _ChimiPdfState extends State<ChimiPdf> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('pdf'),
        toolbarHeight: toolbarHeight,
      ),
      body: Center(
        child: InkWell(
          onTap: () {
            print('tap');
          },
          child: const Text('Pdf'),
        ),
      ),
    );
  }
}
