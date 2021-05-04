$(function() {
    $("#product_catalog").accordion();
});
 
var app = angular.module('myApp', ['ngDragDrop']);
 
app.controller('myCtrl', function($scope, $timeout) {
    $scope.shirts = [{'title': 'Sweatshirt'}, {'title': 'Polo shirt'}, {'title': 'V-neck Shirt'}, {'title': 'U-neck Shirt'}];
    $scope.bag = [ {'title': 'Casual Day Bag'}, {'title': 'Medium-sized Shoulder Bag'}, {'title': 'Cross-body Bag'} ];
    $scope.gadget = [ {'title': 'Apple iPad'}, {'title': 'Cannon DSLR'}, {'title': 'Samsung Phone'}, {'title': 'Apple iPhone'} ];
    $scope.shopBagList = [];
 
    $scope.hideMe = function() {
        return $scope.shopBagList.length > 0;
    }
});