const express = require('express');

const PrismaUserRepo = require('../prisma/prismaUserRepo');
const CreateUser = require('../../application/createUser');

const app = express();
app.use(express.json());

const userRepo = new PrismaUserRepo();
const createUser = new CreateUser(userRepo);

app.post('/users', async (req, res) => {

  const result = await createUser.execute(req.body);

  res.json(result);
});

module.exports = app;
