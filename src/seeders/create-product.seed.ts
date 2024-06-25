import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProductService } from '../product/product.service';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { fakerPT_BR as faker } from '@faker-js/faker';

async function bootstrap(){
    const app = await NestFactory.create(AppModule);
    const productService = app.get(ProductService);

    const products: CreateProductDto[] = []
    for(let i = 0; i < 20000; i++){
        const product: CreateProductDto = {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: Number(faker.commerce.price()),
            categoryId :1
        }
        products.push(product);
    }
    products.forEach(async product=>{
        await productService.create(product);
    })
}
bootstrap();