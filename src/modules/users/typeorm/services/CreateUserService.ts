import AppError from '../../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories';
import User from '../entities';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const UserRepository = getCustomRepository(UsersRepository);
    const userEmailExists = await UserRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError('There is already one user with this email');
    }

    const user = UserRepository.create({
      name,
      email,
      password,
    });
    await UserRepository.save(user);

    return user;
  }
}

export default CreateUserService;
