class ReviewModel {
	constructor({ prisma }) {
		this.prisma = prisma;
	}

	getById = async id => {
		return await this.prisma.review.findUnique({ where: { id } });
	};

	calculateRating = reviews => {
		let totalRating = 0;
		// Calculate the total rating using all the reviews for the product
		reviews.forEach(review => {
			totalRating += review.rating;
		});
		// Divide the total rating with the number of reviews, to get the average
		// Finally return the average rating for teh product
		return totalRating / reviews.length;
	};

	create = async ({ product_id, rating, comment, user_id }) => {
		// Review Data
		let data = {};
		// Rating given by user
		data['rating'] = rating;
		// Id of user, who made the review
		data['user_id'] = user_id;
		// Id of product being reviewed
		data['product_id'] = product_id;
		// User can sudmit a review without a comment, so check if comment is sent
		if (comment) data['comment'] = comment;
		return await this.prisma.$transaction(async transaction => {
			// Firstly, add the review
			const addedReview = await transaction.review.create({ data });
			// Get all the reviews for the product, which includes the newly added review
			const reviews = await transaction.review.findMany({ where: { product_id } });
			// Calculating the average rating for the product
			const avgRating = this.calculateRating(reviews);
			// Finally updating the rating of the specific product
			const updatedProduct = await transaction.product.update({
				where: { id: product_id },
				data: { rating: avgRating },
			});
			// This will first add the new review
			// Then get all the reviews including the new review
			// Then finally updated the product rating
			return [addedReview, reviews, updatedProduct];
		});
	};

	update = async ({ id, rating, comment }) => {
		// Update data
		let data = {};
		// Check if rating  is not null
		if (rating) data['rating'] = rating;
		// Check if comment is not null
		if (comment) data['comment'] = comment;
		return await this.prisma.$transaction(async transaction => {
			// Update the review with the new comment
			const updatedReview = await transaction.review.update({ where: { id }, data });
			if (data.rating) {
				// Get all the reviews for the product, which includes the newly added review
				const reviews = await transaction.review.findMany({
					where: { product_id: updatedReview.product_id },
				});
				// Calculating the average rating for the product
				const avgRating = this.calculateRating(reviews);
				// Finally update teh product with the new rating
				const updatedProduct = await transaction.product.update({
					where: { id: updatedReview.product_id },
					data: { rating: avgRating },
				});
				// This will first update the review
				// Then get all the reviews including the updated review
				// Then finally updated the product rating
				return [updatedReview, reviews, updatedProduct];
			}
			// If rating is not updated, just update comment of the review
			return updatedReview;
		});
	};

	destroy = async id => {
		return await this.prisma.review.delete({ where: { id } });
	};
}

module.exports = ReviewModel;
