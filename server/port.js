const isTest = process.env.NODE_ENV === 'test'
const defaultPort = 8081
const defaultTestPort = 8091

module.exports = isTest ? defaultTestPort : process.env.PORT || defaultPort
