const ServiceUtil = require('../../../../utils/serviceUtils');
const dummyOrders = require('./dummyData');

export function getOrders(params) {
  return {
    type: 'ADMIN_GET_ORDERS',
    payload: new Promise((resolve, reject) => {
      ServiceUtil.getDataFromService(
        '/admin/orders',
        params,
        function(resolvedData) {
          // console.log('dummyOrders-- ', dummyOrders.order);
          resolve({
            data: dummyOrders.order,
          });
        },
        function(failedData) {
          reject(failedData);
        },
      );
    }),
  };
}
