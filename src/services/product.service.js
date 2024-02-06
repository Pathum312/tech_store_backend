class ProductService {
	constructor({ productRepository, logger }) {
		this.productRepository = productRepository;
		this.logger = logger;
	}

	async get(req, res, next) {
		try {
			const { name, user_id, category_id } = req.query;
			const products = await this.productRepository.get({ name, user_id, category_id });
			this.logger.info(`200 - Got Product List - /products - GET - ${JSON.stringify(req.query)}`);
			return res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { name, description, price, stock, images, category_id, user_id } = req.body;
			// Add product to DB
			const product = await this.productRepository.create({
				name,
				description,
				price,
				stock,
				images,
				category_id,
				user_id,
			});
			this.logger.info(
				`201 - Added Product ${product.name} - /products - POST - ${JSON.stringify(req.body)}`,
			);
			return res.status(201).json({ message: `Product ${product.name} Added` });
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { id, name, description, price, stock, images, category_id } = req.body;
			// Find product using the proivided id
			const product = await this.productRepository.getById(id);
			// If no product is found, send an error
			if (!product) return next({ status: 400, message: `Product ${name} doesn't exist` });
			// Finally updated the product with the provided data
			const updatedProduct = await this.productRepository.update({
				id,
				name,
				description,
				price,
				stock,
				images,
				category_id,
			});
			this.logger.info(
				`200 - Product ${updatedProduct.name} updated - /products - PUT - ${JSON.stringify(
					req.body,
				)}`,
			);
			return res.status(200).json({ message: `Product ${updatedProduct.name} updated` });
		} catch (error) {
			next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			// Find product using the proivided id
			const product = await this.productRepository.getById(id);
			// If no product is found, send an error
			if (!product) return next({ status: 400, message: `product ${name} doesn't exist` });
			// Finally delete the product
			const deletedProduct = await this.productRepository.destroy(id);
			this.logger.info(`200 - Product ${deletedProduct.name} deleted - /products/${id} - DELETE`);
			return res.status(200).json({ message: `Product ${deletedProduct.name} deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ProductService;
