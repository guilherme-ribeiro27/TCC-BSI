import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductService } from '../product/product.service';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SeedService{
    constructor(private readonly productService: ProductService){}

    async seedData(){
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
        
        // for(let i = 0; i < 20000; i++){
        //     const product: CreateProductDto = {
        //         name: faker.commerce.productName(),
        //         description: faker.commerce.productDescription(),
        //         price: Number(faker.commerce.price()),
        //         categoryId :1
        //     }
        //     products.push(product);
        // }
        products.forEach(async product=>{
            await this.productService.create(product);
        })
    }
}