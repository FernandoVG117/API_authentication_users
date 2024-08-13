const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');

const setFavorite = catchError(async(req,res) => {
        // route --> /users/:id/post
    const userId = req.user.id;
    const { id } = req.params;

        // validation (404)
    if( parseInt(userId) !== parseInt(id)) return res.status(404);

    const postIds = req.body;

        // Array validation (400)
    if(!Array.isArray(postIds) || postIds.length === 0) return res.status(400).json('Input invalid.');
    
        // To create favorite elements:
    let createdFavorites = [];

    for (let postId of postIds) {
        const favoritePost = await Favorite.create( {userId: parseInt(userId), postId: parseInt(postId)} );
        createdFavorites.push(favoritePost);
    }

    return res.status(201).json(createdFavorites);

});

module.exports = {
    setFavorite
}