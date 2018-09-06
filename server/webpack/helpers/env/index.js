const dotenv = require('dotenv')
const path = require('path')

const TEST_ENV = 'test'
const ADONIS_TEST_ENV = 'testing'
const PRODUCTION_ENV = 'production'
const TRUE_STRING = 'true'
const DEVELOP_BRANCH = 'develop'
const MASTER_BRANCH = 'master'
const ENV_TESTING_PATH = '/../../../../../../.env.testing'
const ENV_PATH = '/../../../../.env'

let envPath = ENV_PATH
let envTestingPath = ENV_TESTING_PATH

class Env {
  static isTest() {
    return this.isEnvironment(TEST_ENV) || this.isEnvironment(ADONIS_TEST_ENV)
  }

  static isProduction() {
    return this.isEnvironment(PRODUCTION_ENV)
  }

  static isEnvironment(name) {
    return (process.env.NODE_ENV || '').toLowerCase() === name
  }

  static isCi() {
    return process.env.CI === TRUE_STRING
  }

  static getCiBranch() {
    return process.env.BITBUCKET_BRANCH
  }

  static getAppUrl() {
    let appUrl
    if (Env.isProduction()) {
      appUrl = process.env.APP_URL
      if (Env.isCi()) {
        if (Env.getCiBranch() === DEVELOP_BRANCH) {
          appUrl = process.env.APP_URL_BETA
        }

        if (Env.getCiBranch() === MASTER_BRANCH) {
          appUrl = process.env.APP_URL_PROD
        }
      }
    } else if (Env.isTest()) {
      try {
        Env.loadEnvAsNode({ withTest: true })
        appUrl = Env.getAppUrlFromEnv()
      } catch (e) {
        throw e
      }
    } else {
      Env.loadEnvAsNode({ withTest: false })
      appUrl = Env.getAppUrlFromEnv()
    }

    return appUrl
  }

  static getAppUrlFromEnv() {
    const host = process.env.HOST
    const port = process.env.PORT
    return `http://${host}:${port}/`
  }

  static setEnvPath(path) {
    envPath = path
  }

  static setEnvTestingPath(path) {
    Env.envTestingPath = path
  }
}

module.exports = Env
