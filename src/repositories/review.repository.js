class ReviewRepository {
	constructor({ reviewModel }) {
		this.reviewModel = reviewModel;
	}

	getById = async id => {
		return await this.reviewModel.getById(id);
	};

	create = async ({ product_id, rating, comment, user_id }) => {
		return await this.reviewModel.create({ product_id, rating, comment, user_id });
	};

	update = async ({ id, rating, comment }) => {
		return await this.reviewModel.update({ id, rating, comment });
	};

	destroy = async id => {
		return await this.reviewModel.destroy(id);
	};
}

module.exports = ReviewRepository;
