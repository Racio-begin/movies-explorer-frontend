import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const vitestGlobals = {
	describe: 'readonly',
	it: 'readonly',
	expect: 'readonly',
	beforeEach: 'readonly',
	afterEach: 'readonly',
	vi: 'readonly',
};

export default [
	{ ignores: ['build/**', 'dist/**'] },
	js.configs.recommended,
	{
		files: ['src/**/*.{js,jsx}'],
		...react.configs.flat.recommended,
		languageOptions: {
			...react.configs.flat.recommended.languageOptions,
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.browser,
		},
		settings: { react: { version: 'detect' } },
		plugins: {
			...react.configs.flat.recommended.plugins,
			'react-hooks': reactHooks,
		},
		rules: {
			...react.configs.flat.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	{
		files: ['src/**/*.test.{js,jsx}'],
		languageOptions: { globals: { ...globals.node, ...vitestGlobals } },
	},
];
