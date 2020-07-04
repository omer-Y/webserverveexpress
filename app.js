const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());

const users = [
    { id: 1,  name: 'Ömer', surname: 'Yelkenci', age: '27'},
    { id: 2, name: 'Lizge', surname: 'Kaya', age: '25' },
    { id: 3, name: 'Kıvanç', surname: 'Akile', age: '27' }
];

app.get('/', (req, res) => {
    res.send('<h1>Anasayfaya Hoşgeldiniz</h1>');
});

app.get('/users', (req, res) => {
    if(req.query.reverse) {
        res.send(users.reverse());
    } else {
        res.send(users);
    }
    
});

app.get('/users/:id', (req, res) => {
    const finded_user = users.find(user => user.id === parseInt(req.params.id));
    if(finded_user) {
        res.send(finded_user);
    } else {
        res.status(404).send('<h1>' + req.params.id + ', id\'li kullanıcı bulunamadı!</h1>');
    }
});

app.post('/users', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        surname: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(10).max(99).required()
    });

    const result = schema.validate(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
    } else {
        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age
        }
    
        users.push(newUser);
    
        res.send(newUser);
    }
});

app.listen(3000, () => {
    console.log('Server 3000 portunu dinliyor.');
});