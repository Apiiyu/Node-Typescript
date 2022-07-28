import { Request, Response } from "express"
import { CreateUserInput } from "../schema/user.schema"
import { createUser } from "../services/user.service"
import logger from "../utils/logger"

export const createUserHandler = async (request: Request<{}, {}, CreateUserInput["body"]>, response: Response) => {
  try {
    const userData = await createUser(request.body)
    console.log(userData, 'userData')
    return response.send(userData)
  } catch (error: any) {
    logger.error(error)
    return response.status(409).send(error.message)
  }
}
