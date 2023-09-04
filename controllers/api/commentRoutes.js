const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments /api/comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET one comment from post 
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// POST create new comment api/comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            userId: req.session.userId,
            postId: req.body.postId,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// PUT update comment api/comment/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            comment_text: req.body.comment_text,
        },
            {
                where: {
                    id: req.params.id,
                },
            });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// DELETE comment api/comment/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = router;
