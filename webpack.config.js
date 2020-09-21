const path = require('path');

module.exports = {
    entry: {
        kbandits:'./src/k-bandits.js',
    }, 
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'  // where js files would be bundled to
   },
   module: {
        rules: [
        {
            test: /\.js$/, //using regex to tell babel exactly what files to transcompile
            exclude: /node_modules/, // files to be ignored
            use: {
                loader: 'babel-loader' // specify the loader
            } 
        }
        ]
    }
 } 