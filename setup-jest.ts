// setup-jest.ts
import 'jest-preset-angular/setup-jest';

// Opcional: Mocks para el DOM
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({ display: 'none' }),
});
