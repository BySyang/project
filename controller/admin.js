const adminModal = require('../modal/adminModal');

module.exports = {
  adminLog(req, res) {
    let logName = req.body.logName;
    let logPwd = req.body.logPwd;
    adminModal.adminLog(logName, logPwd, (err, data) => {
      if (!err) {
        if (data[0]) {
          req.session.adminState = true;
          res.send('ok');
        } else {
          res.send('fail');
        }
      } else {
        console.log(err)
        res.send('错误')
      }
    })
  },
  adminIsLog(req, res) {
    if (req.session.adminState) {
      res.send('ok');

    } else {
      res.send('fail')
    }
  },
  adminExit(req,res){
    req.session.adminState = null;
    res.send('ok');
  }
}