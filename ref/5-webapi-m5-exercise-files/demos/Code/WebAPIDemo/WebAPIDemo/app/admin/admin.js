﻿(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', admin]);

    function admin(common) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var logSuccess = getLogFn(controllerId, "success");

        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
            datacontext.getBooks()
            .then(function(books) {
                logSuccess('I got books!! I got ' +
                    books.length + ' books', null, true);
            })
        }
    }
})();