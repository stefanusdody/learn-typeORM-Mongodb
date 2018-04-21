import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';



createConnection().then(async connection => {

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//create get all user
app.get('/', async(req, res) => {
    const getResult = await connection.manager.find(User)
    res.send(getResult);
})

// create get user by
app.get('/id', async(req, res) => {
  const oneRepository = await connection.getRepository(User)
  const getUserId = await oneRepository.findOneById(req.params.id)
  res.send(getUserId);
})


// create new user
app.post('/', async (req, res) => {
  const createTodo = new User();
  createTodo.text = "Learn express Type-Orm"

  await connection.manager.save(createTodo)
  console.log("new user id " , createTodo.id)

  const users = await connection.manager.find(User)
  console.log("loaded new user: ", users)
  res.send(users);
})

// create delete user
app.delete('/:id', async(req, res) => {
  const deleteRepository = await connection.getRepository(User)
  const userToRemove = await deleteRepository.findOneById(req.params.id)

  await deleteRepository.remove(userToRemove)
  console.log("delete user");

  const deleteUser = await connection.manager.find(User)
  res.send(userToRemove);
})

// create update user
app.put("/:id", async(req, res) => {
  const updateRepository = await connection.getRepository(User)
  const userToUpdate = await updateRepository.findOneById(req.params.id)
  userToUpdate.text = "Then Learn Reach Native"

  await updateRepository.save(userToUpdate)
  console.log("update user")

  const updateUser = await connection.manager.find(User)
  res.send(userToUpdate);
})

app.listen(8800,() => console.log("listening to http:127.0.0.1:8800"))

}).catch(error => console.log(error));
