import { FileSystemRepository } from "./repositories/file-system.repository.js";
import { MemoryRespository } from "./repositories/memory.repository.js";
import { ProductManager } from "./manager/product.manager.js";
import { Product } from "./model/product.model.js";
import util from "node:util";

const memoryRespository = new MemoryRespository();
const fileSystemRepository = new FileSystemRepository("productos.txt");
const productManager = new ProductManager(fileSystemRepository); // aca se puede usar una instancia de memoryRespository o  fileSystemRepository

const p1 = new Product("a", "titulo1", "descripcion1", 123, "thumbnail1", 1);
const p2 = new Product("b", "titulo2", "descripcion2", 123, "thumbnail2", 1);
const p3 = new Product("b", "titulo2", "descripcion2", 123, "thumbnail2", 1);

try {
  await productManager.addProduct(p1);
  await productManager.addProduct(p2);
  await productManager.addProduct(p3);
} catch (error) {
  console.log(`No se pudo agregar un producto`);
  console.log(error.message);
}

console.log(
  util.inspect(await productManager.getProducts(), {
    depth: null,
    colors: true,
    showHidden: true,
    getters: true,
  })
);

console.log(
  util.inspect(await productManager.getProductById(3), {
    depth: null,
    colors: true,
    showHidden: true,
    getters: true,
  })
);
