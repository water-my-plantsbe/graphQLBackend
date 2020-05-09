const bcrypt = require('bcryptjs');
const pass = bcrypt.hashSync('pass');
const faker = require('faker');

const seeds = [
  { id: 52 ,
    username: 'md',
    email: 'kking@gmail',
    password: pass,
    phone: '347412334'
  },
];
for (let i = 0; i < 50; i++) {
  seeds.push({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: pass,
    phone: faker.phone.phoneNumber('+1##########')
  });
}

exports.seed = function(knex, Promise) {
    return knex('plants')
    .then(function(){
      return knex('users').insert([...seeds]);
    })
};
