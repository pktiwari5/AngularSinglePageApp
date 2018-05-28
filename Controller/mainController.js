var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./view/login.html",
        controller : "mainController"
    })    
    .when("/profile", {
        templateUrl : "./view/profile.html",
        controller : "mainController"
    })
    .when("/logout", {
        templateUrl : "./view/login.html",
        controller : "mainController"
    })
    .when("/login", {
        templateUrl : "./view/login.html",
        controller : "mainController"
    });
});
app.controller('mainController',['$scope', '$http','$location','$window', function($scope,$http,$location,$window) {    
    $scope.returnMessage = {};
    $scope.email="";
    $scope.password= "";
    $scope.data = {
        "email": "pktiwari@iontrading.com",
        "password": "cityslicka"
    } 
    $scope.isLogin =false;
    $scope.isSuccess = false;
    $scope.isError = false;
    $scope.userData ={};
   
  $scope.login = function () {
    $http({
        method : "POST",
        url : "https://reqres.in/api/login",
        data:$scope.data
    }).then(function loginSuccess(response,status,header) {
        if($scope.email == $scope.data["email"] && $scope.password == $scope.data["password"]){
        $window.sessionStorage.setItem("token","skdhdkhc-dnfs-ddj");
        $location.path('/profile');
        $scope.isLogin = true;
        $scope.isSuccess = true;
        $scope.isError = false;
        $scope.returnMessage = {
            "success" : $scope.isSuccess,
            "errorMessage" :$scope.isError
        }; 
    }else{
        $scope.error = "Invalid email or password";
        $scope.isError = true;
    } 
    }, function loginError(response) {
        $scope.error = response.statusText;
        $scope.isSuccess = false;
        $scope.isError = true;
        $scope.returnMessage = {
            "success" : $scope.isSuccess,
            "errorMessage" :$scope.isError
        }
    });
  }

  $scope.getUserProfile = function () {
    $scope.token = $window.sessionStorage.getItem("token");
    if($scope.token !== null){    
    $http({
        method : "GET",
        url : "https://randomuser.me/api/"
    }).then(function profileSuccess(response) {
        $scope.userData = response.data.results;
        $scope.isLogin = true;
        $scope.isSuccess = true;
        $scope.isError = false;
        $scope.returnMessage = {
            "success" : $scope.isSuccess,
            "errorMessage" :$scope.isError
        }
    }, function profileError(response) {
        $scope.error = response.statusText;
    });
}else{
    alert("It seems you are not logged in. Please login");
    $location.path("/login");
}
}
$scope.logout = function(){   
    $window.sessionStorage.removeItem("token");
}
}]);