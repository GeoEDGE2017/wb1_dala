//Table 4
var app = angular.module('dlSumFisheriesInTheDisApp', [])

app.controller('dlSumFisheriesInTheDisController', ['$scope', '$http', function($scope, $http) {

    $scope.dlEduDistrict;
    $scope.total;
    $scope.iter_tot;
    $scope.district;
    $scope.bs_date;
    $scope.is_edit = false;
    $scope.submitted = false;
    $scope.isLoded = false;


    $scope.changedValue = function getDlData() {
        if ($scope.incident) {
            $http({
                method: "POST",
                url: '/fetch_incident_districts',
                data: angular.toJson({
                    'incident': $scope.incident
                }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.district = "";
                console.log(data);
            })
        }
    }

    $scope.loadData = function(form) {
        $scope.isLoded = true;
        if(form.$valid) {
            $scope.tot_damages = null;
            $scope.is_edit = true;
            $scope.submitted = true;
            $http({
                method: "POST",
                url: '/dl_fetch_total_data',
                data: angular.toJson({
                    'table_name': 'Table_4',
                    'sector':'agri_fisheries',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'is_edit':$scope.is_edit
               }),
            }).success(function(data) {
                $scope.data=data;
                console.log(data);
            })
        }
    }
}]);
