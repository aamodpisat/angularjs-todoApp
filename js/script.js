/**
 * Created by Aamod Pisat on 07-12-2015.
 */
var app= angular.module("myApp",[]);

app.controller("TaskController",['$scope','toDoService', function($scope,toDoService){
    //Add Task List
    $scope.addToDoList= function(){
        $scope.toDoList=toDoService.addToDo($scope.toDoText);
        $scope.toDoText="";
    };
    //View List
    $scope.viewList= function(){
        $scope.getLists= toDoService.viewData();
    };
    //First time API call for view Data
    $scope.init=function(){
        $scope.getLists= toDoService.viewData();
    };
    //To set the task done when checked
     $scope.setCompleted =function(item){
         this.key_id= item;
         toDoService.changeStatus(this.key_id);
     };
    //Delete the task
    $scope.deleteTask = function(item){
      toDoService.deleteRow(item);
    }

}]);


//Services
app.service('toDoService',['$http',function($http){

    //Config
    var credentials={
        "site_api_key":"blt9aca695e2d04c4ba",
        "authtoken":"bltd66f777989610f87f9b8bb4d"
    };

    //Function for calling REST API
    function addService(entries){
        var mainData="";
        $http({
            method:'POST',
            url:'https://api.contentstack.io/v2/forms/todolists/entries',
            headers:credentials,
            contentType:'application/json',
            data: {
                "entry":{
                    "title":entries,
                    "iscompleted": false
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
            return addService(toDoText);
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
                    entriesArr.push({'title':entries[i].title,'uid':entries[i]._metadata.uid,'isComplete':entries[i].iscompleted});
                }
            }, function error(data){
                console.log("Data yet nahi ahe...locha hai!!");
            });
        return entriesArr;
    };

    //Change status of task
    this.changeStatus =function(data_key){
        var keys_id= data_key;
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

    //Delete Task
    this.deleteRow =function(delete_id){
        $http({
            method:'DELETE',
            url:'https://api.contentstack.io/v2/forms/todolists/entries/'+ delete_id,
            headers: credentials
        }).then(function success(res){
            alert("Task Deleted");
        }, function error(res){
            console.log("Error in deleting task");
        });
    }
}]);
















