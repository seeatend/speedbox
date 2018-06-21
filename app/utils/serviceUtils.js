// const ErrorHandler = require('./errorHandler.js');
import axios from 'axios';

const CONFIGS = {
  APP_LOGIN_REDIRECT_URL: '/login',
  SERVICE_URL_PREFIX: 'http://localhost:3003/speedbox/api/v1',
};

const oConfigHeaders = {
  'Content-Type': 'application/json',
  crossDomain: true,
  credentials: 'same-origin',
};

function getCookieByName(name) {
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getCookie() {
  return getCookieByName('token');
}

module.exports = {
  addUser: function(serviceURI, actionType, fnSuccess, fnError) {
    console.log('called till service util---');
    setTimeout(() => {
      console.log('in set time out');
      fnSuccess({
        text: 'from UTILS',
        title: 'from UTILS OK',
      });
    }, 1000);
  },

  doLogin: function(serviceURI, dataToPost, fnSuccess, fnError) {
    console.log('called till service util---');
    // setTimeout(() => {
    //   console.log('in set time out');
    //   fnSuccess({
    //     isLoggedIn: true,
    //     isTokenActive: true
    //   })
    // }, 1000)
    // console.log(dataToPost);
    dataToPost.token = getCookie();
    dataToPost.loginType = 'admin';
    axios({
      url: `${CONFIGS.SERVICE_URL_PREFIX}${serviceURI}`,
      method: 'post',
      data: dataToPost,
      headers: oConfigHeaders,
      credentials: 'same-origin',
    })
      .then(response => {
        console.log(response.data);
        fnSuccess(response.data);
      })
      .catch(error => {
        fnError(error);
        console.log(error);
      });
  },

  getDataFromService: function(serviceURI, params, fnSuccess, fnError) {
    if (serviceURI === '/admin/orders') {
      console.log('ajkasjkjkas ')
      setTimeout(() => {
        fnSuccess();
      }, 3000);
    } else {
      axios({
        url: `${CONFIGS.SERVICE_URL_PREFIX}${serviceURI}?token=${getCookie()}`,
        method: 'get',
        data: params,
        headers: oConfigHeaders,
      })
        .then(response => {
          console.log(response.data);
          fnSuccess(response.data);
        })
        .catch(error => {
          fnError(error);
          console.log(error);
        });
    }
  },
};
