const dev = {
  API: 'http://localhost:7777',
};

const prod = {
  API: '',
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default config;