import 'package:flutter_blog/person_api_client.dart';
import 'package:flutter_neumorphic/flutter_neumorphic.dart';

class FullSampleHomePage extends StatefulWidget {
  const FullSampleHomePage({Key? key}) : super(key: key);

  @override
  State<FullSampleHomePage> createState() => _FullSampleHomePageState();
}

class _FullSampleHomePageState extends State<FullSampleHomePage> {
  final _client = PersonApiClient();
  List<String>? _list;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Flutter"),
      ),
      backgroundColor: Colors.grey[300],
      body: Center(
        child: Column(
          children: [
            NeumorphicText(
              "Flutter",
              textStyle: NeumorphicTextStyle(
                  fontSize: 80, fontWeight: FontWeight.w900),
              style: NeumorphicStyle(
                  depth: 3,
                  lightSource: LightSource.left,
                  color: Colors.grey[200]),
            ),
            NeumorphicIcon(
              Icons.public,
              size: 180,
              style: NeumorphicStyle(
                depth: 3,
                lightSource: LightSource.left,
                color: Colors.grey[200],
              ),
            ),
            Neumorphic(
              margin:
                  const EdgeInsets.only(left: 8, right: 8, top: 2, bottom: 4),
              style: NeumorphicStyle(
                  depth: NeumorphicTheme.embossDepth(context),
                  boxShape: const NeumorphicBoxShape.stadium(),
                  color: Colors.grey[200]),
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 18),
              child: const TextField(
                decoration:
                    InputDecoration.collapsed(hintText: 'NeumorphicTextField'),
              ),
            ),
            TextButton(
              onPressed: () async {
                final payload = await _client.getClientsApi().getClients();
                setState(() => _list = payload.data!.asList());
              },
              child: const Text("TextButton"),
            ),
            if (_list != null)
              Expanded(
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                  ),
                  itemCount: _list!.length,
                  itemBuilder: (BuildContext context, int index) {
                    return GestureDetector(
                      onTap: () async {
                        print(_list![index]);
                      },
                      child: Text(_list![index]),
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
