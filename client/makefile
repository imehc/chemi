build-runner:
	# 生成对应代码 --delete-conflicting-outputs 可选，会在生成代码冲突的时候，删除原来的代码，重新生成
	flutter pub run build_runner clean && flutter pub run build_runner build --delete-conflicting-outputs
build-runner-watch:
	# 监听文件的修改自动生成代码
	flutter pub run build_runner watch --delete-conflicting-outputs
gen-l10n:
	# 生成多语言文件,在 .dart_tool/flutter_gen/gen_l10n 可以看到生成的文件
	flutter gen-l10n
gen-launcher-icons-init:
	# 生成图标配置文件
	flutter pub run flutter_launcher_icons:generate
gen-launcher-icons:
	# 替换图标
	flutter pub run flutter_launcher_icons -f flutter_launcher_icons.yaml
gen-native-spalsh:
	# 生成启动页
	dart run flutter_native_splash:create
gen-assets:
	# install https://pub.dev/packages/spider#installation
	@if ! [ -x "$$(command -v spider)" ]; then \
		dart pub global activate spider; \
	fi && \
	spider build --watch