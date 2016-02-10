/**
 * Created by Aamod Pisat on 07-12-2015.
 */
(function(){
    'use strict';

    angular
        .module('myApp', [])
        .controller('TaskController', TaskController)
        .service('ToDoService', ToDoService);

    //Task Controller
    TaskController.$inject = ['$scope','ToDoService'];

    function TaskController($scope,ToDoService) {
        /* jshint validthis: true */
        var vm=this;
        vm.addToDoList = addToDoList;
        vm.viewList = viewList;
        vm.deleteTask = deleteTask;
        vm.init = init;
        vm.setCompleted= setCompleted;

        function addToDoList() {
                ToDoService.addData(vm.toDoText);
                vm.toDoText = '';
        }
        function viewList() {
                $scope.getLists= ToDoService.viewData();
        }

        function deleteTask(item){
                ToDoService.deleteData(item);
        }

        function init(){
                $scope.getLists= ToDoService.viewData();
        }

        function setCompleted(item){
                ToDoService.updateData(item);
        }
    }

    //ToDoService
    ToDoService.$inject=['$http'];
    function ToDoService($http) {

        //Credentials details
        var credentials = {
            "site_api_key": "blt9aca695e2d04c4ba",
            "authtoken": "bltf87660adffb069f3fa66fb20"
        },
            urlPath= 'https://api.contentstack.io/v2/forms/todolists/entries';

        //Add service
        this.addData = function (data) {
                $http({
                    method: 'POST',
                    url: urlPath,
                    headers: credentials,
                    contentType: 'application/json',
                    data: {
                        "entry": {
                            "title": data,
                            "iscompleted": false
                        }
                    }
                })
                    .then(function successCallBack(response) {
                        alert("Tasks added to lists");
                    }, function errorCallback(response) {
                        console.log("error");
                    });
        };

        //Get Service
        this.viewData = function(){
            var entriesArr=[];
            $http({
                method:'GET',
                url:'https://api.contentstack.io:443/v2/forms/todolists/entries',
                headers:credentials
            })
                .then(function success(res){
                    var entries= res.data.entries;
                    for(var i=0; i<entries.length;i++) {
                        entriesArr.push({'title':entries[i].title,'uid':entries[i]._metadata.uid,'isComplete':entries[i].iscompleted});
                    }
                }, function error(data){
                    console.log("Data yet nahi ahe...locha hai!!");
                });
            return entriesArr;
        };

        //Delete Service
        this.deleteData =function(item){
            $http({
                method:'DELETE',
                url:urlPath+ '/'+item,
                headers: credentials
            }).then(function success(res){
                alert("Task Deleted");
                window.location.reload();
            }, function error(res){
                console.log("Error in deleting task");
            });
        };

        //Update Service
        this.updateData = function(item){
            var keys_id= item;
            $http({
                method:'PUT',
                url:urlPath + '/'+keys_id,
                headers: credentials,
                data:{
                    entry:{
                        'iscompleted':true
                    }
                }
            }).then(function successfn(res){
                window.location.reload();
            }, function errorfn(res){
                
            });
        };
    }

})();














