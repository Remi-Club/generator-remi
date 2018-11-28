var Config = {
    development: {
        // API_ROOT: 'http://apitool-s.iremi.com/mock/5a9ce52e41c401050055341d/output',
        API_ROOT: 'https://wechat-work-api.iremi.com',
    },
    test: {
        API_ROOT: 'https://wechat-work-api.iremi.com',
    },
    production: {
        API_ROOT: 'https://wechat-work-api.iremi.com',
    },
};

module.exports = Config[__STAGE__];
