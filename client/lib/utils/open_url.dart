import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

class UrlUtil {
  static open(String url) async {
    final _url = Uri.parse(url);
    if (await canLaunchUrl(_url)) {
      await launchUrl(_url);
    } else {
      Fluttertoast.showToast(
        msg: "打开失败",
        gravity: ToastGravity.CENTER,
      );
    }
  }
}
