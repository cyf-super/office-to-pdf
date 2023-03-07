const fs = require('fs')
const path = require('path')
const router = require('koa-router')()
const transform = require('../util/transform.js')
// const router = Router()
const pdfPath = '/upload/pdf'


router.get('/file-data', async (ctx, next) => {
  try {
    await next()
    const data = await handleReaddir(pdfPath)
    console.log('data  ', data)
    let dataList = {
				code: 200,
				data: []
			}
    data.forEach((item) => {
      dataList.data.push(`${pdfPath}/${item}`)
    })
    ctx.response.body = dataList
  } catch (error) {
    console.log('error ', error)
    ctx.response.body = { code: 500, msg: error }
  }
})

router.post('/upload', async (ctx, next) => {
  try {
		await next()
		const file = ctx.request.files.file // 获取上传文件
		const reader = fs.createReadStream(file.filepath) // 创建可读流
		const fileInfoArr = file.originalFilename.split('.')
		const ext = fileInfoArr.pop()
		const fileName = fileInfoArr.pop()
		// 创建可写流
		const upStream = fs.createWriteStream(`upload/office/${fileName}-${Math.random().toString().slice(-6)}.${ext}`)
		reader.pipe(upStream)
		const filePath = path.join(__dirname, '..', pdfPath)
		const data = await transform(upStream.path, filePath)
		if (data) ctx.body = '上传成功'
	} catch (error) {
    ctx.body = '上传失败'
  }
})

// 读取文件夹
function handleReaddir(pdfPath) {
  const path1 = path.join(__dirname, '..', pdfPath)
	return new Promise((resolve, reject) => {
		fs.readdir(path1, (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}

module.exports = router
