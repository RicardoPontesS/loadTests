import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Define variables for port and base URL
const PORT = 8080;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export const options = {
  vus: 100,
  duration: '120s',
};

function generateRandomUser() {
  const name = `User_${randomString(8)}`;
  const email = `${randomString(8)}@loadtest.com`;
  const password = randomString(12);
  return { name, email, password };
}

export default function () {
  const user = generateRandomUser();

  // Signup request
  const signupUrl = `${BASE_URL}/signup`;
  const signupPayload = {
    Nome: user.name,
    Email: user.email,
    Senha: user.password
  };
  const signupParams = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'HX-Request': 'true',
      'HX-Trigger': 'signup-form',
      'HX-Target': '#error-messages',
      'HX-Current-URL': signupUrl
    },
  };
  const signupRes = http.post(signupUrl, signupPayload, signupParams);
  check(signupRes, {'signup status should be 200': (r) => r.status === 200});
  sleep(2);

  // Login request
  const loginUrl = `${BASE_URL}/login`;
  const loginPayload = {
    Email: user.email,
    Senha: user.password
  };
  const loginParams = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'HX-Request': 'true',
      'HX-Trigger': 'login-form',
      'HX-Target': '#error-messages',
      'HX-Current-URL': loginUrl
    },
  };
  const loginRes = http.post(loginUrl, loginPayload, loginParams);
  check(loginRes, {'login status should be 200': (r) => r.status === 200});
  sleep(2);
}
