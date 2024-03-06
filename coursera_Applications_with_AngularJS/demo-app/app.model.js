(function () {
    'use strict';
    angular.module('NameCalculator', [])
        .controller('NameCalculatorController', function ($scope) {
            $scope.name = '';
            $scope.text = '';

            $scope.getLenght = (names) => {
                const splitNames = names.split(',').filter(el => el.length > 0).length
                if (splitNames === 0 ) {
                    $scope.text = 'Пожалуйста, сначала введите данные'
                } else if  (splitNames <= 3) {
                    $scope.text = 'Наслаждайтесь!'
                } else if (splitNames > 3 ) {
                    $scope.text = 'Слишком много!'
                } else {
                    return
                }
  
            }
        });
})();
