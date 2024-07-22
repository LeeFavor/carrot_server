const express = require('express');
const router = express.Router(); // express의 Router 인스턴스 생성

const multer = require('multer');
const upload = multer({ dest: 'storage/' });
const authenticateToken = require('./middleware/authenticate');

const webController = require('./web/controller');
const apiFeedController = require('./api/feed/controller');
const apiUserController = require('./api/user/controller');
const fileController = require('./api/file/controller');

const { logRequestTime } = require('./middleware/log');

router.get('/', webController.home);
router.get('/page/:route', webController.page);

router.use(logRequestTime);

router.post('/file', upload.single('file'), fileController.upload);
router.get('/file/:id', fileController.download);

// 사용자 관련 라우트
router.post('/auth/phone', apiUserController.phone);
router.put('/auth/phone', apiUserController.phoneVerify);
router.post('/auth/register', apiUserController.register);
router.post('/auth/login', apiUserController.login);

// 피드 관련 라우트, 모든 요청에 인증 필요
router.use(authenticateToken); // 이후 모든 라우트에 인증 적용

router.get('/api/user/my', apiUserController.show);
router.post('/api/user/my', apiUserController.update);

router.get('/api/feed', apiFeedController.index);
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router; // router를 모듈로 내보냅니다.
