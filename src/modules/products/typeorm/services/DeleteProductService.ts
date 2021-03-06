import AppError from '../../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repositories/ProductsRepositorie';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const ProductsRepository = getCustomRepository(ProductRepository);
    const product = await ProductsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found');
    }
    await ProductsRepository.remove(product);
  }
}

export default DeleteProductService;
