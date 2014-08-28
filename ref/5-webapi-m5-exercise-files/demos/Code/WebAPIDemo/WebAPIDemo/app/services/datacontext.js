(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', 'entityManagerFactory', datacontext]);

    function datacontext(common, entityManagerFactory) {
        var $q = common.$q;
        var manager = entityManagerFactory.createManager();

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, 'error');
        var logSuccess = getLogFn(serviceId, 'success');

        var service = {
            addBookToOrder: addBookToOrder,
            changesCount: changesCount,
            createOrder: createOrder,
            getBooks: getBooks,
            getMessageCount: getMessageCount,
            getOrdersAndDetails: getOrdersAndDetails,
            getPeople: getPeople,
            isSaving: false,
            ready: getReady(),
            saveOrder: saveOrder
        };

        return service;

        function addBookToOrder(book, order) {
            if (!book || !order) {
                logError("No book or order!", null, true);
                return;
            };
            var detail = manager.createEntity("OrderDetail", {
                book: book,
                order: order,
                quantity: 1
            });
            return detail;
        };

        function changesCount() {
            return manager.getChanges().length;
        };

        function createOrder() {
            var order = manager.createEntity("Order", {
                orderDate: new Date().toUTCString()
            });
            return order;
        };

        function fail(error) {
            logError('Oops! We got ' + error.message, error, true);

        };


        function getBooks() {
            breeze.EntityQuery.from('Books')
                .using(manager)
                .execute()
                .then(success)
                .catch(fail);

            function success(resp) {
                var books = resp.results;
                logSuccess('Hooray we got books!!' +
                    books.length, null, true);
                return books;
            }
        }

        function getMessageCount() { return $q.when(72); }

        function getOrdersAndDetails() {
            return breeze.EntityQuery.from("Orders")
                .expand("orderDetails")
                .using(manager)
                .execute()
                .then(success)
                .catch(fail);

            function success(data) {
                var results = data.results;
                logSuccess("Got " + results.length + " orders", null, true);
                return (results);
            }

        }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }
        function getReady() {
            return manager.metadataStore.fetchMetadata(manager.dataService)
                .then(function () {
                    logSuccess("Meta data fetched", null, true);
                    return true;    // $q will wrap this in a promise
                })
                .catch(function (error) {
                    logError('Metadata fetch failed! We got ' + error.message, error, true);
                    return $q.reject(error);
                });
        };



        function saveOrder() {
            service.isSaving = true;
            return manager.saveChanges().catch(saveFailed).finally(saveFinally).then(saveOrdersSuccess);
        };

        function saveFinally() {
            service.isSaving = false;
        };

        function saveOrdersSuccess(saveResult) {
            var order = saveResult.entities.filter(function (order) {
                return order.entityType.shortName === 'Order';
            })[0];
            var message = "Saved order " + order.customer;
            logSuccess(message, null, true);

            breeze.EntityQuery.from("Orders").where("id", "eq", order.id).expand("orderDetails")
                .using(manager).execute().then(function (data) {
                    var order = data.results[0];
                    var message = "Retrieved saved order " + order.customer +
                        " and his " + order.orderDetails.length + " books.";
                    logSuccess(message, order, true);


                });
        };

        function saveFailed(error) {
            var msg = 'Save failed: ' + breeze.saveErrorMessageService.getErrorMessage(error);
            error.message = msg;
            logError(msg, error, true);
            throw error;  // same effect as return $q.reject(error)
        };


    }
})();