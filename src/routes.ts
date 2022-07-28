import { Express, Request, Response } from "express"
import { createUserHandler } from "./controller/user.controller"
import validate from "./middleware/validateResource"
import { createUserSchema } from "./schema/user.schema"

const routes = (app: Express) => {
  app.get('/api/v1/healthcheck', (request: Request, response: Response) => {
    response.status(200).send('Success')
  })

  app.post('/api/v1/users', validate(createUserSchema), createUserHandler)
}

export default routes