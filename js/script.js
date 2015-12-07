/**
 * Created by Aamod Pisat on 07-12-2015.
 */
var app= angular.module("myApp",[]);

app.controller("TaskController",['$scope','toDoService', function($scope,toDoService){
    $scope.addToDoList= function(){
        $scope.toDoList=toDoService.addToDo($scope.toDoText);
        $scope.toDoText="";
    };
    $scope.viewList= function(){
        $scope.getLists= toDoService.viewData();
    };
    $scope.init=function(){
        $scope.getLists= toDoService.viewData();
    };

    //$scope.click11 = function() {
    //	console.log("Arguments : ", arguments);
    //};
}]);


//Services
app.service('toDoService',['$http',function($http){

    //Config
    var credentials={
        "site_api_key":"blt9aca695e2d04c4ba",
        "authtoken":"bltd66f777989610f87f9b8bb4d"
    };

    //Function for calling REST API
    function call(entries){
        var mainData="";
        $http({
            method:'POST',
            url:'https://api.contentstack.io/v2/forms/todolists/entries',
            headers:credentials,
            contentType:'application/json',
            data: {
                "entry":{
                    "title":entries
                }
            }
        })
            .then(function successCallBack(response){
                mainData= response.data.entry.title;
                alert("Tasks added to lists");
            }, function errorCallback(response){
                console.log();
            });

    }

    //Add Data
    this.addToDo= function(toDoText){
        var a=[];
        if(toDoText==""){
            alert("Please insert Tasks");
        }else{
            return call(toDoText);
        }
    };

    //View Data
    this.viewData= function(toDoText){
        var entriesArr=[], temp=[];
        $http({
            method:'GET',
            url:'https://api.contentstack.io:443/v2/forms/todolists/entries',
            headers:credentials
        })
            .then(function success(res){
                var entries= res.data.entries;
                for(var i=0; i<entries.length;i++) {
                    entriesArr.push({'title':entries[i].title,'uid':entries[i]._metadata.uid});
                }
            }, function error(data){
                console.log("Data yet nahi ahe...locha hai!!");
            });
        return entriesArr;
    };


}]);


app.directive('todo',['$http', function($http){
    return{
        restrict: 'A',
        scope: {
            uid: '@',
            status: '@'
            //click11: '&'
        },
        //scope: false,
        controller: ['$scope', function(scope) {
            scope.click11 = function () {
                console.log("attribute", element.attr("uid"));
                alert("hello");
            };
        }],
        link: function(scope,element,attribute, a , controller) {
            console.log("Element :", controller);
            scope.meChange = function () {
                console.log(element);
            };
        }
    }
}]);














