module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'js/**/*.js',
    '!**/node_modules/**'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jsdom|@exodus/bytes|html-encoding-sniffer)/)'
  ]
};
