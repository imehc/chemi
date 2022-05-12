import 'package:flutter/material.dart';

import '../constant.dart';

class ChemiPdf extends StatefulWidget {
  final String title;
  const ChemiPdf(this.title, {Key? key}) : super(key: key);

  @override
  State<ChemiPdf> createState() => _ChemiPdfState();
}

class _ChemiPdfState extends State<ChemiPdf> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        toolbarHeight: AppConstantConfig.toolbarHeight,
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
