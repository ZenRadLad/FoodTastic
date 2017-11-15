ng-pdfkit
=========

An Angular wrapper for PDFKit

## Installing

Install via npm

```npm install ng-pdfkit --save```

Load in html

```<script src="ng-pdfkit.js"></script>```

Add module in Angular

```angular.module('app', ['ngPDFKit'])```

## Usage

Creating PDF from controller function

```js
angular.module('app', ['ngPDFKit']).controller('MainController', function ($sce, $scope, PDFKit) {

    $scope.url = null;

    $scope.generatePDF = function () {

        var document = new PDFKit();

        var stream = document.pipe(new blobStream());

        document.imageFromLink('/images/awesome.jpg', 320, 145, { width: 200, height: 100 }, function () {

            document.fontSize(12)
                .fillColor('black')
                .text('Test text');

            document.end();

            stream.on('finish', function () {
                var url = stream.toBlobURL('application/pdf');
                $scope.url = $sce.trustAsResourceUrl(url);
                $scope.$digest();
            })
            
        })

    }

});
```
Showing in html frame

```<iframe ng-src="{{ url }}" style="width: 100%; height: 400px;"></iframe>```

## Todo

- Implements Buffer and Blob Stream functionalities
- Create helpers methods to add image, generate url, blob.
- Implements tests