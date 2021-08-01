import Koa from 'koa';
import IO from 'koa-socket';

const io = new IO();

export default (app: Koa): void => {
	io.attach(app);
};
