const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// GET all posts for dashboard /dashboard
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                order: [['created_at', 'DESC']],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
                ],
}]
})
            .then((dbPostData) => {
                const posts = dbPostData.map((post) => post.get({ plain: true }));
                res.render('dashboard', {
                    posts,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username,
                    userId: req.session.userId
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });

// GET one post for dashboard to edit dashboard/edit/:id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            'id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                userId: req.session.userId
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        }
        );
});

// GET new post for dashboard /dashboard/new
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn,
        username: req.session.username,
        userId: req.session.userId
    });
});

module.exports = router;

