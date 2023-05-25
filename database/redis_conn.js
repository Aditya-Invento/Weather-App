const Redis = require("ioredis");
const redisClient = new Redis(`redis://${process.env.REDIS_USER}:${process.env.REDIS_PWD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/#${process.env.REDIS_DB}`);
redisClient.on('ready',()=>console.log('=> REDIS_DB: CONNECTED 🤖'));
redisClient.on('reconnecting',()=>console.log('=> REDIS_DB: RECONNECTING 🔗'));
redisClient.on('error',(err)=>console.log(err,'=> REDIS_DB: ERROR 🚨'));

async function get_rd_data(key,parse=true) {
    try {
        if(typeof key !== 'string' || !key) return Promise.reject({message:'A key is required'});
        const data = await redisClient.get(key);
        if(data) {
            const final_data = parse ? JSON.parse(data) : data;
            return Promise.resolve(final_data);
        }
        return Promise.resolve(false);
    } catch(err) {
        return Promise.reject(err);
    }
};
async function set_rd_data(key,data,stringify=true) {
    try {
        if(typeof key !== 'string' || !key) return Promise.reject({message:'A key is required'});
        const final_data = stringify ? JSON.stringify(data) : data;
        await redisClient.set(key,final_data,'ex',600); // 600sec === 10mins
        return Promise.resolve(true);
    } catch(err) {
        return Promise.reject(err);
    }
}

module.exports = {
    get_rd_data,set_rd_data,redisClient:redisClient
};