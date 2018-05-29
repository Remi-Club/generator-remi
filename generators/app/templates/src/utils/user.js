let currentUser = null; //在内存中同步user

let user = {
    //有k返回响应字段，没有返回整个user对象
    get: function(k) {
        if (currentUser) {
            let user = currentUser;
            if (k) {
                return user[k];
            } else {
                return user;
            }
        }
        var data = localStorage.getItem('remiUser');
        if (!data) {
            return null;
        }
        var user = JSON.parse(data);
        currentUser = user;
        if (k) {
            return user[k];
        } else {
            return user;
        }
    },
    //可以用key, value的形式或对象的形式赋值
    set: function(k, v) {
        var user = this.get();
        if (!user) {
            user = {};
        }
        if (typeof k === 'object') {
            for (var i in k) {
                user[i] = k[i];
            }
        } else {
            user[k] = v;
        }
        localStorage.setItem('remiUser', JSON.stringify(user));
        currentUser = user;
        return user;
    },
    clear: function() {
        localStorage.removeItem('remiUser');
        currentUser = null;
    }
};

module.exports = user;
