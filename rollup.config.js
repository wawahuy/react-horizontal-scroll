const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const terser  = require('@rollup/plugin-terser');
const pkg = require('./package.json');

const isProduction = !process.env.IS_DEVELOPMENT;
const sourcemap = !isProduction;

module.exports = {
  input: 'src/index.tsx',
  watch: {
    include: 'src/**/*',
    exclude: 'node_modules/**/*',
    chokidar: {
      usePolling: true
    }
  },
  external: ['react', 'react-dom'],
  plugins: [
    babel({
      babelHelpers: "runtime",
      exclude: "**/node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript({ sourceMap: sourcemap, tsconfig: './tsconfig.json' }),
    commonjs(),
    // postcss({
    //   modules: false,
    //   use: ['sass']
    // }),
    // isProduction && terser({ sourceMap: sourcemap }),
  ],
  output: [
    {
      name: "react-horizontal-vertical",
      file: pkg.main,
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap
    },
    { file: pkg.module, format: 'esm', sourcemap }
  ]
};
