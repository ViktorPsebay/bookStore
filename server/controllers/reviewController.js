import { Book, Review, User } from '../model/models.js';

class ReviewController {
  async create(req, res) {
    try {
      const {textOfReview, userId, bookId} = req.body;
      const review = await Review.create({
        textOfReview,
        userId: userId || null,
        bookId: bookId || null,
      });
      res.status(200).json(review);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getReviewByBookId(req, res) {
    try {
      const { id } = req.params;
      const reviews = await Review.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'textOfReview'],
      where:{bookId: id}});
      console.log(reviews);
      res.status(200).json(reviews);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getReviewByUserId(req, res) {
    try {
      const { id } = req.params;
      const reviews = await Review.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'textOfReview'],
      where:{userId: id}});
      console.log(reviews);
      res.status(200).json(reviews);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await Review.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'textOfReview']});
      res.status(200).json(reviews);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateReview(req, res) {
    try {
      const { id, textOfReview, userId, bookId } = req.body;
      
      const review = await Review.update({
        textOfReview,
        userId: userId || null,
        bookId: bookId || null,
      }, {where:{id}});
      res.status(200).json(review);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteReview(req, res) {
    
    try {
      const { id } = req.params;
      const reviews = await Review.destroy({ where:{id}});
      console.log(reviews);
      res.status(200).json({message: 'Отзыв был удален'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new ReviewController();