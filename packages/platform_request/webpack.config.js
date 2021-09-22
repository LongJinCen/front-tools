const path = require('path')

const tsConfig = {
  commonjs: {
    target: 'es5',
    module: 'CommonJS'
  },
  es: {
    target: 'esnext',
    module: 'esnext',
  }
}

module.exports = (envs) => {
  const library = {}
  if (envs.type === 'commonjs') {
    library.name = 'adRequest'
    library.type = 'commonjs'
  } else if (envs.type === 'es') {
    library.type = 'module'
  }
  return {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      filename: `adRequest.${envs.type}.js`,
      path: path.resolve(__dirname, './dist'),
      library
    },
    experiments: {
      outputModule: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  ...tsConfig[envs.type],
                }
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        Src: path.resolve(__dirname, '../src')
      }
    }
  }
}