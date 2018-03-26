// const ErrorHandler = require('./errorHandler.js');
import axios from 'axios';

const CONFIGS = {
  "APP_LOGIN_REDIRECT_URL": "/login",
  "SERVICE_URL_PREFIX": "http://localhost:3003/speedbox/api/v1",
};

const oConfigHeaders = {
  "Content-Type": "application/json",
   crossDomain: true,
};

module.exports = {
  addUser: function (serviceURI, actionType, fnSuccess, fnError) {
    console.log('called till service util---')
    setTimeout(() => {
      console.log('in set time out');
      fnSuccess({
        text: 'from UTILS',
        title: 'from UTILS OK'
      })
    }, 1000)
  },

  doLogin: function (serviceURI, dataToPost, fnSuccess, fnError) {
    console.log('called till service util---')
    // setTimeout(() => {
    //   console.log('in set time out');
    //   fnSuccess({
    //     isLoggedIn: true,
    //     isTokenActive: true
    //   })
    // }, 1000)
    // console.log(dataToPost);
    axios({
      url: `${CONFIGS.SERVICE_URL_PREFIX}${serviceURI}`,
      method: 'post',
      data: dataToPost,
      headers: oConfigHeaders
    })
    .then(function (response) {
      console.log(response.data);
      fnSuccess(response.data);
    })
    .catch(function (error) {
      fnError(error);
      console.log(error);
    });
  },

  getDataFromService: function (serviceURI, params, fnSuccess, fnError) {
    axios({
      url: `${CONFIGS.SERVICE_URL_PREFIX}${serviceURI}`,
      method: 'get',
      data: params,
      headers: oConfigHeaders
    })
    .then(function (response) {
      console.log(response.data);
      fnSuccess(response.data);
    })
    .catch(function (error) {
      fnError(error);
      console.log(error);
    });
  }
}