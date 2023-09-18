import os from 'os';
import { runIntegrationTests } from '../../../integration/test-runner';
import { playwrightLauncher } from '../src/index';

describe('test-runner-playwright chromium @slow', function testRunnerPlaywright() {
  this.timeout(100000);

  function createConfig() {
    return { browsers: [playwrightLauncher({ product: 'chromium' })] };
  }

  runIntegrationTests(createConfig, {
    basic: true,
    many: true,
    focus: true,
    groups: true,
    parallel: true,
    testFailure: true,
    locationChanged: true,
  });
});

describe('test-runner-playwright webkit @slow', function testRunnerPlaywright() {
  this.timeout(100000);

  function createConfig() {
    return { browsers: [playwrightLauncher({ product: 'webkit' })] };
  }

  runIntegrationTests(createConfig, {
    basic: true,
    many: true,
    focus: true,
    groups: true,
    parallel: true,
    testFailure: true,
    locationChanged: true,
  });
});

// we don't run all tests in the windows CI
if (os.platform() !== 'win32') {
  describe('test-runner-playwright firefox @slow', function testRunnerPlaywright() {
    this.timeout(100000);

    function createConfig() {
      return { browsers: [playwrightLauncher({ product: 'firefox' })] };
    }

    runIntegrationTests(createConfig, {
      basic: true,
      many: true,
      focus: true,
      groups: true,
      // firefox doesn't like parallel in the CI
      parallel: false,
      testFailure: true,
      locationChanged: true,
    });
  });

  describe('test-runner-playwright all @slow', function testRunnerPlaywright() {
    this.timeout(100000);

    function createConfig() {
      return {
        browsers: [
          playwrightLauncher({ product: 'chromium' }),
          playwrightLauncher({ product: 'firefox' }),
          playwrightLauncher({ product: 'webkit' }),
        ],
      };
    }

    runIntegrationTests(createConfig, {
      basic: true,
      many: true,
      focus: true,
      groups: true,
      parallel: false,
      testFailure: false,
      locationChanged: false,
    });
  });
}
