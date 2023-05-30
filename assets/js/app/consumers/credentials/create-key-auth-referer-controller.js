/**
 * This file contains all necessary Angular controller definitions for 'frontend.admin.login-history' module.
 *
 * Note that this file should only contain controllers and nothing else.
 */
(function() {
  'use strict';

  angular.module('frontend.consumers')
    .controller('CreateKeyAuthRefererController', [
      '$scope', '$rootScope', '$log','ConsumerService','MessageService','$uibModalInstance', 'KongErrorService', '_consumer',
      function controller($scope, $rootScope, $log, ConsumerService, MessageService, $uibModalInstance, KongErrorService, _consumer ) {

          $scope.consumer = _consumer
          $scope.createApiKeyReferer = createApiKeyReferer
          $scope.close = function(){
              $uibModalInstance.dismiss()
          }

          function createApiKeyReferer() {
              console.log('api key referer credentials', $scope.data);
              ConsumerService.addCredential($scope.consumer.id, 'key-auth-referer', $scope.data).then(function(resp){
                  $log.debug("Key Referer generated",resp)
                  $rootScope.$broadcast('consumer.key-auth-referer.created')
                  $uibModalInstance.dismiss()
              }).catch(function(err){
                  $log.error(err)
                  KongErrorService.handle($scope, err);
              })
          }
      }
    ])
}());
