import express from 'express';

const router = express.Router();

router.get('/Gps', function(req, res, next) {
    res.render('../client/refiner/build/index.html');
});

router.get('/Store', function(req, res, next) {
    res.render('../client/refiner/build/index.html');
});

router.get('/Address', function(req, res, next) {
    res.render('../client/refiner/build/index.html');
});

export default router;
