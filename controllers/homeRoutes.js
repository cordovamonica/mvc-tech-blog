const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                },
                {
                    model: User,
                    attributes: ['username']
                },
                ],
                order: [['created_at', 'DESC']],
        })
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userId: req.session.userId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    });

// GET single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    },
        }],
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            userId: req.session.userId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }});

// GET login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
}
);

// GET signup page
router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
}
);

module.exports = router;