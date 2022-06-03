import 'package:image_picker/image_picker.dart';
import 'package:scan/scan.dart';

class LocalImagesScanCode {
  static start() async {
    final result = await ImagePicker().pickImage(source: ImageSource.gallery);
    if (result != null) {
      String? str = await Scan.parse(result.path);
      if (str != null && str.trim().isNotEmpty) {
        return str;
      } else {
        return null;
      }
    }
  }
}
