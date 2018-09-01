const { args, hasFlag } = require('zrgs')
const exit = require('zeelib/lib/exit')
const pup = require('puppeteer')
const lh = require('lighthouse')

const usage = () => {
  console.log('litepup [url]')
  console.log('example: litepup http://zacanger.com')
  exit(0)
}

const config = {
  viewport: {
    width: 1920,
    height: 1080
  }
}

const run = async (url) => {
  try {
    const browser = await pup.launch({
      args: [ '--remote-debugging-port=9222', '--no-sandbox' ]
    })
    const page = await browser.newPage()
    await page.setViewport(config.viewport)
    const { lhr } = await lh(url)
    console.log(JSON.stringify(lhr, null, 2))
    await browser.close()
  } catch (e) {
    console.trace(e)
  }
}

const handleArgs = () => {
  if (!args.length || hasFlag('help')) {
    usage()
  }
  const url = args[args.length - 1]
  run(url)
}

module.exports = handleArgs()
