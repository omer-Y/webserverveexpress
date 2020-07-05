const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');


const users = [
    { id: 1,  name: 'Ömer', surname: 'Yelkenci', age: '27'},
    { id: 2, name: 'Lizge', surname: 'Kaya', age: '25' },
    { id: 3, name: 'Kıvanç', surname: 'Akile', age: '27' }
];

// Get users
router.get('/', (req, res) => {
    if(req.query.reverse) {
        res.send(users.reverse());
    } else {
        res.send(users);
    }
});

//Get user
router.get('/:id', (req, res) => {
     //Find user
    const finded_user = findUser(parseInt(req.params.id));

    if(finded_user) {
        res.send(finded_user);
    } else {
        res.status(404).send('<h1>' + req.params.id + ', id\'li kullanıcı bulunamadı!</h1>');
    }
});

//Post new user
router.post('/', (req, res) => {
    const {error} = userInfoValidate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
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

//Update user informations
router.put('/:id', (req, res) => {
    //Find user
    const finded_user = findUser(parseInt(req.params.id));
    
    if(!finded_user) {
        return res.status(404).send(`${req.params.id} li kullanıcı bulunamadı!`);
    }
    //Validation req.body
    const {error} = userInfoValidate(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
    } else {
        finded_user.name = req.body.name;
        finded_user.surname = req.body.surname;
        finded_user.age = req.body.age;

        res.send(finded_user);
    }
});

router.delete('/:id', (req, res) => {
    //Find user
    const finded_user = findUser(parseInt(req.params.id));
    if(!finded_user) {
        return res.status(404).send(`${req.params.id} li kullanıcı bulunamadı!`);
    }

    //Delete user
    const index_user = users.indexOf(users);
    users.splice(index_user, 1);
    
    res.send(finded_user);
});

//Validate user information
function userInfoValidate(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        surname: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(10).max(99).required()
    });

    return schema.validate(user);
}

function findUser(id) {
    return users.find(user => user.id === id);
}

module.exports = router;