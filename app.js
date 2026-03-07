var app = angular.module('LusterLaneApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .when('/shop', {
            templateUrl: 'templates/shop.html',
            controller: 'ShopController'
        })
        .when('/about', {
            templateUrl: 'templates/about.html'
        })
        .when('/contact', {
            templateUrl: 'templates/contact.html'
        })
        .when('/cart', {
            templateUrl: 'templates/cart.html',
            controller: 'CartController'
        })
        .when('/checkout', {
            templateUrl: 'templates/checkout.html',
            controller: 'CheckoutController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'AuthController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // Optionally use HTML5 mode if server is configured for it, 
    // but for now we'll stick to hash routing since it's easier in XAMPP without rewrite rules
    // $locationProvider.html5Mode(true);
});

// Define global App Controller
app.controller('MainController', function ($scope, $rootScope, AuthService, CartService, $location) {
    $scope.currentUser = null;
    $scope.cartCount = 0;

    // Check session on load
    AuthService.checkSession().then(function (user) {
        if (user) {
            $scope.currentUser = user;
        }
    });

    // Update cart count when cart changes
    $rootScope.$on('cartChanged', function () {
        $scope.cartCount = CartService.getCartCount();
    });

    // Initial cart load
    $scope.cartCount = CartService.getCartCount();

    $scope.logout = function () {
        AuthService.logout().then(function () {
            $scope.currentUser = null;
            $location.path('/');
        });
    };
});

// Services
app.service('AuthService', function ($http, $q) {
    this.checkSession = function () {
        var deferred = $q.defer();
        $http.post('api/auth.php', { action: 'session' }).then(function (response) {
            if (response.data.success) {
                deferred.resolve(response.data.user);
            } else {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    };

    this.login = function (email, password) {
        return $http.post('api/auth.php', { action: 'login', email: email, password: password });
    };

    this.signup = function (name, email, password) {
        return $http.post('api/auth.php', { action: 'signup', name: name, email: email, password: password });
    };

    this.logout = function () {
        return $http.post('api/auth.php', { action: 'logout' });
    };
});

app.service('CartService', function ($rootScope) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    this.getCart = function () {
        return cart;
    };

    this.addToCart = function (product, quantity) {
        quantity = quantity || 1;
        var existing = cart.find(item => item.id == product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price),
                image_url: product.image_url || product.image,
                quantity: quantity
            });
        }
        this.saveCart();
    };

    this.removeFromCart = function (productId) {
        cart = cart.filter(item => item.id != productId);
        this.saveCart();
    };

    this.updateQuantity = function (productId, quantity) {
        var item = cart.find(item => item.id == productId);
        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) this.removeFromCart(productId);
            else this.saveCart();
        }
    };

    this.clearCart = function () {
        cart = [];
        this.saveCart();
    };

    this.getCartCount = function () {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    this.getCartTotal = function () {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    this.saveCart = function () {
        localStorage.setItem('cart', JSON.stringify(cart));
        $rootScope.$broadcast('cartChanged');
    };
});

// Controllers for each view
app.controller('HomeController', function ($scope, $http, CartService) {
    $scope.featuredProducts = [];

    $http.get('api/products.php?limit=4').then(function (response) {
        if (response.data.success) {
            $scope.featuredProducts = response.data.data;
        }
    });

    $scope.addToCart = function (product) {
        CartService.addToCart(product, 1);
        alert(product.name + ' added to cart!');
    };
});

app.controller('ShopController', function ($scope, $http, CartService) {
    $scope.products = [];
    $scope.loading = true;

    $http.get('api/products.php').then(function (response) {
        if (response.data.success) {
            $scope.products = response.data.data;
        }
        $scope.loading = false;
    });

    $scope.addToCart = function (product) {
        CartService.addToCart(product, 1);
        alert(product.name + ' added to cart!');
    };
});

app.controller('CartController', function ($scope, CartService) {
    $scope.cart = CartService.getCart();

    $scope.updateCart = function () {
        $scope.cart = CartService.getCart();
    };

    $scope.removeItem = function (productId) {
        CartService.removeFromCart(productId);
        $scope.updateCart();
    };

    $scope.changeQuantity = function (productId, qtyChange) {
        var item = $scope.cart.find(i => i.id == productId);
        if (item) {
            var newQty = item.quantity + qtyChange;
            if (newQty > 0) {
                CartService.updateQuantity(productId, newQty);
                $scope.updateCart();
            }
        }
    };

    $scope.getTotal = function () {
        return CartService.getCartTotal();
    };
});

app.controller('AuthController', function ($scope, AuthService, $location) {
    $scope.loginMode = true;

    $scope.loginData = { email: '', password: '' };
    $scope.signupData = { name: '', email: '', password: '', confirm: '' };
    $scope.message = '';

    $scope.toggleMode = function (mode) {
        $scope.loginMode = mode;
        $scope.message = '';
    };

    $scope.doLogin = function () {
        AuthService.login($scope.loginData.email, $scope.loginData.password).then(function (response) {
            if (response.data.success) {
                $scope.$parent.currentUser = response.data.user; // Update main controller
                $location.path('/');
            } else {
                $scope.message = response.data.message;
            }
        });
    };

    $scope.doSignup = function () {
        if ($scope.signupData.password !== $scope.signupData.confirm) {
            $scope.message = "Passwords do not match!";
            return;
        }
        AuthService.signup($scope.signupData.name, $scope.signupData.email, $scope.signupData.password).then(function (response) {
            if (response.data.success) {
                $scope.$parent.currentUser = response.data.user;
                $location.path('/');
            } else {
                $scope.message = response.data.message;
            }
        });
    };
});

app.controller('CheckoutController', function ($scope, CartService, $http, $location) {
    $scope.cart = CartService.getCart();
    $scope.total = CartService.getCartTotal();
    $scope.formData = {};
    $scope.message = '';

    if ($scope.cart.length === 0) {
        $location.path('/shop');
        return;
    }

    $scope.placeOrder = function () {
        var payload = angular.copy($scope.formData);
        payload.cart = $scope.cart;

        $http.post('api/order.php', payload).then(function (response) {
            if (response.data.success) {
                CartService.clearCart();
                alert('Order placed successfully!');
                $location.path('/');
            } else {
                $scope.message = response.data.message;
            }
        });
    };
});
