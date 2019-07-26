const AWS = require('aws-sdk')
const ora = require('ora')
const error = require('./../utils/error')

const cloudwatch = new AWS.CloudWatchLogs({ region: 'us-west-2' })

let logStreamName, logGroupName

const logEvents = events => {
    events.forEach(({ message }) => {
        console.log(message)
    })
}

const startLogs = () => {
    const spinner = ora().start()
    setStreamName()
        .then(() => cloudwatch.getLogEvents({ logGroupName, logStreamName, startFromHead: false, limit: 10 }).promise())
        .then(data => {
            spinner.stop()
            let { nextForwardToken: nextToken } = data
            logEvents(data.events)

            setInterval(() => {
                spinner.start()
                cloudwatch.getLogEvents({ logGroupName, logStreamName, nextToken }, (err, data) => {
                    spinner.stop()
                    if (err) return console.error(err)
                    if (data.nextForwardToken !== nextToken) {
                        logEvents(data.events)
                        nextToken = data.nextForwardToken
                    }
                })
            }, 2000)
        })
        .catch(err => {
            spinner.stop()
            error(err.message, true)
        })
}

const setStreamName = () => cloudwatch.describeLogStreams({ logGroupName }).promise()
    .then(({ logStreams }) => logStreams.reduce((prev, current) => (prev.lastEventTimestamp > current.lastEventTimestamp) ? prev : current))
    .then(({ logStreamName: logName }) => (logStreamName = logName))

const startStreamRefresh = () => {
    setInterval(() => {
        setStreamName().catch(err => error(err.message, true))
    }, 2000)
}

module.exports = (args) => {
    if (!args.name) throw new Error('no log name provided - must specify an argument for name')
    logGroupName = args.name
    console.log('fetching logs...')
    if (args['refresh-stream']) {
        console.log('fetching logs in refresh-stream mode')
        startStreamRefresh()
    }
    startLogs()
}