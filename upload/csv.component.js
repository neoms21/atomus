function csvController($scope) {

    var model = this;

    model.$onInit = function () {
        model.csv = {
            result: [],
            callback: function (data) {
                // just to remove console error, no functionality needed as of now
            }
        };
        model.headers = [];
        model.data = [];
        model.row = 0;
        model.col = 0;
        model.result = "";
    };

    $scope.$watch('model.csv.result', function (newValue, oldValue) {
        if (newValue.length === 0)
            return;

        model.headers = newValue[0]["0"].split(',');
        _.each(_.rest(newValue, 1), function (d) {
            var obj = {};

            var dataArr = splitStr(d["0"]);
            var index = 0;
            _.each(model.headers, function (h) {
                obj[h] = dataArr[index];
                index++;
            });
            model.data.push(obj);
        });
    });

    model.getData = function () {
        var rowToLookIn = model.data[model.row - 1];
        var colToLook = model.headers[model.col - 1];
        model.result = rowToLookIn[colToLook];
    }
}

// from http://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript
// - Should GO through bit more testing and move to utilities
function splitStr (str) {
    var result = [];
    var strBuf = '';
    var start = 0;
    var marker = false;
    for (var i = 0; i < str.length; i++) {

        if (str[i] === '"') {
            marker = !marker;
        }
        if (str[i] === ',' && !marker) {
            result.push(str.substr(start, i - start));
            start = i + 1;
        }
    }
    if (start <= str.length) {
        result.push(str.substr(start, i - start));

    }
    return result;
};

app.component('csvAtomus', {
    templateUrl: '/Atomus/upload/csv.component.html',
    controllerAs: 'model',
    controller: ['$scope', csvController],
    bindings: {}
});