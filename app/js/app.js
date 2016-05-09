var meetingPlannerApp = angular.module('meetingPlanner', ['ngRoute','ngResource', "firebase", 'ngAnimate', 'ui.bootstrap', 'ng-sortable', 'ui.router', 'ngProgress']);

meetingPlannerApp.filter('orderByKey', ['$filter', function($filter) {
    return function(items, field, reverse) {
        var keys = $filter('orderBy')(Object.keys(items), field, reverse),
        obj = {};
        keys.forEach(function(key) {
            obj[key] = items[key];
        });
    return obj;
    };
}]);


meetingPlannerApp.directive('draggable', function() {
    return {
        scope: {
            dragstart: '&'
        },
        link: function(scope, element) {
            // this gives us the native JS object
            var el = element[0];
            el.draggable = true;            
            el.addEventListener(
                'dragstart',
                function(e) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('Text', this.id);
                    this.classList.add('drag');
                    scope.$apply('dragstart()');
                    return false;
                },
                false
            );
            el.addEventListener(
                'dragend',
                function(e) {
                    this.classList.remove('drag');
                    return false;
                },
                false
            );
        }
    }
});

meetingPlannerApp.directive('droppable', function() {
    return {
        scope: {
            drop: '&' // parent
        },
        link: function(scope, element) {
            // again we need the native object
            var el = element[0];
            el.addEventListener(
                'dragover',
                function(e) {
                    e.dataTransfer.dropEffect = 'move';
              // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                },
                false
            );
            el.addEventListener(
                'dragenter',
                function(e) {
                    this.classList.add('over');
                    return false;
                },
                false
            );
            el.addEventListener(
                'dragleave',
                function(e) {
                    this.classList.remove('over');
                    return false;
                },
                false
            );
            el.addEventListener(
                'drop',
                function(e) {
                  // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();
                    this.classList.remove('over');
                  // var item = document.getElementById(e.dataTransfer.getData('Text'));
                  // this.appendChild(item);
                  
                  // call the drop passed drop function
                    scope.$apply('drop()');
                    return false;
                },
                false
            );
        }
    }
});


meetingPlannerApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/activities', {
            templateUrl: 'partials/activities.html',
            controller: 'ActivitiesCtrl'
        }).  
        when('/overview', {
            templateUrl: 'partials/overview.html',
            controller: 'OverviewCtrl'
        }).
        when('/calendar', {
            templateUrl: 'partials/calendar.html',
            controller: 'CalendarCtrl'
        }).
        when('/timepicker', {
            templateUrl: 'partials/timepicker.html',
            controller: 'TimepickerCtrl'
        }).
        when('/navbar', {
            templateUrl: 'partials/navbar.html',
            controller: 'NavbarCtrl'
        }).
        when('/about', {
            templateUrl: 'partials/about.html',    
        }).
        when('/contact', {
            templateUrl: 'partials/contact.html',
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);
