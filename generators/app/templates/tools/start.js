const webpack = require('webpack');
const config = require('./webpack_dev.config.js');
const WebpackDevServer = require('webpack-dev-server');

const PORT = <%=port%>;
const HOST_URL = 'http://127.0.0.1:' + PORT;

config.entry.entry.unshift("webpack-dev-server/client?" + HOST_URL, "webpack/hot/dev-server");

var compile = webpack(config);
var server = new WebpackDevServer(compile, {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    quiet: false,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    proxy: {
        '/*': {
            secure: false,
            bypass: function(req, res, proxyOptions) {
                var url = req.url;
                if (/\/dist\//.test(url)) {
                    return url;
                }
                return '/src/index.html';
            }
        }
    }
});

server.listen(PORT, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('listening at port: ' + PORT);
});
