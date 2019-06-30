const jwt = require('jsonwebtoken');  //用来生成token
var signkey = 'pingfanya';
exports.setToken = function(obj){
	return new Promise((resolve,reject)=>{
        if (!obj) {
            reject('请输入有效JSON的对象文字，缓冲区或字符串。')
        }
		const token = jwt.sign(obj,signkey,{ expiresIn: 60*60*1 });
		resolve(token);
	})
}
exports.verToken = function(token){
	return new Promise((resolve,reject)=>{
        jwt.verify(token,signkey, (err, data) => {
            console.log(data, 'ad')
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
	})
}
