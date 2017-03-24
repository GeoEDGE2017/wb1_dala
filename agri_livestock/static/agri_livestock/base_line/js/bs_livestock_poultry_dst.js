//Table 1
var app = angular.module('bsLivestockPoultryDstApp', [])

app.controller('bsLivestockPoultryDstController', ['$scope', '$http', function($scope, $http) {
    $scope.district;
    $scope.baselineDate;
    $scope.bs_data={};
    $scope.is_edit = false;

    $scope.submitted = false;
    $scope.is_valid_data = true;

    var init_data = {
        'agri_livestock': {
            'Table_1': {
                'BelLivestock': [{
                    livestock : 'Swine',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, {
                    livestock : 'Sheep',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, {
                    livestock : 'Goat',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, {
                    livestock : 'Cattle',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, {
                    livestock : 'Buffalo',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, ],
                'BelPoultry': [{
                    poultry : 'Chicken',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                },{
                    poultry : 'Ducks',
                    pub_own_families : null,
                    pub_own_male : null,
                    pub_own_female : null,
                    pvt_own_families : null,
                    pvt_own_male : null,
                    pvt_own_female : null,
                }, ],
            }
        }
    }

    $scope.bsLivestockPoultryDst = init_data;

    $scope.insertAsset = function(table) {
        console.log($scope.bsLivestockPoultryDst.agri_livestock.Table_1[table]);
        var new_row;
        if(table == 'BelLivestock') {
            new_row = {
                livestock : '',
                pub_own_families : null,
                pub_own_male : null,
                pub_own_female : null,
                pvt_own_families : null,
                pvt_own_male : null,
                pvt_own_female : null,
            }
        }
        else if(table == 'BelPoultry') {
            new_row = {
                poultry : '',
                pub_own_families : null,
                pub_own_male : null,
                pub_own_female : null,
                pvt_own_families : null,
                pvt_own_male : null,
                pvt_own_female : null,
            }
        }
        $scope.bsLivestockPoultryDst.agri_livestock.Table_1[table].push(new_row);
    }

    $scope.removeItem = function removeItem(table, index) {
        if(table == 'BelLivestock') {
            $scope.bsLivestockPoultryDst.agri_livestock.Table_1.BelLivestock.splice(index, 1);
        }
        else if(table == 'BelPoultry') {
            $scope.bsLivestockPoultryDst.agri_livestock.Table_1.BelPoultry.splice(index, 1);
        }
    }

    $scope.saveBsData = function(form) {
       $scope.submitted = true;
        if (form.$valid) {
            $http({
            method: "POST",
            url: "/bs_save_data",
            data: angular.toJson({
            'table_data': $scope.bsLivestockPoultryDst,
            'com_data': {'district': $scope.district,
            'bs_date': $scope.bs_date,
            },
            'is_edit': $scope.is_edit }),
            }).success(function(data) {

             $scope.bsLivestockPoultryDst = init_data;
             $scope.is_edit = false;

             if(data == 'False')
              $scope.is_valid_data = false;
             else
              $("#modal-container-239453").modal('show');
        })
        }
    }

    $scope.bsHsDataEdit = function(){
$scope.submitted = true;

   $scope.is_edit = true;
    $http({
    method: "POST",
    url: "/bs_fetch_edit_data",
    data: angular.toJson({'table_name': 'Table_1', 'sector': 'agri_livestock',
    'com_data': {
          'district': $scope.district,
          'bs_date': $scope.bs_date,

          } }),
    }).success(function(data) {

    console.log(data);
    $scope.bsLivestockPoultryDst = data;
    })
}

    $scope.cancelEdit = function(){
    $scope.is_edit = false;
    $scope.bsLivestockPoultryDst = init_data;
}
}]);
