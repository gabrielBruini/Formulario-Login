# Formulario-Login
Um projeto de formulário de login com knex


# API de Login

## Endpoints

### Post /criar
Esse endpoint é o responsável por inserir o usuário no banco de dados.

#### Parametros
Email, nome e senha

Exemplo:

```
{
    "nome": "Gabriel",
    "email": "GabrielTeste123@hotmail.com",
    "senha": "Gabriel"
}
```



#### Respostas
##### Tudo OK! 200
Caso essa resposta aconteça, os dados do usuário vai ser cadastrado no sistema.
```
Tudo OK!
```

#### Dados já cadastrado 406
Caso essa resposta aconteça, isso significa que o e-mail do usuário já está cadastrado.
Exemplo de resposta: 
```
{
    "err": "O E-mail já está cadastrado"
}
```

### Get /usuarios
Esse endpoint é o responsável por retornar todos os usuários cadastrados, o usuário deve ter uma autenticação e um cargo acima do comum.
#### Parametros


#### Respostas
##### OK! 200
Caso essa resposta aconteça, será retornado um array de todos os usuários.
```
  [
    {
        "id": 1,
        "email": "gabriel@hotmail.com",
        "cargo": 0,
        "nome": "Gabriel"
    },
    {
        "id": 3,
        "email": "gabrielteste@hotmail.com",
        "cargo": 0,
        "nome": "Gabriel"
    }
    ]
```

#### Falha na autenticação 403
Caso essa resposta aconteça, significa que o usuário não está autenticado, ou que não tem permissão.
Exemplo de resposta: 
```
Você não está autenticado
```



### GET /usuario/:id

Esse endpoint é o responsável por retorna a listagem de um único usuário.
#### Parametros
id
#### Respostas
##### OK! 200
Caso essa resposta aconteça, ela irá retorna o usuário. Exemplo:
```
{
    "id": 1,
    "nome": "Gabriel",
    "cargo": 0,
    "email": "gabriel@hotmail.com"
}
```

#### Falha na autenticação 403
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação. Motivos: token inválido, token incorreto, token expirado.
Exemplo de resposta: 
```
Você não está autenticado

```

### Put /usuario
Esse endpoint é o responsável por alterar os dados do usuário no banco de dados. A rota espera que o id seja passado no corpo da requisição. Precisa de um cargo além do normal para poder alterar os dados

#### Parametros
Os dados passados podem ser id, email, nome e cargo.

#### Respostas
##### OK! 200
Caso essa resposta aconteça, ele irá alterar os dados no sistema. Exemplo:
```
Operação feita com sucesso

```

#### Falha na inserção de dados 400
Caso essa resposta aconteça, isso significa que há algum dado inserido de forma incorreta, não se esqueça que o id tem que passado no corpo da requisição.
Exemplo de resposta: 
```
"O usuário não existe"
```

### Delete /usuario/:id
Esse endpoint é o responsável por remover usuários. É necessário uma autenticação com um cargo para remover usuários.

#### Parametros
id.

#### Respostas
##### OK! 200
Caso essa resposta aconteça, ele irá remover o usuário no banco de dados. Exemplo:
```
{
    "msg": "Usuário deletado"
}

```

#### Falha na inserção de dados 406
Caso essa resposta aconteça, isso significa que não há um usuário com esse id no banco de dados.
Exemplo de resposta: 
```
O usuário não existe

```

### Post /recuperarsenha
Esse endpoint é o responsável pela recuperação de senha.

#### Parametros
Email

#### Respostas
##### OK! 200
Caso essa resposta aconteça, irá ser gerado um token para a alteração de senha. Exemplo:
```
b8645796-eb78-4360-85a8-cd554dea83e4

```

#### O email não existe no banco de dados 406
Caso essa resposta aconteça, isso significa O email não existe no banco de dados.
Exemplo de erro: 
```
O email não existe no banco de dados

```

### Post /mudarsenha
Essa rota é a responsável pela mudança de senha.

### Parametros
Senha e o token

### Respostas 
#### OK! 200
Exemplo de resposta:
```
Senha alterada

```
#### 406 Não Aceitavel
Exemplo de erro:
```
Token inválido ou já utilizado

```

### Post /login
A rota responsável pelo processo de login.

### Parametros

Email e a senha

### Respostas

#### OK ! 200 
Retorna o token de autenticação para o usuário

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkdhYnJpZWxUZXN0ZTEyM0Bob3RtYWlsLmNvbSIsImNhcmdvIjoxLCJpYXQiOjE2Mzc3ODg5MDV9.WLBtzeKIfyZR3buGbGy-n9x9ohMRipkRuBqf37ua9Qk"
}
```

#### Não Aceito 406
Usuário ou Email inválido

```
Senha inválida

```




