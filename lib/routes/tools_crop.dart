import 'dart:typed_data';

import 'package:crop_your_image/crop_your_image.dart';
import 'package:flutter/material.dart';

// ignore: implementation_imports
import 'package:flutter_screenutil/src/size_extension.dart' show SizeExtension;
import 'package:image_picker/image_picker.dart';

import '../constant.dart';

class ChemiCrop extends StatefulWidget {
  final String title;

  const ChemiCrop(this.title, {Key? key}) : super(key: key);

  @override
  State<ChemiCrop> createState() => _ChemiCropState();
}

class _ChemiCropState extends State<ChemiCrop> {
  /// 图片的流
  Uint8List? imagebytes;
  bool isCrop = false;
  bool isButtonDisabled = false;
  final imagePicker = ImagePicker();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: Builder(builder: (context) {
        final _cropController = CropController();
        return SizedBox(
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
                child: Builder(builder: (context) {
                  return Container(
                    padding: EdgeInsets.all(
                      AppConstantConfig.horizontalPaddingSize.w,
                    ),
                    width: MediaQuery.of(context).size.width,
                    height: MediaQuery.of(context).size.height / 2,
                    child: imagebytes == null
                        ? const Center(child: Text('No image selected.'))
                        : isCrop
                            ? Image.memory(imagebytes!)
                            : Crop(
                                image: imagebytes!,
                                controller: _cropController,
                                // aspectRatio: AppConstantConfig.aspectRatio,
                                onCropped: (buffer) =>
                                    setState(() => imagebytes = buffer),
                                initialSize: 1,
                                baseColor: Colors.black,
                                maskColor: Colors.black.withAlpha(150),
                                cornerDotBuilder: (size, edgeAlignment) =>
                                    const DotControl(
                                  color: Colors.white54,
                                ),
                                interactive: true,
                              ),
                  );
                }),
              ),
              if (imagebytes != null)
                ElevatedButton(
                  onPressed: isButtonDisabled
                      ? null
                      : () {
                          _cropController.crop();
                          setState(() {
                            isCrop = true;
                            isButtonDisabled = true;
                          });
                        },
                  child: const Text("compile"),
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(
                      AppConstantConfig.secondaryColor,
                    ),
                  ),
                ),
              ElevatedButton(
                onPressed: () => openLocalImage(),
                child: const Text('Crop using photo albums'),
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text('Crop using camera albums'),
              ),
            ],
          ),
        );
      }),
    );
  }

  void openLocalImage() async {
    if (imagebytes != null) imagebytes = null;
    if (isCrop == true) isCrop = false;
    if (isButtonDisabled = true) isButtonDisabled = false;
    final imageFile = await imagePicker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 80,
      maxWidth: 1024,
    );
    imagebytes = await imageFile?.readAsBytes();
    if (imagebytes == null) {
      return;
    } else {
      setState(() {});
    }
  }
}
