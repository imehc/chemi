import 'dart:io';
import 'dart:typed_data';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:image_gallery_saver/image_gallery_saver.dart';
import 'package:permission_handler/permission_handler.dart';

class HandleFileUtils {
  static saveImageToLocal(Uint8List bytes) async {
    if (Platform.isIOS) {
      var status = await Permission.photos.status;
      if (status.isDenied) {
        Map<Permission, PermissionStatus> statuses =
            await [Permission.photos].request();
        if (statuses[Permission.photos] == PermissionStatus.permanentlyDenied) {
          _fail();
        }
        if (statuses[Permission.photos] == PermissionStatus.granted) {
          _save(bytes);
        }
        if (statuses[Permission.photos] == PermissionStatus.granted) {
          _fail();
        }
      }
      if (status.isPermanentlyDenied) {
        _fail();
      }
      if (status.isGranted) {
        _save(bytes);
      }
    } else if (Platform.isAndroid) {
      var status = await Permission.storage.status;
      if (status.isDenied) {
        Map<Permission, PermissionStatus> statuses =
            await [Permission.storage].request();
        if (statuses[Permission.storage] ==
            PermissionStatus.permanentlyDenied) {
          _fail();
        }
        if (statuses[Permission.storage] == PermissionStatus.granted) {
          _save(bytes);
        }
        if (statuses[Permission.storage] == PermissionStatus.denied) {
          _fail();
        }
      }
      if (status.isGranted) {
        _save(bytes);
      }
      if (status.isPermanentlyDenied) {
        _fail();
      }
    }
  }

  static _save(Uint8List bytes) async {
    final result = await ImageGallerySaver.saveImage(bytes,
        name: DateTime.now().toIso8601String());
    if (result['isSuccess']) {
      Fluttertoast.showToast(
        msg: "保存成功",
        gravity: ToastGravity.CENTER,
      );
    } else {
      Fluttertoast.showToast(
        msg: "保存失败",
        gravity: ToastGravity.CENTER,
      );
    }
  }

  static _fail() {
    Fluttertoast.showToast(
      msg: "您已拒绝该权限,保存失败",
      gravity: ToastGravity.CENTER,
    );
  }
}
