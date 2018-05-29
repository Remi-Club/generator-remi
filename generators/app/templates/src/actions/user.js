import Request from 'common/request';

export default {
    getUser({data, before, after, success, fail} = {}){
        return function(dispatch) {
            before && before();
            Request.get({
                url: '',
                data,
                success: async ({data}) => {
                    after && after();
                    dispatch({type: 'XXX', data});
                    success && success(data);
                },
                fail: async (errcode) => {
                    after && after();
                    fail && fail(errcode);
                }
            });
        }
    },
};
