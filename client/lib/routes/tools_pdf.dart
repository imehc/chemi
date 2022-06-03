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
                padding: EdgeInsets.only(right: 15.0.w),
                child: const Icon(Icons.more_horiz),
              ),
              customItemsIndexes: const [3],
              customItemsHeight: 8,
              items: [
                ...MenuItems.firstItems.map(
                  (item) => DropdownMenuItem<MenuItem>(
                    value: item,
                    child: MenuItems.buildItem(item),
                  ),
                ),
                // const DropdownMenuItem<Divider>(
                //   enabled: false,
                //   child: Divider(),
                // ),
                // ...MenuItems.secondItems.map(
                //   (item) => DropdownMenuItem<MenuItem>(
                //     value: item,
                //     child: MenuItems.buildItem(item),
                //   ),
                // ),
              ],
              onChanged: (value) async {
                MenuItems.onChanged(context, value as MenuItem);
                // switch (value) {
                //   case MenuItems.local:
                //     _filePickerResult = await FilePicker.platform.pickFiles(
                //       type: FileType.custom,
                //       allowedExtensions: ['pdf'],
                //       withData: true, //流
                //     );
                //     print("======$_filePickerResult");
                //     break;
                //   case MenuItems.link:
                //     //Do something
                //     print("link");
                //     break;
                //   case MenuItems.save:
                //     print("save");
                //     break;
                // }
              },
              itemHeight: 40,
              itemPadding: const EdgeInsets.only(left: 16, right: 16),
              dropdownWidth: 160,
              dropdownPadding: const EdgeInsets.symmetric(vertical: 6),
              dropdownDecoration: BoxDecoration(
                borderRadius: BorderRadius.circular(4),
                color: AppConstantConfig.primaryColor,
              ),
              dropdownElevation: 8,
              offset: const Offset(0, 8),
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
  static const List<MenuItem> firstItems = [_local, _link, _save];
  // 加横线
  static const List<MenuItem> secondItems = [];

  static const _local = MenuItem(text: '本地', icon: Icons.smartphone_sharp);
  static const _link = MenuItem(text: '链接', icon: Icons.link);
  static const _save = MenuItem(text: '保存', icon: Icons.save);

  static Widget buildItem(MenuItem item) {
    return Row(
      children: [
        Icon(item.icon, color: Colors.white, size: 20.r),
        const SizedBox(
          width: 10,
        ),
        Text(
          item.text,
          style: const TextStyle(
            color: Colors.white,
            fontSize: AppConstantConfig.primaryFontSize,
          ),
        ),
      ],
    );
  }

  static onChanged(BuildContext context, MenuItem item) async {
    FilePickerResult? _filePickerResult;

    switch (item) {
      case MenuItems._local:
        _filePickerResult = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: ['pdf'],
          withData: true, //流
        );
        if (_filePickerResult != null) {
          print("======$_filePickerResult");
        } else {
          print(11111111111);
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
