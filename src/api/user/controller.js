exports.phone = (req, res) =>{
    res.send('인증번호 발송');
}
exports.phoneVerify = (req, res) =>{
    res.send('인증번호 검증');
}
exports.register = (req, res) =>{
    res.send('회원가입');
}
exports.show = (req, res) =>{
    res.send('마이페이지');
}
exports.update = (req, res) =>{
    res.send('마이페이지 수정');
}