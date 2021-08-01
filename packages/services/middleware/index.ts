import Koa from 'koa';
import path from 'path';
import staticService from 'koa-static';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import compress from 'koa-compress';

type Mid = (context: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>, next: Koa.Next) => any;

const notFound: Mid = async (ctx, next) => {
	next();
	if (ctx.status == 404) {
		ctx.status = 404;
		ctx.body = 'Resource Not Found';
	}
};

export default (app: Koa): void => {
	[
		cors({ origin: '*' }),
		notFound, // 404
		compress({ threshold: 2048 }),
		staticService(path.join(__dirname, '../static')), // 静态资源
		bodyParser(),
	].forEach(mid => {
		app.use(mid);
	});
};
