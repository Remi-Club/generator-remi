var index = {
    get: function(k){
        var data = sessionStorage.getItem('remiUser');
        var user = data ? JSON.parse(data) : {};
        if(k){
            return user[k];
        }else{
            return user;
        }
    },
    //可以用key, value的形式或对象的形式赋值
    set: function(k, v){
        var user = this.get();
        if(typeof k === 'object'){
            for(var i in k){
                user[i] = k[i];
            }
        }else{
            user[k] = v;
        }
        sessionStorage.setItem('remiUser', JSON.stringify(user));
    },
    clear: function(){
        sessionStorage.removeItem('remiUser');
    }
};

module.exports = index;
