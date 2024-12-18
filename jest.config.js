/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // TypeScript 지원
  testEnvironment: 'jsdom', // Next.js와 호환을 위해 jsdom 설정
  setupFiles: ['dotenv/config', '<rootDir>/jest.setup.ts'], // fetch mocking 설정
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 절대 경로 alias 지원
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // 테스트 제외 경로
};
