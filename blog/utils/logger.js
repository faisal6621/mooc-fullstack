const info = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

const debug = (...params) => {
  console.debug(...params)
}

module.exports = {
  info, error, debug,
}
