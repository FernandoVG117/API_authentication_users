const Post = require("./Post");
const User = require("./User");



// Post --> userId
Post.belongsTo(User);
User.hasMany(Post);

