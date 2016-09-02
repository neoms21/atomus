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
            var dataArr = d["0"].split(',');
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

app.component('csvAtomus', {
    templateUrl: '/Atomus/upload/csv.component.html',
    controllerAs: 'model',
    controller: ['$scope', csvController],
    bindings: {}
});