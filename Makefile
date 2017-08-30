build:
	rm -rf dashboard.tar
	rm -rf build-package

	webpack
	grunt

	mkdir -p build-package/data/
	cp -rf css build-package/
	cp -rf js build-package/
	cp -rf bin build-package/
	cp index.html build-package/

	tar --create --file=dashboard.tar build-package

deploy:
	scp dashboard.tar wsuwp-indie-prod-01:/home/ucadmin/
