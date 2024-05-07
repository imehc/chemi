import 'package:chemi/helper.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

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
        actions: [
          DropdownButtonHideUnderline(
            child: DropdownButton2(
              customButton: Padding(
                padding: EdgeInsets.only(
                  right: 15.0.w,
                  bottom: 12.0.h,
                  top: 12.h,
                ),
                child: const Icon(Icons.more_horiz),
              ),
              items: [
                ...MenuItems.firstItems.map(
                  (item) => DropdownMenuItem<MenuItem>(
                    value: item,
                    child: MenuItems.buildItem(item),
                  ),
                ),
                const DropdownMenuItem<Divider>(
                    enabled: false, child: Divider()),
                ...MenuItems.secondItems.map(
                  (item) => DropdownMenuItem<MenuItem>(
                    value: item,
                    child: MenuItems.buildItem(item),
                  ),
                ),
              ],
              onChanged: (value) {
                MenuItems.onChanged(context, value! as MenuItem);
              },
              dropdownStyleData: DropdownStyleData(
                width: 160,
                padding: const EdgeInsets.symmetric(
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(4),
                  // color: Colors.white,
                ),
                offset: const Offset(0, 8),
              ),
              menuItemStyleData: MenuItemStyleData(
                customHeights: [
                  ...List<double>.filled(MenuItems.firstItems.length, 48),
                  8,
                  ...List<double>.filled(MenuItems.secondItems.length, 48),
                ],
                padding: const EdgeInsets.only(left: 16, right: 16),
              ),
            ),
          ),
        ],
      ),
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: const Center(
          child: Text("开发中..."),
        ),
      ),
    );
  }
}

class MenuItem {
  final String text;
  final IconData icon;

  const MenuItem({
    required this.text,
    required this.icon,
  });
}

class MenuItems {
  static const List<MenuItem> firstItems = [_local, _link];
  // 加横线
  static const List<MenuItem> secondItems = [_save];

  static const _local = MenuItem(text: '本地', icon: Icons.smartphone_sharp);
  static const _link = MenuItem(text: '链接', icon: Icons.link);
  static const _save = MenuItem(text: '保存', icon: Icons.save);

  static Widget buildItem(MenuItem item) {
    return Row(
      children: [
        Icon(
          item.icon,
          // color: Colors.white,
          size: 20.r,
        ),
        const SizedBox(
          width: 10,
        ),
        Text(
          item.text,
          style: const TextStyle(
            // color: Colors.white,
            fontSize: AppConstantConfig.primaryFontSize,
          ),
        ),
      ],
    );
  }

  static onChanged(BuildContext context, MenuItem item) async {
    FilePickerResult? filePickerResult;

    switch (item) {
      case MenuItems._local:
        filePickerResult = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: ['pdf'],
          withData: true, //流
        );
        if (filePickerResult != null) {
          logger.i("======$filePickerResult");
        } else {
          logger.i(11111111111);
        }
        break;
      case MenuItems._link:
        //Do something
        break;
      case MenuItems._save:
        //Do something
        break;
    }
  }
}
