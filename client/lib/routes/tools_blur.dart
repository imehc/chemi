import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_blurhash/flutter_blurhash.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../constant.dart';

class ChemiBlur extends StatelessWidget {
  final String title;
  const ChemiBlur(this.title, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        toolbarHeight: AppConstantConfig.toolbarHeight,
      ),
      body: Card(
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
            child: CachedNetworkImage(
              placeholder: (context, url) => const BlurHash(
                // TODO: 需要确定图片的hash值 https://github.com/fluttercommunity/flutter_blurhash/issues/36#issuecomment-1025091312
                hash: 'LBJs,%L~}8?b8w-qobE1HCs;K4Ip',
              ),
              errorWidget: (context, url, error) => const Icon(Icons.error),
              imageUrl:
                  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-reindeer-dog-1170x780.jpg",
              fit: BoxFit.cover,
            ),
            // child: const SizedBox.expand(
            //   child: Center(
            //     child: AspectRatio(
            //       aspectRatio: 1.6,
            //       child: BlurHash(
            //         imageFit: BoxFit.fitWidth,
            //         duration: Duration(seconds: 4),
            //         curve: Curves.bounceInOut,
            //         hash: 'LHA-Vc_4s9ad4oMwt8t7RhXTNGRj',
            //         // image:
            //         //     'https://images.unsplash.com/photo-1486072889922-9aea1fc0a34d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW91dGFpbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            //       ),
            //     ),
            //   ),
            // ),
            // child: CachedNetworkImage(
            //   imageUrl:
            //       "https://gratisography.com/wp-content/uploads/2024/01/gratisography-reindeer-dog-1170x780.jpg",
            //   placeholder: (context, url) => const CircularProgressIndicator(),
            //   errorWidget: (context, url, error) => const Icon(Icons.error),
            // ),
          );
        }),
      ),
    );
  }
}
