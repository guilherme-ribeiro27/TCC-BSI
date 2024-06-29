import { fakerPT_BR as faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "src/product/dto/create-product.dto";
import { ProductService } from "src/product/product.service";

@Injectable()
export class Seeder{
    constructor(
        private readonly productService: ProductService
    ){}

    async seed(): Promise<void>{
        const products: CreateProductDto[] = []
        for(let i = 0; i < 10; i++){
            const product: CreateProductDto = {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price()),
                categoryId :1
            }
            products.push(product);
        }

        products.forEach(async product=>{
            await this.productService.create(product);
        })
    }
}