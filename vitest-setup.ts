import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

import '@testing-library/jest-dom/vitest';

expect.extend(jestDomMatchers);

afterEach(() => {
  cleanup();
});
