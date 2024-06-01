export enum ROLES {
  BASIC = 'BASIC',
  ADMIN = 'ADMIN',
}

export enum ACCESS_LEVEL {
  MANTEINER = 40,
  OWNER = 50,
}

export const SharedTypes = {
  PRISMA: Symbol('Prisma'),
  USER_REPO: Symbol('UserRepository'),
  MOVIE_REPO: Symbol('MovieRepository'),
  SWAPI_REPO: Symbol('SwapiRepository'),
};

export const PUBLIC_KEY = 'PUBLIC';
export const ROLES_KEY = 'ROLES';
export const ADMIN_KEY = 'ADMIN';
export const ACCESS_LEVEL_KEY = 'ACCESS_LEVEL';
export const ORGIGIN_SWAPI = 'SWAPI_API';
