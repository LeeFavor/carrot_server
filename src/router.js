const express = require('express');
const router = express.Router(); // express의 Router 인스턴스 생성

const multer = require('multer');
const upload = multer({ dest: 'storage/' });

const webController = require('./web/controller');
const apiFeedController = require('./api/feed/controller');
const apiUserController = require('./api/user/controller');

const { logRequestTime } = require('./middleware/log');

router.get('/', webController.home);
router.get('/page/:route', webController.page);

router.use(logRequestTime);

router.post('/file', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json(req.file);
});

router.get('/api/phone', apiUserController.phone);
router.put('/api/phone', apiUserController.phoneVerify);
router.post('/api/register', apiUserController.register);
router.get('/api/user/my', apiUserController.show);
router.post('/api/user/my', apiUserController.update);

router.get('/api/feed', apiFeedController.index);
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router; // router를 모듈로 내보냅니다.
