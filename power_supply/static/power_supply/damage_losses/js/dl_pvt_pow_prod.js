//Table 3
var app = angular.module('dlPowSupPrivateApp', [])

app.controller('DlPowSupCebAppController',  function($scope, $http) {

    $scope.district;
    $scope.incident;
    $scope.dlDate;
    $scope.ownership;
    $scope.is_edit = false;
    $scope.data;
    $scope.pvtPwProducers;
    $scope.lossTotals = [];
    $scope.newPvtPwProducer = {
        'name':null,
    }

    $scope.pvtPwProducerTypes = [];
    $scope.pvtPwProducerType = null;

    $scope.selectedProducer;


    var init_data = {
            'power_supply': {
                'Table_3': {
                    'PvtNumEmp': [{
                        'num_male':null,
                        'num_female':null,
                        'tot_emp':null,
                     }],
                    'PvtDmgAst': [
                    {
                        'assets':'Total',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Power generation equipment',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Machinery',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Structures',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Office equipment',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Vehicles',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },
                    {
                        'assets':'Others',
                        'num_dst_ast':null,
                        'tot_replace_cost':null,
                        'num_pdmg_ast':null,
                        'tot_repair_cost':null,
                        'tot_damaged_cost':null,
                    },

                    ],
                    'PvtDmgLosses': [
                        {
                            'losses_type':'Total',
                            'los_year1':null,
                            'los_year2':null,
                        },{
                            'losses_type':'Income Losses',
                            'los_year1':null,
                            'los_year2':null,
                        },{
                            'losses_type':'Cleaning up of debris',
                            'los_year1':null,
                            'los_year2':null,
                        },{
                            'losses_type':'Higher operating costs',
                            'los_year1':null,
                            'los_year2':null,
                        },{
                            'losses_type':'Other unexpected expenses',
                            'los_year1':null,
                            'los_year2':null,
                        },
                    ],

                }
            }
        }


    $scope.changedValue =function (selectedValue) {
        if($scope.incident && selectedValue) {
            $http({
                method: "POST",
                url: "/fetch_incident_districts",
                data: angular.toJson({'incident': $scope.incident }),
            }).success(function(data) {
                $scope.districts = data;
                $scope.selectedDistrict = "";
                //console.log($scope.districts);
            })
        }

        if($scope.incident && $scope.district && $scope.district.district__id) {
            $scope.loadIPP_SPP();
        }
        console.log("district", $scope.district);
    }

    $scope.clear = function()
        {

            $scope.is_edit = false;
            $scope.data = angular.copy(init_data);

        }

    $scope.loadIPP_SPP = function(){
        if($scope.district){

                 $http({
                    method: "POST",
                    url: "/fetch_entities_plain",
                    data: angular.toJson({
                    'district':  $scope.district.district__id,
                    'model': 'BsPwGenFirm',
                    'sector':'power_supply'
                     }),
                    }).success(function(data) {

                    console.log("bs_pw_gen_firm", data);
                    $scope.pvtPwProducers = data;

                })


             }
    }


    $scope.loadIPP_SPP_types = function(){
         $http({
            method: "POST",
            url: "/fetch_entities_plain",
            data: angular.toJson({

            'model': 'PvtPwPrdTypes',
            'sector':'power_supply'
             }),
            }).success(function(data) {

            console.log(data);
            $scope.pvtPwProducerTypes = data;

        })
    }

    $scope.savePvtPwProducers = function(){
        if($scope.newPvtPwProducer.name && $scope.district){
            var new_prod = {
                'name': $scope.newPvtPwProducer.name,
                'district': $scope.district.district__id,

            }

            $http({
                method: "POST",
                url: "/add_entity",
                data: angular.toJson({
                'model_fields': $scope.newPvtPwProducer,
                'is_edit' : false,
                'model': 'PvtPwProducers',
                'sector': 'power_supply',
                 }),
                }).success(function(data) {
                 console.log(data);
//                    $scope.pvtPwProducers.push($scope.newPvtPwProducer)

                })
        }
        else{
            console.log("invalid", $scope.newPvtPwProducer , $scope.district)
        }
    }

    $scope.getSum2 = function(val1, val2){
       var final_val = 0;
        if(!isNaN(val1)) final_val += val1;
        if(!isNaN(val2)) final_val += val2;

        return final_val;
    }

    $scope.getSum3 = function(val1, val2, val3){
        var final_val = 0;
        if(!isNaN(val1)) final_val += val1;
        if(!isNaN(val2)) final_val += val2;
        if(!isNaN(val3)) final_val += val3;


        return final_val;
    }

        $scope.getTotalCol = function(subTable, column, total_object){

        var table = $scope.data.power_supply.Table_3;
        var final_total = 0;

        total_object[column] = 0;

        angular.forEach(table[subTable], function(value, key) {
            final_total += value[column] ;
        })

        return final_total;
    }

    $scope.saveDlData = function(form) {

        console.log($scope.selectedType);

        $scope.submitted = true;
            if (form.$valid) {
                $http({
            method: 'POST',
            url: '/dl_save_data',
            contentType: 'application/json; charset=utf-8',
            data: angular.toJson({
                'table_data': $scope.data,
                'com_data': {
                    'district_id': $scope.district.district__id,
                    'incident_id': $scope.incident,
                    'pw_gen_firm_id' : $scope.selectedProducer.id,

                },
                'is_edit': $scope.is_edit
            }),
            dataType: 'json',
        }).success(function(data) {

                    console.log(data);
                    $scope.clear();

                    $scope.is_edit = false;

                    if (data == 'False')
                        $scope.is_valid_data = false;
                    else
                        $("#modal-container-239453").modal('show');

                })
            }
            else{
                alert("invalid data");

            }
        }

        $scope.dataEdit = function() {

        if($scope.district && $scope.incident && $scope.selectedProducer ){
                    $scope.is_edit = true;
        $scope.submitted = true;

            $http({
                method: "POST",
                url: '/dl_fetch_edit_data',
                data: angular.toJson({
                    'table_name': 'Table_3',
                    'sector': 'power_supply',
                    'com_data': {
                        'district': $scope.district.district__id,
                        'incident': $scope.incident,
                        'pw_gen_firm' : $scope.selectedProducer.id,

//                        'pvt_pw_producer': $scope.selectedProducer.id,

                    }
                }),
            }).success(function(data) {
                console.log("edit", data);
                // handling response from server if data are not available in this
                if((data.power_supply.Table_3.PvtDmgAst.length == 0) ||
                    (data.power_supply.Table_3.PvtDmgLosses.length == 0) ||
                    (data.power_supply.Table_3.PvtNumEmp.length == 0)
                  ){
                    $scope.is_edit = false;
                        // do nothing or display msg that data are not available
                    }
                else{
                        $scope.data = data;
                    }
            })

        }
        else{
            alert("enter Incident, District, Firm, ownership, Type")
        }

        }
        $scope.cancelEdit = function()
        {
             $scope.is_edit = false;
             $scope.clear();
        }


    $scope.loadIPP_SPP_types();
    $scope.clear();


})
