const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');

/* Method used a Arrays with many postIds.

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
        // Management of errors:
    let errors = [];

    for (let postId of postIds) {
            // Check if the postId is already in "favorites"
        const existingFavorite = await Favorite.findOne({
            where: {
                userId: parseInt(userId),
                postId: parseInt(postId)
            }
        });

        if(existingFavorite) {
            errors.push(`Post with ID: ${userId} is already exist in favorites.`);
            continue;
        } 

        const favoritePost = await Favorite.create( {userId: parseInt(userId), postId: parseInt(postId)} );
        createdFavorites.push(favoritePost);
    }

    return res.status(201).json({
        createdFavorites,
        errors
    });

});
*/

const setFavorite = catchError(async(req,res) => {
    // route --> /users/:id/post
    const userId = req.user.id;
    const { id } = req.params;

        // validation (404)
    if( parseInt(userId) !== parseInt(id)) return res.status(404);

    const { postId } = req.body;

    const existingFavorite = await Favorite.findOne({
        where: {
            userId: parseInt(userId),
            postId: parseInt(postId)
        }
    });

    if (existingFavorite) {
        // Return error if the post is already a favorite
        return res.status(400).json({ message: `Post with ID ${parseInt(postId)} already exists in favorites.` });
    }

    const favoritePost = await Favorite.create({ userId: parseInt(userId), postId: parseInt(postId) });

    return res.status(201).json(favoritePost);
 
});


module.exports = {
    setFavorite
}