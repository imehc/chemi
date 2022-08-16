module.exports = {
  mode: 'jit',
  content: [ // 作用范围
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
      require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
};
