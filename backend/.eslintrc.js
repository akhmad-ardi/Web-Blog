module.exports = {
	"root": true,
	"env": {
		"es2021": true,
		"node": true
	},
	"extends": [
		"airbnb",
		"airbnb-typescript",
		"plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript"
	],
	"settings": {
		"import/resolver": {
				"typescript": true
		}
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module",
		"project": "./tsconfig.json",
		"tsconfigRootDir": __dirname,
	},
	"plugins": [
		"@typescript-eslint",
		"import"
	],
	"rules": {
		"@typescript-eslint/quotes": ["error", "double"],
		"@typescript-eslint/no-unused-vars": "warn"
	}
}
