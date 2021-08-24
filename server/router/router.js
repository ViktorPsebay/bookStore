import Router from 'express';
import { isAuthMiddleware } from '../middlewares/isAuthMiddleware.js';
import userController from '../controllers/userController.js';
import bookController from '../controllers/bookController.js';
import categoryController from '../controllers/categoryController.js';
import reviewController from '../controllers/reviewController.js';
import favoritesController from '../controllers/favoritesController.js';
import ratingController from '../controllers/ratingController.js';
import authorController from '../controllers/authorController.js';
import bookAuthorController from '../controllers/bookAuthorController.js';

const router = Router();

router.post('/users', userController.create);

router.get('/users/:id', userController.getOneUser);

router.get('/users', userController.getAllUsers);

router.get('/users/token/check', isAuthMiddleware, userController.checkToken);

router.put('/users/', isAuthMiddleware, userController.updateUser);

router.delete('/users/:id', isAuthMiddleware, userController.deleteUser);

router.post('/users/registration', userController.registration);

router.post('/users/login', userController.authorization);



router.post('/books/', bookController.create);

router.get('/books/', bookController.getAllBooks);

router.get('/books/sort/:criterion', bookController.sortBooksbyCriterion);

router.get('/books/:id', bookController.getOneBook);

router.get('/books/get_rates/:id', bookController.getRatingByBookId);

router.get('/books/get_by_category/:id', bookController.getBookByCategoryId);

router.get('/books/get_by_price/:price', bookController.getBooksByPrice);

router.get('/books/get_by_rate/:rate', bookController.getBooksByRating);

router.post('/books/get_by_author/', bookController.getBooksByAuthor);

router.post('/books/get_by_title/', bookController.getBooksByTitle);

router.put('/books/', bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);



router.post('/categories/', categoryController.create);

router.get('/categories/', categoryController.getAllCategories);

router.get('/categories/:id', categoryController.getOneCategory);

router.put('/categories/', categoryController.updateCategory);

router.delete('/categories/:id', categoryController.deleteCategory);



router.post('/reviews/', reviewController.create);

router.get('/reviews/', reviewController.getAllReviews);

router.get('/reviews/by_book/:id', reviewController.getReviewByBookId);
router.get('/reviews/by_user/:id', reviewController.getReviewByUserId);

router.put('/reviews/', reviewController.updateReview);

router.delete('/reviews/:id', reviewController.deleteReview);



router.post('/favorites/', favoritesController.create);
router.post('/favorites/get_id', favoritesController.getId);

router.get('/favorites/', favoritesController.getAllFavorites);

router.get('/favorites/by_book/:id', favoritesController.getFavoriteByBookId);
router.get('/favorites/by_user/:id', favoritesController.getFavoriteByUserId);

router.put('/favorites/', favoritesController.updateFavorite);

router.delete('/favorites/:id', favoritesController.deleteFavorite);



router.post('/rates/', ratingController.create);

router.get('/rates/', ratingController.getAllRatings);

router.get('/rates/by_book/:id', ratingController.getRatingByBookId);
router.get('/rates/by_user/:id', ratingController.getRatingByUserId);

router.put('/rates/', ratingController.updateRating);

router.delete('/rates/:id', ratingController.deleteRating);



router.post('/authors/', authorController.create);

router.get('/authors/', authorController.getAllAuthors);

router.get('/authors/:id', authorController.getOneAuthor);

router.put('/authors/', authorController.updateAuthor);

router.delete('/authors/:id', authorController.deleteAuthor);



router.post('/book_authors/', bookAuthorController.create);
router.post('/book_authors/get_id', bookAuthorController.getId);

router.get('/book_authors/', bookAuthorController.getAllBookAuthors);

router.get('/book_authors/by_book/:id', bookAuthorController.getBookAuthorByBookId);
router.get('/book_authors/by_author/:id', bookAuthorController.getBookAuthorByAuthorId);

router.put('/book_authors/', bookAuthorController.updateBookAuthor);

router.delete('/book_authors/:id', bookAuthorController.deleteBookAuthor);



export default router;