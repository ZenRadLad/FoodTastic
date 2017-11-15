var app = angular.module('MEANapp', ['ngRoute', 'ngStorage','ngCart']).run(function($rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';
  $rootScope.displayedProduct = "";
  $rootScope.userPermission = "";
  });

/*********************************
 Controllers
 *********************************/
app.controller('productsListController', function($scope, $localStorage,$routeParams, $sessionStorage, $location, $http,$rootScope){

    var city = $routeParams.city;

    $http.get('/products/' + city )
        .then(
            function(response) {
                 $scope.products = response.data;
                 $rootScope.displayedProduct;
    })
        ,function(error) {
            console.log('Error: ' + error);
    };

  $scope.sortOptions = {
    stores: [
      {id : 1, name : 'Price Highest to Lowest' },      
      {id : 2, name : 'Price Lowest to Highest' }
      ]
  };

  //Mapped to the model to sort
  $scope.sortItem = {
    store: $scope.sortOptions.stores[1]
  };
  

  //Watch the sorting model - when it changes, change the
  //ordering of the sort (descending / ascending)
  $scope.$watch('sortItem', function () {
    if ($scope.sortItem.store.id === 1) {
      $scope.reverse = true;
    } else {
      $scope.reverse = false;
    }
  }, true);

  $scope.query = {};

});


 // Setup the filter
app.filter('categoryFilter', function() {

  // Create the return function and set the required parameter name to **input**
  return function(collection, keyname) {

    var output = [], keys = [];

    angular.forEach(collection, function(item) {
      var key = item[keyname];
      if (keys.indexOf(key) === -1 ) {
            keys.push(key);
            output.push(item);
      }
    });
    return output;
  };
});

app.controller('productDetailController', function($scope,  $routeParams,$rootScope, $location, $http, $rootScope){
   
    var id = $routeParams.id;
    var city = $routeParams.city;


    $http.get('/products/' + city + '/' + id )
        .then( 
            function(product) {
              $scope.product = product.data;
              $rootScope.displayedProduct = product.data.name;
              $rootScope.userPermission;
    })
     ,function(error) {
            console.log('Error from productDetailController : ' + error);
    };
    


    // delete Product 
    $scope.deleteProduct = function(productId){


        var response = confirm("Are you sure you want to delete this product? This cannot be undone!");
        if(response == true){
            
        $http.delete('/admin/stats/delete/' + productId )
            .then(function(response){
                console.log("product deleted successfully ! ");
                $location.path('/');
            },function (error){
                console.log(error.data);
            }); 
        }
    };    
    
    //update Product 
    $scope.updateProduct = function(productId){
       $http({
                method: 'PUT',
                url: '/admin/stats/update/' + productId,         
                data: {
                    'name': $scope.name,
                    'imagePath': $scope.imagePath,
                    'description' : $scope.description,
                    'price' : $scope.price,
                    'stock' : $scope.stock,
                    'category' : $scope.category,
                    'city' : $scope.city
                } 
           }).then(function(response){
                    $location.path('/');
                    console.log("product updated successfully ! ");

            },function (error){
                console.log(error.data);
            }); 
    };    


});

app.controller('logoutController', function($scope, $localStorage, $sessionStorage, $location, $http, $rootScope){
  // Set local scope to persisted user data
    $scope.user = $localStorage;

    // Logout function
    $scope.logout = function(){
        $http({
                method: 'POST',
                url: '/logout'
           })
            .then(function(response){
                $localStorage.$reset();
                $rootScope.authenticated = false;
                $location.path('/');
            },function (error){
                console.log(error.data);
                $location.path('/');
            }); 
    };    
});

app.controller('loginController', function($scope, $localStorage, $sessionStorage, $location, $http, $rootScope){


    // Login submission
    $scope.submitLogin = function(){

         // Login request
        $http({
            method: 'POST',
            url: '/login',
            data: {
                    'username': $scope.loginForm.username,
                    'password': $scope.loginForm.password
                }
            }).then(function (response){
                // $localStorage persists data in browser's local storage (prevents data loss on page refresh)
                $localStorage.status = true;
                $rootScope.authenticated = true;
                $rootScope.userPermission = response.data.privilege;
                if (response.data.privilege == 'admin'){
                    $location.path('/admin');
                }
                else{
                     $location.path('/');
                }
           },function (error){
                $localStorage.status = false;
                console.log('Login failed. Check username/password and try again.');
           }); 
    };

    // Redirect to account creation page
    $scope.createAccount = function(){
        $location.path('/newAccount');
    }
});

