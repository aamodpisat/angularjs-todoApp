/**
 * Created by Aamod Pisat on 07-12-2015.
 */
angular
    .module('myApp', [])
    .controller('TaskController', TaskController)
    .service('toDoService', toDoService);

//Task Controller
TaskController.$inject = ['$scope','toDoService'];

function TaskController($scope,toDoService) {
    /* jshint validthis: true */
    var vm=this;
    vm.addToDoList = addToDoList;
    vm.viewList = viewList;
    vm.deleteTask = deleteTask;
    vm.init = init;
    vm.setCompleted= setCompleted;

    function addToDoList() {
            toDoService.addData(vm.toDoText);
            vm.toDoText = '';
    }
    function viewList() {
            $scope.getLists= toDoService.viewData();
    }

    function deleteTask(item){
            toDoService.deleteData(item);
    }

    function init(){
            $scope.getLists= toDoService.viewData();
    }

    function setCompleted(item){
            toDoService.updateData(item);
    }
}

//toDoService
toDoService.$inject=['$http'];
function toDoService($http) {

    //Credentials details
    var credentials = {
        "site_api_key": "blt9aca695e2d04c4ba",
        "authtoken": "bltf87660adffb069f3fa66fb20"
    };

    //Add service
    this.addData = function (data) {
            $http({
                method: 'POST',
                url: 'https://api.contentstack.io/v2/forms/todolists/entries',
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
                    mainData = response.data.entry.title;
                    alert("Tasks added to lists");
                }, function errorCallback(response) {
                    console.log("error");
                });
    };

    //Get Service
    this.viewData= function(){
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
    this.deleteData=function(item){
        $http({
            method:'DELETE',
            url:'https://api.contentstack.io/v2/forms/todolists/entries/'+ item,
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
            url:'https://api.contentstack.io/v2/forms/todolists/entries/'+ keys_id,
            headers: credentials,
            data:{
                entry:{
                    'iscompleted':true
                }
            }
        }).then(function successfn(res){
            window.location.reload();
        }, function errorfn(res){
           console.log("Error in changing status");
        });
    };
}

















