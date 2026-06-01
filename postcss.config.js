import postcssImport from 'postcss-import';

// Used by `build:css` to inline the @imports in src/styles/index.css into a
// single published dist/styles.css.
export default {
  plugins: [postcssImport()],
};