app.controller('createAccountController', function($scope, $localStorage, $sessionStorage, $http, $location){

    // Create account
    $scope.submitForm = function(){
        $http({
            method: 'POST',
            url: '/newAccount',
            data: {
                    'username': $scope.newUser.username,
                    'password': $scope.newUser.password,
                    'name' : $scope.newUser.name,
                    'email' : $scope.newUser.email,
                    'address' : $scope.newUser.address
                }
            })
            .then(function(response){
                console.log(response.data);
                $location.path('/login');
            })
            ,function (error){
                // When a string is returned
                if(typeof error === 'string'){
                    alert(error);
                }
                // When array is returned
                else if (Array.isArray(error)){
                    // More than one message returned in the array
                    if(error.length > 1){
                        var messages = [],
                            allMessages;
                        for (var i = error.length - 1; i >= 0; i--) {
                            messages.push(error[i]['msg']);
                            if(response.length == 0){
                                allMessages = messages.join(", ");
                                alert(allMessages);
                                console.error(response);
                            }
                        }
                    }
                    // Single message returned in the array
                    else{
                        alert(error[0]['msg']);
                        console.error(error);
                    }
                }
                // When something else is returned
                else{
                    console.error(error.data);
                }
            }
        ;

    };
});

app.controller('accountController', function($scope, $localStorage, $sessionStorage, $http, $location){

    // Create static copy of user data for form usage (otherwise any temporary changes will bind permanently to $localStorage)
    $scope.formData = $.extend(true,{},$localStorage.user);


    // Update user's account with new data
    $scope.updateAccount = function(){
        $http({
            method: 'POST',
            url: '/updateAccount',
            data: {
                'username': $scope.formData.username,
                'password': $scope.password,
                'name' : $scope.formData.name,
                'email' : $scope.formData.email,
                'address' : $scope.formData.address
            }
        })
            .then(function(response){
                $localStorage.user = $scope.formData;
                alert(response);
                $location.path("/login");
            })
            ,function (error){
                // When a string is returned
                if(typeof error === 'string'){
                    alert(error);
                }
                // When an array is returned
                else if (Array.isArray(error)){
                    // More than one message returned in the array
                    if(error.length > 1){
                        var messages = [],
                            allMessages;
                        for (var i = error.length - 1; i >= 0; i--) {
                            messages.push(error[i]['msg']);
                            if(error.length == 0){
                                allMessages = messages.join(", ");
                                alert(allMessages);
                                console.error(error);
                            }
                        }
                    }
                    // Single message returned in the array
                    else{
                        alert(error[0]['msg']);
                        console.error(error);
                    }
                }
                // When something else is returned
                else{
                    console.error(error);
                    alert("See console for error.");
                }
            };
    };

    // Delete user's account
    $scope.deleteAccount = function(){
        var response = confirm("Are you sure you want to delete your account? This cannot be undone!");
        if(response == true){
            $http({
                method: 'POST',
                url: '/deleteAccount',
                data: {
                    'username': $scope.formData.username
                }
            })
                .then(function(response){
                    $localStorage.$reset();
                    alert(response);
                    $location.path('/');
                })
                ,function (error){
                    alert(error);
                };
        }
    };
});



app.controller('cartController', function($scope, ngCart, $location, $http, $rootScope){
       

});

app.controller('statsController', function($scope, ngCart, $http){
     
    //get stats by category
    $scope.getStatsByCategory = function(category){
         $http({
                    method : 'POST',
                    url : '/admin/stats/category', 
                    data  :  {
                    'category': category
                    }
          }).then(function(response) {
                  if(0 != response.data){
                    $scope.stats = response.data[0].quantity;
                  }
                  else{ 
                    $scope.stats = 0;
                  }
            }),function(error) {
                    console.log('Error: ' + error);
            };              
    }

    //get Number of new users last month/week
    $http.get('/admin/stats/users').then(function(response) {
          $scope.lastMonthUsers = response.data.lastMonthUsers;
          $scope.lastWeekUsers = response.data.lastWeekUsers; 
    }),function(error) {
            console.log('Error: ' + error);
    };

    //product sales last week/month/year
    $http.get('/admin/stats/products').then(function(response) {
          $scope.productSalesWeek  = response.data.productSalesWeek[0].quantity;
          $scope.productSalesMonth = response.data.productSalesMonth[0].quantity; 
          $scope.productSalesYear  = response.data.productSalesYear[0].quantity; 
    }),function(error) {
            console.log('Error: ' + error);
    };


  
    
});


