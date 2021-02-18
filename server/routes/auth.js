import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const logger = console;
const router = express.Router();

/**
 * Завершает запрос с ошибкой аутентификации
 * @param {object} res Ответ express
 */
function failAuth(res) {
  return res.status(401).end();
}

/**
 * Подготавливает пользователя для записи в сессию
 * Мы не хотим хранить пароль в сессии, поэтому извлекаем только нужные данные
 * @param {object} user Объект пользователя из БД
 */
function serializeUser(user) {
  return {
    id: user.id,
    login: user.login,
    score: user.score,
  };
}

router
  .route('/login')
  // Аутентификация пользователя
  .post(async (req, res) => {
    const { login, password } = req.body;
    console.log(login);
    try {
      // Пытаемся сначала найти пользователя в БД
      const user = await User.findOne({
        login,
      }).exec();
      if (!user) {
        return failAuth(res);
      }
      // Сравниваем хэш в БД с хэшем введённого пароля
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return failAuth(res);
      }
      req.session.user = serializeUser(user);
      return res.json(serializeUser(user));
    } catch (err) {
      logger.error(err);
      return failAuth(res);
    }
  });

router
  .route('/registration')
  // Регистрация пользователя
  .post(async (req, res) => {
    const { email, login, password } = req.body;
    try {
      // Мы не храним пароль в БД, только его хэш
      const saltRounds = Number(process.env.SALT_ROUNDS ?? 10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        login,
        password: hashedPassword,
        email,
      });
      req.session.user = serializeUser(user);
      return res.json(serializeUser(user));
    } catch (err) {
      logger.error(err);
      return failAuth(res);
    }
  });

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie(req.app.get('session cookie name'));
    return res.redirect('/');
  });
});

router.use((req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return res.status(401).end();
});

router.get('/secret', (req, res) => {
  res.json({
    login: req.session.user.login,
  });
});

export default router;
