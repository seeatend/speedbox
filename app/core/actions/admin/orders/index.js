const ServiceUtil = require('../../../../utils/serviceUtils');

export function getOrders(params) {
  // console.log('In Action---', data)
  return {
    type: "ADMIN_GET_ORDERS",
    payload: new Promise((resolve, reject) => {
      ServiceUtil.getDataFromService('/admin/orders', params, function (resolvedData) {
        resolve(resolvedData);
      }, function (failedData) {
        reject(failedData);
      })
    })
  };
}

