import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

class UrlUtil {
  static open(String url) async {
    final url0 = Uri.parse(url);
    if (await canLaunchUrl(url0)) {
      await launchUrl(url0);
    } else {
      Fluttertoast.showToast(
        msg: "打开失败",
        gravity: ToastGravity.CENTER,
      );
    }
  }
}
