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
        console.log("Seeding products")
        const products: CreateProductDto[] = []
        for(let i = 0; i < 10; i++){
            const product: CreateProductDto = {
                name: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price: Number(faker.commerce.price()),
                category :1
            }
            products.push(product);
        }

        products.forEach(async (product,index)=>{
            console.log("Creating product", index)
            await this.productService.create(product);
        })
        return;
    }
}