const express = require('express');
const app = express();

const users = [
    { id: 1,  name: 'Ömer', surname: 'Yelkenci', age: '27'},
    { id: 2, name: 'Lizge', surname: 'Kaya', age: '25' },
    { id: 3, name: 'Kıvanç', surname: 'Akile', age: '27' },
];

app.get('/', (req, res) => {
    res.send('<h1>Anasayfaya Hoşgeldiniz</h1>');
});

app.get('/users', (req, res) => {
    console.log(req.query);
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

app.listen(3000, () => {
    console.log('Server 3000 portunu dinliyor.');
});