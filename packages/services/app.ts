import Koa from 'koa';
import mongoose from 'mongoose';
import router from './router';
import middleware from './middleware';
import socket from './socket';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/db_service');

const app = new Koa();

middleware(app);

app.use(router.routes());
app.use(router.allowedMethods());

socket(app);

app.listen(3000, () => {
	console.log('服务器开启 127.0.0.1:3000');
});
