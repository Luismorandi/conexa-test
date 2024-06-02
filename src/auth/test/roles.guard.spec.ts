import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

import { RolesGuard } from '../application/guards/roles.guard';

jest.mock('@nestjs/core');

const reflectorMock = {
  get: jest.fn(),
};

const contextMock = {
  getHandler: jest.fn(),
  switchToHttp: jest.fn().mockReturnValue({ getRequest: jest.fn() }),
} as unknown as ExecutionContext;

const guard = new RolesGuard(reflectorMock as unknown as Reflector);

describe('RolesGuard', () => {
  beforeEach(() => {
    (reflectorMock.get as jest.Mock).mockClear();
    (contextMock.getHandler as jest.Mock).mockClear();
    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(),
    });
  });

  it('should allow access for public routes', () => {
    reflectorMock.get.mockReturnValueOnce(true);

    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: 'user' })),
    });

    const canActivate = guard.canActivate(contextMock);
    expect(canActivate).toBe(true);
  });

  it('should allow access for public routes with roleUser = "any"', () => {
    reflectorMock.get.mockReturnValueOnce(true);

    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: 'any' })),
    });

    const canActivate = guard.canActivate(contextMock);
    expect(canActivate).toBe(true);
  });

  it('should allow access for protected routes with required role', () => {
    reflectorMock.get.mockReturnValueOnce(false);
    reflectorMock.get.mockReturnValueOnce(['ADMIN']);

    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: 'ADMIN' })),
    });

    const canActivate = guard.canActivate(contextMock);
    expect(canActivate).toBe(true);
  });

  it('should deny access for protected routes with non-matching roles', () => {
    reflectorMock.get.mockReturnValueOnce(false);
    reflectorMock.get.mockReturnValueOnce(['ADMIN']);
    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: 'BASIC' })),
    });

    const canActivate = guard.canActivate(contextMock);

    expect(canActivate).toBe(false);
  });

  it('should deny access for protected route undefined roles', () => {
    reflectorMock.get.mockReturnValueOnce(false);
    reflectorMock.get.mockReturnValueOnce(['ADMIN']);
    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: undefined })),
    });

    const canActivate = guard.canActivate(contextMock);

    expect(canActivate).toBe(false);
  });

  it('should deny access for protected route invalid roles', () => {
    reflectorMock.get.mockReturnValueOnce(false);
    reflectorMock.get.mockReturnValueOnce(['ADMIN']);
    (contextMock.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: jest.fn(() => ({ roleUser: 'fakeRole' })),
    });

    const canActivate = guard.canActivate(contextMock);

    expect(canActivate).toBe(false);
  });
});
