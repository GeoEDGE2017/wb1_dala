//Table 8
var app = angular.module('dlSumAgrarianDstrApp', [])

app.controller('dlSumAgrarianDstrController', ['$scope', '$http', function($scope, $http) {

    $scope.district;
    $scope.selectedDistrict;
    $scope.incident;
    $scope.dlDate;
    $scope.bs_data={};
    $scope.baselineDate;
    $scope.is_edit = false;
    $scope.is_valid_data = true;

    var init_data = {
        'agri_agrarian': {
            'Table_4': {
                //Tab 1
                'DlAirDmgAircrafts': [{
                    assets : 'Airplanes',
                    tot_destroyed_pub : null,
                    tot_destroyed_pvt : null,
                    part_damaged_pub : null,
                    part_damaged_pvt : null,
                },],
                'DlAirDmgEquipment': [{
                    assets : 'Office equipment',
                    tot_destroyed : null,
                    part_damaged : null,
                    tot_dmg_pub : null,
                },],
                'DlAirDmgSupplies': [{
                    assets : 'Fuel (per Liter)',
                    tot_destroyed_pub : null,
                    tot_destroyed_pvt : null,
                    part_damaged_pub : null,
                    part_damaged_pvt : null,
                    tot_dmg_pub : null,
                    tot_dmg_pvt : null,
                },],
                'DlAirDmgOthers': [{
                    assets : 'Runway',
                    tot_destroyed : null,
                    part_damaged : null,
                    tot_dmg_pub : null,
                },],
                'DlAirDmgGstructures': [{
                    assets : 'Airport Terminal buildings',
                    tdest_floor_1 : null,
                    tdest_floor_2_3 : null,
                    tdest_floor_than_3 : null,
                    pdmg_number : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    tot_pub : null,
                },],
                'DlAirLosFi': [{
                    type_los : 'Income of airline companies',
                    year_1_pub : null,
                    year_1_pvt : null,
                    year_2_pub : null,
                    year_2_pvt : null,
                    tot_los_pub : null,
                    tot_los_pvt : null,
                },],
                'DlAirLosHoc': [{
                    type_los : 'Costs incurred in placing alternate arrangements',
                    year_1_pub : null,
                    year_1_pvt : null,
                    year_2_pub : null,
                    year_2_pvt : null,
                    tot_los_pub : null,
                    tot_los_pvt : null,
                },],
                'DlAirLosOther':[{
                    assets : 'Cleaning up of debris',
                    year_1_pub : null,
                    year_1_pvt : null,
                    year_2_pub : null,
                    year_2_pvt : null,
                    tot_los_pub : null,
                    tot_los_pvt : null,
                },],
            }
        }
    }

    $scope.dlSumAgrarianDstr = init_data;

    $scope.changedValue=function getBsData(selectedValue) {
        if($scope.incident && selectedValue) {
            $http({
                method: "POST",
                url: "/fetch_incident_districts",
                data: angular.toJson({'incident': $scope.incident }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.selectedDistrict = "";
            })
        }

        if($scope.incident && $scope.district ) {
            $http({
                method: 'POST',
                url: '/bs_get_data_mock',
                contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'db_tables': ['BsAstAirAircrafts', 'BsAstAirEquipment', 'BsAstAirSupplies', 'BsAstAirStructures','BsAstAirEmployment','BsAstAirOthers'],
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                    },
                    'table_name': 'Table_1',
                    'sector':'transport_air',
                        }),
                  dataType: 'json',


            }).then(function successCallback(response) {
                var data = response.data;
                angular.forEach(data, function(value, key) {
                  $scope.bs_data[key] = JSON.parse(value);
                });
                console.log(data);
                generateRefencedData();
            }, function errorCallback(response) {

            });
        }
    }

    function generateRefencedData() {

        data_array = ['BsAstAirAircrafts', 'BsAstAirEquipment', 'BsAstAirSupplies', 'BsAstAirStructures'];
            var dl_model1 = null;
            var dl_model2 = null;
            var dl_model3 = null;
            var dl_model4 = null;

        angular.forEach(data_array, function(value, key) {
            obj_array = $scope.bs_data[value];
            model_name = value;

            var particular_value_1 = null;
            var particular_value_2 = null;
            var particular_value_3 = null;
            var particular_value_4 = null;


            if(model_name == 'BsAstAirAircrafts') {
               dl_model1 = 'DlAirDmgAircrafts';
               particular_value_1 = 'Total';
               $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model1] = [];
            }
            if(model_name == 'BsAstAirEquipment') {
               dl_model2 = 'DlAirDmgEquipment';
               particular_value_2 = 'Total';
               $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model2] = [];
            }
            if(model_name == 'BsAstAirSupplies') {
               dl_model3 = 'DlAirDmgSupplies';
               particular_value_3 = 'Total';
               $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model3] = [];
            }
            if(model_name == 'BsAstAirStructures') {
               dl_model4 = 'DlAirDmgGstructures';
               particular_value_4 = 'Total';
               $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model4] = [];
            }

            var obj1 = {
                assets : particular_value_1,
                tot_destroyed_pub : null,
                tot_destroyed_pvt : null,
                part_damaged_pub : null,
                part_damaged_pvt : null,
            };
            var obj2 = {
                assets : particular_value_2,
                tot_destroyed : null,
                part_damaged : null,
                tot_dmg_pub : null,
            };
            var obj3 = {
                assets : particular_value_3,
                tot_destroyed_pub : null,
                tot_destroyed_pvt : null,
                part_damaged_pub : null,
                part_damaged_pvt : null,
                tot_dmg_pub : null,
                tot_dmg_pvt : null,
            };
            var obj4 = {
                assets : particular_value_4,
                tdest_floor_1 : null,
                tdest_floor_2_3 : null,
                tdest_floor_than_3 : null,
                pdmg_number : null,
                pdmg_roof : null,
                pdmg_wall : null,
                pdmg_floor : null,
                tot_pub : null,
            };

            angular.forEach(obj_array, function(value, key) {
                var obj1 = {
                    assets : value.fields.assets,
                    tot_destroyed_pub : null,
                    tot_destroyed_pvt : null,
                    part_damaged_pub : null,
                    part_damaged_pvt : null,
                };
                var obj2 = {
                    assets : value.fields.assets,
                    tot_destroyed : null,
                    part_damaged : null,
                    tot_dmg_pub : null,
                };
                var obj3 = {
                    assets : value.fields.assets,
                    tot_destroyed_pub : null,
                    tot_destroyed_pvt : null,
                    part_damaged_pub : null,
                    part_damaged_pvt : null,
                    tot_dmg_pub : null,
                    tot_dmg_pvt : null,
                };
                var obj4 = {
                    assets : value.fields.assets,
                    tdest_floor_1 : null,
                    tdest_floor_2_3 : null,
                    tdest_floor_than_3 : null,
                    pdmg_number : null,
                    pdmg_roof : null,
                    pdmg_wall : null,
                    pdmg_floor : null,
                    tot_pub : null,
                };


                if(model_name == 'BsAstAirAircrafts') {
                   $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model1].push(obj1);
                }
                if(model_name == 'BsAstAirEquipment') {
                   $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model2].push(obj2);
                }
                if(model_name == 'BsAstAirSupplies') {
                   $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model3].push(obj3);
                }
                if(model_name == 'BsAstAirStructures') {
                   $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model4].push(obj4);
                }
            });

            if(model_name == 'BsAstAirAircrafts') {
                $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model1].push(obj1);
            }
            if(model_name == 'BsAstAirEquipment') {

                $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model2].push(obj2);
            }
            if(model_name == 'BsAstAirSupplies') {

                $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model3].push(obj3);
            }
            if(model_name == 'BsAstAirStructures') {
                $scope.dlSumAgrarianDstr.transport_air.Table_2[dl_model4].push(obj4);
            }
        });
    }

    $scope.saveDlData = function(form) {
        $scope.submitted = true;
        if(form.$valid) {
            $http({
                method: 'POST',
                url: '/dl_save_data',
               contentType: 'application/json; charset=utf-8',
                data: angular.toJson({
                    'table_data': $scope.dlSumAgrarianDstr,
                    'com_data': {
                       'district': $scope.district.district__id,
                        'incident' : $scope.incident,
                    },
                    'is_edit':$scope.is_edit,
                    'sector':'transport_air'
                }),
                dataType: 'json',
            }).then(function successCallback(response) {
                if(response.data == 'False')
                    $scope.is_valid_data = false;
               else
                    $("#modal-container-239453").modal('show');
            }, function errorCallback(response) {

            });
        }
    }
}]);
