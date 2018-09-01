const fetch = require('node-fetch')
const launcher = require('chrome-launcher')
const pup = require('puppeteer')
const lh = require('lighthouse')
const { args, hasFlag } = require('zrgs')
const exit = require('zeelib/lib/exit')

const usage = () => {
  console.log('litepup [url]')
  console.log('example: litepup http://zacanger.com')
  exit(0)
}

const run = async (url) => {
  const opts = {
    // chromeFlag: [ '--headless' ],
    logLevel: 'info',
    output: 'json'
  }

  const chrome = await launcher.launch(opts)
  opts.port = chrome.port

  const res = await fetch(url)
  const { webSocketDebuggerUrl } = JSON.parse(res.body)
  const browser = await pup.connect({ browserWSEndpoint: webSocketDebuggerUrl })

  const { lhr } = await lh(url, opts, null)
  console.log(Object.values(lhr.categories).map((c) => c.score).join(', '))
  await browser.disconnect()
  await chrome.kill()
}

const handleArgs = () => {
  if (!args.length || hasFlag('help')) {
    usage()
  }
  const url = args[args.length - 1]
  run(url)
}

module.exports = handleArgs()
