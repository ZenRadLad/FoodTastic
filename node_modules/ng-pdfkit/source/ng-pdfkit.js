(function () {
    
    var app = angular.module('ngPDFKit', []);

    PDFDocument.prototype.imageFromLink = function (url, x, y, options, cb) {
        var document = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            if (this.status == 200) {
                document.image(new buffer.Buffer(this.response), x, y, options);
                cb(null, document);
            } else {
                cb(e);
            }
        };
        xhr.send();
    }

    app.constant('PDFKit', PDFDocument);

} ())

