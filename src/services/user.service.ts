import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";
import logger from "../utils/logger";

export const createUser = async (input: DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
  try {
    const userData =  await UserModel.create(input)
    return omit(userData.toJSON(), 'password')
  } catch (error: any) {
    logger.error(error)
    throw new Error(error)
  }
}