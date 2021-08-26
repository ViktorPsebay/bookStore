import { Book, Rating, User } from '../model/models.js';

class RatingController {
  async create(req, res) {
    try {
      const {rate, userId, bookId} = req.body;
      await Rating.create({
        rate,
        userId: userId || null,
        bookId: bookId || null,
      });
      const candidate = await Rating.findOne({where:{bookId, userId}});
      if (candidate) await Rating.update({
        rate,
      }, {where:{id: candidate.id}});
      res.status(200).json('Оценка успешно добавлена');
    }
    catch(e) {
      console.log(e);
    }
  }

  async getRatingByBookId(req, res) {
    try {
      const { id } = req.params;
      const rates = await Rating.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'rate'],
      where:{bookId: id}});
      console.log(rates);
      res.status(200).json(rates);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getRatingByUserId(req, res) {
    try {
      const { id } = req.params;
      const rates = await Rating.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'rate'],
      where:{userId: id}});
      console.log(rates);
      res.status(200).json(rates);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllRatings(req, res) {
    try {
      const rates = await Rating.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id', 'rate']});
      res.status(200).json(rates);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateRating(req, res) {
    try {
      const { id, rate, userId, bookId } = req.body;
      
      await Rating.update({
        rate,
        userId: userId || null,
        bookId: bookId || null,
      }, {where:{id}});
      res.status(200).json({message: 'Оценка была обновлена'});
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteRating(req, res) {
    
    try {
      const { id } = req.params;
      const rates = await Rating.destroy({ where:{id}});
      console.log(rates);
      res.status(200).json({message: 'Оценка была удалена'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new RatingController();