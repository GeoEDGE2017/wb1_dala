//Table 6
var app = angular.module('dlSummTouBusiFaciNatApp', ['underscore'])

app.controller('dlSummTouBusiFaciNatController', function($scope, $http, $parse, _) {

    $scope.data;
    $scope.incident;
    $scope.provinces = ['a', 'b'];
    $scope.table;


    $scope.fetchData = function(){

            if($scope.incident){
            $http({
            method: "POST",
            url: '/dl_fetch_district_disagtn',
            data: angular.toJson({
            'table_name':  'Table_6',
            'sector': 'tourism',
            'com_data': {

                    'incident': $scope.incident,
                  },
                   }),
            }).success(function(data) {

            $scope.data = data.tourism.Table_6;

            $scope.provinces = Object.keys($scope.data);
            console.log('load ', Object.keys($scope.data));
            console.log($scope.data);
            console.log($scope.provinces);
            $scope.makeTable();

            }).error(function(err){
                $scope.data = null;

                $scope.provinces = null;

            })

            }
    }

    $scope.makeTable = function(){
        if($scope.data != null){

            $scope.table = {};
            $scope.table.business = {};
            $scope.table.infrastructures = {};

            //district vise objects
            angular.forEach($scope.provinces, function(value, key) {


                $scope.table.business[value] = {'name':value }
                $scope.table.business[value].year1Damage = {};
                $scope.table.business[value].year1Loss = {};
                $scope.table.business[value].year2Loss = {};

                $scope.table.infrastructures[value] = {'name':value }
                $scope.table.infrastructures[value].year1Damage = {};
                $scope.table.infrastructures[value].year1Loss = {};
                $scope.table.infrastructures[value].year2Loss = {};

//                angular.forEach($scope.data[$scope.provinces].DlDmgbusTotNationat, function(value2, key) {
//                    $scope.table.business[value].year1Damage[value2.ownership] = value2.tot_damages;
//                })
//
//                angular.forEach($scope.data[$scope.provinces].DlLosbusTotNationa, function(value2, key) {
//                    $scope.table.business[value].year1Loss[value2.ownership] = value2.los_year1;
//                    $scope.table.business[value].year2Loss[value2.ownership] = value2.los_year2;
//                })

                angular.forEach($scope.data[$scope.provinces].DlDmgInfTotNational, function(value2, key) {
                    $scope.table.infrastructures[value].year1Damage[value2.ownership] = value2.sum;
                })

                angular.forEach($scope.data[$scope.provinces].DlLosInfTotNational, function(value2, key) {
                    $scope.table.infrastructures[value].year1Loss[value2.ownership] = value2.tot_year1;
                    $scope.table.infrastructures[value].year1Loss[value2.ownership] = value2.tot_year2;
                })




            })

            console.log('table', $scope.table);


        }
        else{
            console.log("data null");
        }
        }

});