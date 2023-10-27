const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/form', (req, res) => {
  const body = req.body;
  const errors = {};

  if (!body.name || body.name.length < 2) {
    errors.name = 'Имя должно содержать не менее 2 символов';
  }

  if (!body.email) {
    errors.email = 'Поле обязательно для заполнения';
  } else if (!isValidEmail(body.email)) {
    errors.email = 'Некорректный адрес электронной почты';
  }

  if (!body.phone || !isValidPhone(body.phone)) {
    errors.phone = 'Некорректный формат номера телефона';
  }

  if (!body.message || body.message.length < 5) {
    errors.message = 'Сообщение должно содержать не менее 5 символов';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      status: 'error',
      fields: errors
    });
  } else {
    res.json({
      status: 'success',
      message: 'Ваша заявка успешно отправлена'
    });
  }
});

function isValidEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\+375\s\((17|25|29|33|44)\)\s\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
}

server.use(router);
server.listen(3000);
