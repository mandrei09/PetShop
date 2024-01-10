import { TruncatePipe } from './Truncate.pipe';

describe('Pipe: Truncatee', () => {
  it('create an instance', () => {
    let pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });
});
