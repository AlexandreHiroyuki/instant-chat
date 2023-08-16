module.exports = {
  arrowParens: 'avoid',
  endOfLine: 'auto',
  useTabs: false,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
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
