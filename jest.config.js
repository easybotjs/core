/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import * as dotenv from "dotenv";
dotenv.config();

const config = {
	rootDir: './',
    displayName: 'Core',
    testMatch: ['**/__tests__/*.test.js'],
    resetModules: true,
};

export default config;