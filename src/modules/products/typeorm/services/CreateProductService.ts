import AppError from '../../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';
import { ProductRepository } from '../repositories/ProductsRepositorie';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const ProductsRepository = getCustomRepository(ProductRepository);
    const productExists = await ProductsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = ProductsRepository.create({
      name,
      price,
      quantity,
    });
    await ProductsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
