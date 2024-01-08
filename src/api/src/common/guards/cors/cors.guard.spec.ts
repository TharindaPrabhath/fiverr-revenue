import { CorsGuard } from './cors.guard';

describe('CorsGuard', () => {
  it('should be defined', () => {
    expect(new CorsGuard()).toBeDefined();
  });
});
