const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create post /api/posts
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// update post /api/posts/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// delete post /api/posts/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = router;