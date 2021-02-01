const express = require('express');
const router = express.Router({ mergeParams:true });
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");
const reviews = require('../controllers/reviews');
const Review = require("../models/review");
const Campground = require("../models/campground");

const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");


router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;