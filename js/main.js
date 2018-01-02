/**
 * @ioedeveloper
 */

var app = angular.module('myApp', ['LocalStorageModule', 'ngRoute']);
        
app.controller('formController', function ($scope, localStorageService) {

    if(localStorageService.get("userrecord") == null){
        $scope.userrecord = [];
    }else{
        $scope.userrecord = localStorageService.get("userrecord");
    }

            //push values into array and save in local storage
            $scope.add = function () {
                $scope.userrecord.push({
                    'fullname': $scope.txtfullname,
                    'emailaddress': $scope.txtemailaddress,
                    'phonenumber': $scope.txtphonenumber,
                    'homeaddress': $scope.txthomeaddress,
                    'socialmediaaddress': $scope.txtsocialmediaaddress
                });
                localStorageService.set("userrecord", $scope.userrecord);
                $scope.userrecord = localStorageService.get("userrecord");
                console.log("Record created successfully!");
            };

            //delete record using index in array
            $scope.delete = function (email, index) {
                $scope.userrecord = localStorageService.get("userrecord");
                $scope.userrecord.splice(index, 1);
                localStorageService.set("userrecord", $scope.userrecord);
                $scope.deleteMsg = "You have deleted "+ email +" successfully!";
            };

            //make container editable (html5)
            $scope.edit = function (event) {
                event.target.contentEditable = event.target.contentEditable == "false" ? "true" : "false";
            };

            //update record using index
            $scope.update = function (resource, index, event) {
                if (event.which == 13) {
                    $scope.edit(event);
                    editeddata = event.target.innerText;
                    $scope.userrecord = localStorageService.get("userrecord");
                    $scope.userrecord[index][resource] = editeddata;
                    localStorageService.set("userrecord", $scope.userrecord);
                    console.log("Updated successfully!");
                }
            };

    });