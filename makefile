VERSION = $(shell cat VERSION)

SRC_DIR = lib
BUILD_DIR = build

FILES = dominator dominator.jqtouch

COMPRESSOR_BIN = java -jar vendor/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar

# Build dominator.js and extensions
build: clean
	mkdir -p ${BUILD_DIR}

	echo "Building..."

	for file in ${FILES} ; do \
		echo "  => ${BUILD_DIR}/$$file.${VERSION}.js" ; \
		cp ${SRC_DIR}/$$file.js ${BUILD_DIR}/$$file.${VERSION}.js ; \
		echo "  => ${BUILD_DIR}/$$file.${VERSION}.min.js" ; \
		${COMPRESSOR_BIN} ${SRC_DIR}/$$file.js -o ${BUILD_DIR}/$$file.${VERSION}.min.js ; \
	done

# Clean up the build directory
clean:
	rm -rf ${BUILD_DIR}

.SILENT: build clean
