const menus = {
    main: `
      wrangle [command] <options>
  
      fetch .............. fetch logs for a given stream
      version ............ show package version
      help ............... show help menu for a command
      `,
  
    fetch: `
      wrangle fetch <options> fetches the latest log stream
  
      --name, -n ........ the group name of the log streams
      `,
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }