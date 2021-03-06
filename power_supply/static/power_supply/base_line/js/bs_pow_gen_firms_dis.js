var app = angular.module('bsPowGenFrimDisApp', []);

app.controller("BsPowGenFrimDisController", function($scope, $http) {


    $scope.district;
    $scope.baselineDate;
    $scope.is_edit = false;
    $scope.selectedFirm;
    $scope.ownership;

    var init_data = {
    'power_supply':{
        'Table_1': {
             'BsPwGenFirm':[],
        }
        }
    }

 $scope.bsPowGenFrimDis = init_data;

 $scope.insertFirm = function(table)
{

   console.log($scope.bsPowGenFrimDis.power_supply.Table_1[table]);
    var new_row;
    if(table == 'BsPwGenFirm'){
    new_row = {
    ownership:'',
    assets:'',
    description:'',
    num_hydro:null,
    num_coal:null,
    num_diesel:null,
    num_other:null,
    tot_capacity:null,
    avg_income:null,

    }
  }


    $scope.bsPowGenFrimDis.power_supply.Table_1[table].push(new_row);
    }

    $scope.removeItem = function removeItem(table, index)
    {
    if(table == 'BsPwGenFirm'){
    $scope.bsPowGenFrimDis.power_supply.Table_1.BsPwGenFirm.splice(index,1);
    }
    }

     $scope.saveBsData = function(form) {
      $scope.submitted = true;
      console.log($scope.district);
        $http({
            method: 'POST',
            url: '/bs_save_data',
            contentType: 'application/json; charset=utf-8',
            data: angular.toJson({
                'table_data': $scope.bsPowGenFrimDis,
                'com_data': {
                    'district': $scope.district,
                    'bs_date': $scope.bs_date,

                },
                'is_edit': $scope.is_edit
            }),
            dataType: 'json',
        }).then(function successCallback(response) {
	$("#modal-container-239453").modal('show');
            console.log(response);


        }, function errorCallback(response) {

            console.log(response);
        });


    }



    $scope.bsHsDataEdit = function(form)
{

   $scope.is_edit = true;
   $scope.submitted = true;



    $http({
    method: "POST",
    url: "/bs_fetch_edit_data",
    data: angular.toJson({
    'table_name': 'Table_1',
    'sector':'power_supply',
    'com_data': {
           'district': $scope.district,
           'bs_date': $scope.bs_date,
          } }),
    }).success(function(data) {

    console.log(data);
    $scope.bsPowGenFrimDis = data;
    })



}


    $scope.cancelEdit = function()
{
     $scope.is_edit = false;
     $scope.bsPowGenFrimDis = init_data;
}



})
