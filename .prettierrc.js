module.exports = {
	arrowParens: 'avoid',
	endOfLine: 'auto',
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	pluginSearchDirs: ['.'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
}
