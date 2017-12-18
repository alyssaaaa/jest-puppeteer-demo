const puppeteer = require("puppeteer");
const NodeEnvironment = require("jest-environment-node");
const fs = require('fs');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

/**
 * @class CustomNodeEnvironment
 * @description A custom Node Environment that sets up, and tearsdown puppeteer
 */
class CustomNodeEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
    }
    async setup() {
        await super.setup();
        const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
        if (!wsEndpoint) throw new Error('wsEndpoint not found');
        this.global.browser = await puppeteer.connect({
          browserWSEndpoint: wsEndpoint
        });
    }
}
module.exports = CustomNodeEnvironment;
