/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

declare module 'redux-persist-indexeddb-storage';
import type { AxeMatchers } from 'vitest-axe/matchers';

import 'vitest';

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
