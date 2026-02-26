import { NextFunction, Request, Response } from 'express';
export const createMockResquest = (
  overrides?: Partial<Request>,
): Partial<Request> => ({
  get: jest.fn(),
  headers: {},
  ...overrides,
});

export const getMockResponse = (
  overrides?: Partial<Response>,
): Partial<Response> => ({
  get: jest.fn(),
  set: jest.fn(),
  ...overrides,
});

export const createMockNext = (): jest.MockedFunction<NextFunction> =>
  jest.fn();
