import { fileURLToPath } from 'node:url';
import path from 'path';
import {
  createTestServer as originalCreateTestServer,
  timeout,
  fetchText,
  expectIncludes,
  virtualFilesPlugin,
} from '../src/test-helpers.js';
import { DevServerCoreConfig } from '../src/server/DevServerCoreConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createTestServer(config: Partial<DevServerCoreConfig> = {}) {
  return originalCreateTestServer({
    rootDir: path.resolve(__dirname, 'fixtures', 'basic'),
    ...config,
  });
}

export { timeout, fetchText, expectIncludes, virtualFilesPlugin };
