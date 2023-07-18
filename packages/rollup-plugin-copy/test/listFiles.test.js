import path from 'path';
import { expect } from 'chai';

import { listFiles } from '../src/listFiles.js';

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('listFiles', () => {
  it('gives a list of files', async () => {
    const files = await listFiles('*.svg', path.resolve(__dirname, './fixture/'));
    expect(files.length).to.equal(2);
    expect(files[0]).to.match(/fixture(\/|\\)a\.svg$/);
    expect(files[1]).to.match(/fixture(\/|\\)b\.svg$/);
  });

  it('only gives files and no folders', async () => {
    const files = await listFiles('**/*.svg', path.resolve(__dirname, './fixture/'));
    expect(files.length).to.equal(4);
    expect(files[0]).to.match(/fixture(\/|\\)a\.svg$/);
    expect(files[1]).to.match(/fixture(\/|\\)b\.svg$/);
    expect(files[2]).to.match(/fixture(\/|\\)sub(\/|\\)sub-a\.svg$/);
    expect(files[3]).to.match(/fixture(\/|\\)sub(\/|\\)sub-b\.mark\.svg$/);
  });

  it('will copy files inside dot folders', async () => {
    const files = await listFiles('**/*.svg', path.resolve(__dirname, './fixtureDot/'));
    expect(files.length).to.equal(1);
    expect(files[0]).to.match(/fixtureDot(\/|\\)\.folder(\/|\\)inside-dot-folder\.svg$/);
  });
});
