# litepup

Use Puppeteer to run Lighthouse audits.

--------

## Usage

`npx litepup http://example.com > results.json`

You can also install and run: `npm i litepup`.

You can read your results file at <https://googlechrome.github.io/lighthouse/viewer/>.

If you have trouble running, make sure you have all required dependencies
installed. See [this list](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch).

## Todo

* Allow configuration of literally anything more than the url
* Batch audits (url lists)
* Docker image?
* Friendly CLI reporting (human readable)
* Easy to parse output for CI
* Generate HTML report

## License

[MIT](./LICENSE.md)
