const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const mongoose = require('mongoose');
const config = require('./config/key');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('hello world'));
app.post('/api/users/register', (req, res) => {
  // 회원가입 할때 필요한 정보들을 DB에 저장한다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
  // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    // 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });
      }
      // 3. 1,2번 조건이 만족 한다면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 쿠키에 저장한다. (로컬스토리지, 세션에도 저장할 수 있다);
        res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => console.log(`running on ${port}`));
