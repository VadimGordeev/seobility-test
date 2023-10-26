module.exports = {
  '*.{json,css,scss,md,html}': ['prettier --write'],
  'src/**/*.{js}': (filenames) =>
    filenames.length <= 10
      ? `eslint --fix ${filenames.join(' ')}`
      : 'eslint --fix .',
  'package.json': () =>
    'node scripts/lint.mjs --fix --skip-eslint --skip-ts --skip-json'
};
