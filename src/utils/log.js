module.exports = events => {
    events.forEach(({ message }) => {
        console.log('message', message)
    })
}