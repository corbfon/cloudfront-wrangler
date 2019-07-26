/** Author: corbfon 7/25/2019 */

const minimist = require('minimist')
const error = require('./utils/error')

const args = minimist(process.argv.slice(2), {
    alias: {
        name: 'n',
        'refresh-stream': 'rs'
    }
})

module.exports = async () => {
    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'fetch':
            require('./cmds/fetch')(args)
            break
        case 'version':
            require('./cmds/version')(args)
            break
        case 'help':
            require('./cmds/help')(args)
            break
        default:
            error(`"${cmd}" is not a valid command!`, true)
    }
}