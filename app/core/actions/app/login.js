const ServiceUtil = require('../../../utils/serviceUtils');

export function doLogin(data) {
  // console.log('In Action---', data)
  return {
    type: "LOGIN_USER",
    payload: new Promise((resolve, reject) => {
      ServiceUtil.doLogin('/login', data, function (resolvedData) {
        resolve(resolvedData);
      }, function (failedData) {
        reject(failedData.responseJSON);
      })
    })
  };
}

