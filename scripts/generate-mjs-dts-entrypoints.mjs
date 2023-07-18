import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { packages } from '../workspace-packages.mjs';

for (const pkg of packages) {
  if (pkg.type === 'ts' && pkg.environment === 'node') {
    const pkgPath = path.join(process.cwd(), 'packages', pkg.name);
    const pkgJson = require(path.join(pkgPath, 'package.json'));
    if (!pkgJson.exports) {
      throw new Error(`Package ${pkg.name} is missing an exports field.`);
    }

    for (const [key, val] of Object.entries(pkgJson.exports)) {
      // parse exports field entry, generate a .d.ts and .mjs if necessary
      // this is not a complete implementation, we only implement what we need
      // at the moment
      const entrypoint = key === '.' ? 'index' : key.substring(2);
      if (entrypoint.includes('/')) {
        // skip entrypoints with deep paths
        continue;
      }

      let exportedFile;
      let createEsmWrapper = false;

      if (typeof val === 'string') {
        exportedFile = val;
      } else if (typeof val === 'object') {
        if (!val.require) {
          throw new Error(`Export map in package ${pkg.name} has an object but no require field.`);
        }
        exportedFile = val.require;
        createEsmWrapper = true;
      } else {
        throw new Error('Export map is not an object or string.');
      }

      if (createEsmWrapper) {
        // create a ESM wrapper
        const cjsModule = require(path.join(pkgPath, exportedFile));
        const namedExports = Object.keys(cjsModule)
          .filter(name => name !== 'default' && !name.startsWith('_'))
          .join(', ');
        const esmEntrypoint =
          namedExports.length === 0
            ? ''
            : `// this file is autogenerated with the generate-mjs-dts-entrypoints script
import cjsEntrypoint from './dist/index.js';

const { ${namedExports} } = cjsEntrypoint;

export { ${namedExports} };`;
        fs.writeFileSync(path.join(pkgPath, `${entrypoint}.mjs`), esmEntrypoint);
      }

      const fileWithoutExtension = exportedFile.replace(path.extname(exportedFile), '');
      const esmEntrypointDts = `// this file is autogenerated with the generate-mjs-dts-entrypoints script
export * from '${fileWithoutExtension}';`;
      fs.writeFileSync(path.join(pkgPath, `${entrypoint}.d.ts`), esmEntrypointDts);
    }
  }
}
