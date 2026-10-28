module.exports = {
  plugins: ['@firebase/security-rules'],
  rules: {
    '@firebase/security-rules/no-unauthorized-access': 'error',
    '@firebase/security-rules/no-public-read': 'error',
    '@firebase/security-rules/no-public-write': 'error'
  }
};
