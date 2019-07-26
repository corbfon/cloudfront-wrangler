module.exports = (err, exit) => {
    // console.error(err.message)
    if (err.message) console.error(err.message)
    else console.error(err)
    exit && process.exit(1)
  }