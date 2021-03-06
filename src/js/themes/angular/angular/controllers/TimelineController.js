angular.module('app').controller('TimelineController', ['$scope', '$rootScope', 'RandomDataGeneratorService', 'CourseDataService', '$cookies', 'localStorageService', 'StudentService', 'InstructorService', '$state', function ($scope, $rootScope, RandomDataGeneratorService, CourseDataService, $cookies, localStorageService, StudentService, InstructorService, $state) {
  

    $scope.user = localStorageService.get("user");

	  $scope.app.settings.htmlClass = $rootScope.htmlClass.website;
    $scope.app.settings.bodyClass = '';

    $rootScope.$state = $state;


    var getTimelineData = function(){ 

      $scope.fetchingTimeline = true;
      
      if($scope.user.role === "student"){
        StudentService.getStudentForId($scope.user.id).then(function(data){
          studentData = RandomDataGeneratorService.timelineUIGenerator(data);
          $scope.timelineUpdates = studentData.updates;   
          $scope.fetchingTimeline = false;
        });
      }
      else {
        InstructorService.getInstructorForId($scope.user.id).then(function(data){
          instructorData = RandomDataGeneratorService.timelineUIGenerator(data);
          $scope.timelineUpdates = instructorData.updates;
          $scope.fetchingTimeline = false;
        });
      }
    };

    $scope.$on('$viewContentLoaded', function(){  
      getTimelineData();
    });  


}]);
  
