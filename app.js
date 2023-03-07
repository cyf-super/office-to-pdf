const Koa = require('koa');
const cors = require('koa2-cors')
const path = require('path')

const router = require('./router/index.js')
const { koaBody } = require('koa-body')

var app = new Koa();
app.use(cors())
app.use(
	koaBody({
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, '/upload/office'),
			keepExtensions: true
		}
	})
)

app.use(router.routes())

var port = 3001;
app.listen(port, function () {
    console.log("http://localhost:".concat(port, "/"));
});
