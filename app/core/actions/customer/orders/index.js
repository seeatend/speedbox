const ServiceUtil = require('../../../../utils/serviceUtils');

export function getOrders(params) {
  // console.log('In Action---', data)
  return {
    type: "CUSTOMER_GET_ORDERS",
    payload: new Promise((resolve, reject) => {
      ServiceUtil.getDataFromService('/customer/orders', params, function (resolvedData) {
        resolve(resolvedData);
      }, function (failedData) {
        reject(failedData);
      })
    })
  };
}

