let express = require('express')
const api = require('./api')
const ase = require('./ase')
const config = require('./config')
const black_list = config.black_list
const router = express.Router()

const err1 = ase.Encrypt(JSON.stringify({ code: 0, msg: '操作失败' }))
const err2 = ase.Encrypt(JSON.stringify({ code: 0, msg: '你很无聊吗？' }))

//获取客户端真实ip;
function getClientIp(req) {
	return req.ip
}

router.get('/*', (req, res, next) => {
	const ip = getClientIp(req).split(':')
	if (black_list.includes(ip[ip.length - 1])) {
		res.json(err2)
		return
	}
	try {
		JSON.parse(ase.Decrypt(req.query.param))
		next()
	} catch (err) {
		res.json(err1)
		return
	}
})
router.post('/*', (req, res, next) => {
	const ip = getClientIp(req).split(':')
	if (black_list.includes(ip[ip.length - 1])) {
		res.json(err2)
		return
	}
	try {
		JSON.parse(ase.Decrypt(req.body.param))
		next()
	} catch (err) {
		res.json(err1)
		return
	}
})

router.get('/getblogs', (req, res, next) => {
	api.getBlogs(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getBlogDetail', (req, res, next) => {
	api.getBlogDetail(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/login', (req, res, next) => {
	api.login(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getTag', (req, res, next) => {
	api.getTag(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getType', (req, res, next) => {
	api.getType(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getFilingList', (req, res, next) => {
	api.getFilingList(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getArticleView', (req, res, next) => {
	api.getArticleView(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getTypeView', (req, res, next) => {
	api.getTypeView(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getDateVisit', (req, res, next) => {
	api.getDateVisit(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getHourVisit', (req, res, next) => {
	api.getHourVisit(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getCityVisit', (req, res, next) => {
	api.getCityVisit(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getDateCityVisit', (req, res, next) => {
	api.getDateCityVisit(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getComment', (req, res, next) => {
	api.getComment(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getAllComment', (req, res, next) => {
	api.getAllComment(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})
router.get('/getNeedReadComment', (req, res, next) => {
	api.getNeedReadComment(JSON.parse(ase.Decrypt(req.query.param)), res, next)
})

router.post('/editBlogById', (req, res, next) => {
	api.editBlogById(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/addBlog', (req, res, next) => {
	api.addBlog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/addTag2Blog', (req, res, next) => {
	api.addTag2Blog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/deleteTag2Blog', (req, res, next) => {
	api.deleteTag2Blog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/visitBlog', (req, res, next) => {
	api.visitBlog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/toTopBlog', (req, res, next) => {
	api.toTopBlog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/deleteBlog', (req, res, next) => {
	api.deleteBlog(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/addTag', (req, res, next) => {
	api.addTag(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/addType', (req, res, next) => {
	api.addType(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/deleteTag', (req, res, next) => {
	api.deleteTag(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/visit', (req, res, next) => {
	const ip = getClientIp(req).split(':')
	const clientIp = ip[ip.length - 1]
	const params = JSON.parse(ase.Decrypt(req.body.param))
	params.clientIp = clientIp
	api.visit(params, res, next)
})
router.post('/addComment', (req, res, next) => {
	const ip = getClientIp(req).split(':')
	const clientIp = ip[ip.length - 1]
	const params = JSON.parse(ase.Decrypt(req.body.param))
	params.clientIp = clientIp
	api.addComment(params, res, next)
})
router.post('/readComment', (req, res, next) => {
	api.readComment(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/readAllComment', (req, res, next) => {
	api.readAllComment(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})
router.post('/setCommentShow', (req, res, next) => {
	api.setCommentShow(JSON.parse(ase.Decrypt(req.body.param)), res, next)
})

module.exports = router
