import { Request, Response } from 'express';
import CreateProductService from '../typeorm/services/CreateProductService';
import DeleteProductService from '../typeorm/services/DeleteProductService';
import ListProductService from '../typeorm/services/ListProductService';
import ShowProductService from '../typeorm/services/ShowProductService';
import UpdateProductService from '../typeorm/services/UpdateProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async Create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return response.json([]);
  }
}