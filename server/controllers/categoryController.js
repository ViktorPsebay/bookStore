import { Book, Category } from '../model/models.js';

class CategoryController {
  async create(req, res) {
    try {
      const {nameOfCategory} = req.body;
      const candidate = await Category.findOne({where: {nameOfCategory}});
      if (candidate) {
        return res.status(400).json({message: 'Категория с таким названием уже существует'});
      }

      const category = await Category.create({nameOfCategory});
      res.status(200).json(category);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getOneCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ include: {
        model: Book,
        attributes: ['id', 'title', 'author', 'price', 'rating', 'description']
      },where:{id},
      attributes: ['id', 'nameOfCategory'] });
      console.log(category);
      res.status(200).json(category);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({ attributes: ['id', 'nameOfCategory'] });
      res.status(200).json(categories);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateCategory(req, res) {
    try {
      const { id, nameOfCategory } = req.body;
      
      const category = await Category.update({nameOfCategory}, {where:{id}});
      res.status(200).json(category);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteCategory(req, res) {
    
    try {
      const { id } = req.params;
      const categories = await Category.destroy({ where:{id}});
      console.log(categories);
      res.status(200).json({message: 'Категория была удалена'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new CategoryController();