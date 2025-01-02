# Auth

## Модуль авторизации:

**Учтите:** Если аккаунт не активирован, бот не должен отправлять запросы в главный модуль.

#### /user/link_reg_yandex
**Метод:** GET  
**Описание:** Принимает ничего и возвращает строку в виде ссылки.

**Пример запроса на Python:**
```python
import requests

response = requests.get('http://localhost:6000/user/link_reg')
print(response.text)
```

---

#### /user/reg_yandex
**Метод:** POST  
**Описание:** Принимает строку `code` и возвращает `refresh_token`, `access_token` и, если аккаунт не активирован, то еще и `activated: false`. Если `code` неверный, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

data = {'code': 'ваш_код'}
response = requests.post('http://localhost:6000/user/reg_yandex', data=data)
print(response.json())
```

---

#### /user/link_reg_yandex_tg
**Метод:** GET  
**Описание:** Принимает `clientId` и возвращает строку в виде ссылки.

**Пример запроса на Python:**
```python
import requests

params = {'clientId': 'ваш_clientId'}
response = requests.get('http://localhost:6000/user/link_reg_yandex_tg', params=params)
print(response.text)
```

---

#### /user/reg_yandex_tg
**Метод:** GET  
**Описание:** Принимает строку `code` и `state` и возвращает ничего. Если `code` неверный или `state` неверный, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

params = {'code': 'ваш_код', 'state': 'ваш_state'}
response = requests.get('http://localhost:6000/user/reg_yandex_tg', params=params)
print(response.status_code)
```

---

#### /user/refresh_tg
**Метод:** POST  
**Описание:** Принимает строку `refresh_token`, `access_token` и возвращает новые `refresh_token`, `access_token`. Если `refresh_token` или `access_token` неверные, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

data = {'refresh_token': 'ваш_refresh_token', 'access_token': 'ваш_access_token'}
response = requests.post('http://localhost:6000/user/refresh_tg', data=data)
print(response.json())
```

---

#### /user/link_reg_github_tg
**Метод:** GET  
**Описание:** Принимает `clientId` и возвращает строку в виде ссылки.

**Пример запроса на Python:**
```python
import requests

params = {'clientId': 'ваш_clientId'}
response = requests.get('http://localhost:6000/user/link_reg_github_tg', params=params)
print(response.text)
```

---

#### /user/reg_github_tg
**Метод:** GET  
**Описание:** Принимает строку `code` и `state` и возвращает ничего. Если `code` неверный или `state` неверный, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

params = {'code': 'ваш_код', 'state': 'ваш_state'}
response = requests.get('http://localhost:6000/user/reg_github_tg', params=params)
print(response.status_code)
```

---

#### /user/logout_tg
**Метод:** POST  
**Описание:** Принимает `access_token` и возвращает поле `ok`, если все хорошо. Если `access_token` неверный, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

data = {'access_token': 'ваш_access_token'}
response = requests.post('http://localhost:6000/user/logout_tg', data=data)
print(response.json())
```

---

#### /user/get_data
**Метод:** GET  
**Описание:** Принимает `access_token` и возвращает данные пользователя.

**Пример запроса на Python:**
```python
import requests

headers = {'Authorization': 'Bearer ваш_access_token'}
response = requests.get('http://localhost:6000/user/get_data', headers=headers)
print(response.json())
```

**Форма ответа:**
```json
{
    "login": "login",
    "userId": "id",
    "email": "default_email",
    "state": "some",
    "role": -1,
    "firstName": "first_name",
    "lastName": "last_name",
    "patronymic": "none",
    "activate": false,
    "subjectsId": [],
    "method": "yandex",
    "code": "none"
}
```
Если `access_token` неверный, то ошибка 403 или если сервер недоступен, то 500.

---

#### /user/get_public_data
**Метод:** GET  
**Описание:** Принимает `access_token` и возвращает публичные данные пользователя.

**Пример запроса на Python:**
```python
import requests

headers = {'Authorization': 'Bearer ваш_access_token'}
response = requests.get('http://localhost:6000/user/get_public_data', headers=headers)
print(response.json())
```

**Форма ответа:**
```json
{
    "login": "login",
    "userId": "id",
    "role": "role",
    "firstName": "first_name",
    "lastName": "last_name",
    "patronymic": "none",
    "activate": false,
    "subjectsId": [],
    "method": "yandex"
}
```
Если `access_token` неверный, то ошибка 403 или если сервер недоступен, то 500.

---

#### /user/login_code_tg
**Метод:** POST  
**Описание:** Принимает строку `code` и возвращает `refresh_token`, `access_token` и, если аккаунт не активирован, то еще и `activated: false`. Если `code` неверный, то ошибка 400 или если сервер недоступен, то 500.

**Пример запроса на Python:**
```python
import requests

data = {'code': 'ваш_код'}
response = requests.post('http://localhost:6000/user/login_code_tg', data=data)
print(response.json())
```
