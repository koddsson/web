import { expect } from '../../../../../node_modules/chai/esm/chai.js';

it('bad predicate', function() {
  const fixture = { x: 'x' }
  fixture.circle = fixture;
  expect(fixture).to.equal(null);
})
