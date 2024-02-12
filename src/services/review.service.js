class ReviewService {
	constructor({ reviewRepository, logger }) {
		this.reviewRepository = reviewRepository;
		this.logger - logger;
	}

	create = async (req, res, next) => {
		try {
			const { product_id, rating, comment, user_id } = req.query;
			// Add a review to DB
			await this.reviewRepository.create({ product_id, rating, comment, user_id });
			this.logger.info(`201 - Review Added - /reviews - POST - ${JSON.stringify(req.body)}`);
			return res.status(201).json('Review Added');
		} catch (error) {
			next(error);
		}
	};

	update = async (req, res, next) => {
		try {
			const { id, rating, comment } = req.body;
			// Find review using the proivided id
			const review = await this.reviewRepository.getById(id);
			// If no review is found, send an error
			if (!review) return next({ status: 500, message: 'Review does not exist' });
			// Finally update the review with the updated details
			await this.reviewRepository.update({ id, rating, comment });
			this.logger.info(`200 - Review Updated - /reviews - PUT - ${JSON.stringify(req.body)}`);
			return res.status(200).json('Review Updated');
		} catch (error) {
			next(error);
		}
	};

	destroy = async (req, res, next) => {
		try {
			const id = req.params.id;
			// Find review using the proivided id
			const review = await this.reviewRepository.getById(id);
			// If no review is found, send an error
			if (!review) return next({ status: 500, message: 'Review does not exist' });
			// Finally delete the review
			await this.reviewRepository.destroy(id);
			this.logger.info(`200 - Review Deleted - /reviews/${id} - DELETE`);
			return res.status(200).json({ message: `Review Deleted` });
		} catch (error) {
			next(error);
		}
	};
}

module.exports = ReviewService;
