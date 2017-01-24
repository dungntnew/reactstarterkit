function canvasToDataUrl(canvas) {
	try {
	  return canvas.toDataURL();
	} catch(e) {
		try {
		  return canvas.toDataURL("image/jpeg");
		} catch(e) {
		  console.error('canvas toDataURL not support, ', e)
		}
	}
}

function localFileToDataUrl(file, cb) {
  let reader = new FileReader()

  reader.onloadend = ()=> {
	cb(reader.result)
  }
  reader.readAsDataURL(file)
}

function isSupport() {
	return true;
}

module.exports = {
	localFileToDataUrl,
	canvasToDataUrl,
	isSupport,
};