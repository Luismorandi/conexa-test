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
};
