const ServiceUtil = require('../../../../utils/serviceUtils');
const dummyOrders = require('./dummyData');
const base64Data = require('./base64Data');

export const cleanBulkData = {
  type: "CLEAN_BULK_DATA"
};

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

const bulkApiUrls = {
  changeStatus: "/admin/orders",
  downloadCSP: "/admin/orders",
  downloadShipping: "/admin/orders",
  downloadInvoice: "/admin/orders",
  downloadArchive: "/admin/orders",
  sendToCSP: "/admin/orders",
  cancelUnprocessed: "/admin/orders"
}

export function ordersBulkActions(bulk, params) {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log(params)
  return {
    type: 'ADMIN_ORDERS_BULK',
    payload: new Promise((resolve, reject) => {
      ServiceUtil.getDataFromService(
        bulkApiUrls[bulk],
        params,
        function(resolvedData) {
          resolve({
            data: base64Data.base64string,
          });
        },
        function(failedData) {
          reject(failedData);
        },
      );
    }),
  };
}
