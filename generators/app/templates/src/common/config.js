var Config = {
    development: {
        // API_ROOT: 'http://apitool-s.iremi.com/mock/5a9ce52e41c401050055341d/output',
        API_ROOT: 'https://wechat-work-api.iremi.com',
        CLIENT_HOST: 'https://wechat-work.iremi.com/www',
        MOBILE_HOST: 'https://wechat-work.iremi.com/app',
    },
    test: {
        API_ROOT: 'https://wechat-work-api.iremi.com',
        CLIENT_HOST: 'https://wechat-work.iremi.com/www',
        MOBILE_HOST: 'https://wechat-work.iremi.com/app',
    },
    production: {
        API_ROOT: 'https://wechat-work-api.iremi.com',
        CLIENT_HOST: 'https://wechat-work.iremi.com/www',
        MOBILE_HOST: 'https://wechat-work.iremi.com/app',
    },
};

module.exports = Config[process.env.NODE_ENV];