app.controller('adminController', function($scope, $localStorage, $http, $location){

    //get list of users
    $http.get('/admin').then(function(response) {
          $scope.users = response.data;
    }),function(error) {
            console.log('Error: ' + error);
    };

    //get list of cities for add product select
    $http.get('/admin/products').then(function(response) {
          $scope.cities = response.data;
    }),function(error) {
            console.log('Error: ' + error);
    };

    
    //grant admin privilege
    $scope.grantAdmin = function(id){
            $http.put('/admin/privilege/' + id , { 'privilege': 'admin' })
                .then(function(response){
                    $location.path('/admin/users/');
                    console.log("admin privileges granted ");
                })
                ,function (error){
                    console.log(error);
                };        
    };

    //revoke admin privilege
    $scope.revokeAdmin = function(id){
            $http.put('/admin/privilege/' + id , { 'privilege': 'user' })
                .then(function(response){
                    $location.path('/admin/users/');
                    console.log("admin privileges revoked ");

                })
                ,function (error){
                    console.log(error);
                };        
    };

     //block user's account
    $scope.blockAccount = function(id){
            $http.put('/admin/status/' + id , {  'blocked' : true })
                .then(function(response){
                    console.log("user blocked");
                    $location.path('/admin/users/');
                })
                ,function (error){
                    console.log(error);
                };        
    };

    //unblock user's account
    $scope.unblockAccount = function(id){
            $http.put('/admin/status/' + id , {  'blocked' : false })
                  .then(function(response){
                    console.log("user unblocked");
                    $location.path('/admin/users/');
                })
                ,function (error){
                    console.log(error);
                };        
    };
 
    //add new product
    $scope.createProduct = function(){
        $http({
                    method : 'POST',
                    url : '/admin/products/create', 
                    data: {
                        'name'        : $scope.name,
                        'imagePath'   : $scope.imagePath,
                        'description' : $scope.description,
                        'price'       : $scope.price,
                        'stock'       : $scope.stock,
                        'category'    : $scope.category,
                        'city'        : $scope.selectedCity
                    } 
                   
          }).then(function(response) {
                   $location.path('/admin/products'); 
                   console.log('product created successfully ! ');
            }),function(error) {
                    console.log('Error: ' + error);
            };              
    };


    //add new city
    $scope.addCity = function(){
        $http({
                    method : 'POST',
                    url : '/admin/city/create', 
                    data: {
                        'name' : $scope.name
                    } 
                   
          }).then(function(response) {
                   $location.path('/'); 
                   console.log('city created successfully ! ');
            }),function(error) {
                    console.log('Error: ' + error);
            };              
    };
});




/*********************************
 Routing
 *********************************/
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.

        when('/', {
            templateUrl: 'views/home.html'
        }).

        when('/products/:city', {
            templateUrl: '/views/products.html',
            controller: 'productsListController'
        }).

        when('/products/:city/:id', {
            templateUrl: '/views/productDetail.html',
            controller: 'productDetailController'
        }).

        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        }).

        when('/logout', {
            controller: 'logoutController', 
            authenticated : true

        }).

        when('/account', {
            templateUrl: 'views/account.html',
            controller: 'accountController',
            authenticated : true

        }).

        when('/newAccount', {
            templateUrl: 'views/newAccount.html',
            controller: 'createAccountController'
        }).

        when('/cart', {
            templateUrl: 'views/cart.html',
            controller: 'cartController'
        }).


        when('/admin', {
            templateUrl: '/views/admin/adminDashboard.html',
            controller: 'adminController',
            authenticated : true
        }).

        when('/admin/stats', {
            templateUrl: '/views/admin/adminDashboard.html',
            controller: 'adminController',
            authenticated : true
        }).

        when('/admin/users', {
            templateUrl: '/views/admin/users.html',
            controller: 'adminController',
            authenticated : true
        }).

        when('/admin/city', {
            templateUrl: '/views/admin/cities.html',
            controller: 'adminController',
            authenticated : true
        }).

        when('/admin/products', {
            templateUrl: '/views/admin/productsManagement.html',
            controller: 'adminController',
            authenticated : true
        }).
   
   
        when('/admin/privilege/:id', {         
            controller: 'adminController',   
            authenticated : true

        }).


        when('/admin/status/:id', {         
            controller: 'adminController',
            authenticated : true

        })

        .otherwise({ redirectTo : "/"}); 
        $locationProvider.html5Mode({ enabled: true, requireBase: false });      
});