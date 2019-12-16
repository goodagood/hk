
const path = require('path');

module.exports = {
    entry: 'single.src.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }

};
