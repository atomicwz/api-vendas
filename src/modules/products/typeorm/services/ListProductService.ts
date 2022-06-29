import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';
import { ProductRepository } from '../repositories/ProductsRepositorie';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const ProductsRepository = getCustomRepository(ProductRepository);
    const products = ProductsRepository.find();
    return products;
  }
}

export default ListProductService;
