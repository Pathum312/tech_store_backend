class CategoryService {
	constructor({ categoryRepository, logger }) {
		this.categoryRepository = categoryRepository;
		this.logger = logger;
	}

	async get(req, res, next) {
		try {
			const { name } = req.query;
			const categories = await this.categoryRepository.get({ name });
			this.logger.info(
				`200 - Got Category List - /categories - GET - ${JSON.stringify(req.query)}`,
			);
			return res.status(200).json(categories);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			const { name, description } = req.body;
			// Add category to DB
			const category = await this.categoryRepository.create({ name, description });
			this.logger.info(
				`201 - Added Category ${category.name} - /categories - POST - ${JSON.stringify(req.body)}`,
			);
			return res.status(201).json(`Catgeory ${category.name} Added`);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { id, name, description } = req.body;
			// Find category using the proivided id
			const category = await this.categoryRepository.getById(id);
			// If no category is found, send an error
			if (!category) return next({ status: 400, message: `Category ${name} doesn't exist` });
			// Finally updated the category with the provided data
			const updatedCategory = await this.categoryRepository.update({ name, description });
			this.logger.info(
				`200 - Category ${updatedCategory.name} updated - /categories - PUT - ${JSON.stringify(
					req.body,
				)}`,
			);
			return res.status(200).json({ message: `Catgeory ${updatedCategory.name} updated` });
		} catch (error) {
			next(error);
		}
	}

	async destroy(req, res, next) {
		try {
			const id = req.params.id;
			// Find category using the proivided id
			const category = await this.categoryRepository.getById(id);
			// If no category is found, send an error
			if (!category) return next({ status: 400, message: `Category ${name} doesn't exist` });
			// Finally delete the category
			const deletedCategory = await this.categoryRepository.destroy(id);
			this.logger.info(
				`200 - Category ${deletedCategory.name} deleted - /categories/${id} - DELETE`,
			);
			return res.status(200).json({ message: `Catgeory ${deletedCategory.name} deleted` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = CategoryService;
