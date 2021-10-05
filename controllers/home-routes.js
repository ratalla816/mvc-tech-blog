const router = require ("express").Router();
const _require = require ("../models"),
    Post = _require.Post,
    Comment = _require.Comment,
    User = _require.User;

router.get("/", function (req, res) { Post.findAll ({include: [User]})
  .then (function (dbPostData) {
const posts = dbPostData.map (function (post) {
      return post.get ({ plain: true });
    });
    res.render("all-posts", { posts: posts });
  })["catch"](function (err) {
    res.status(500).json(err);
  });
});

router.get("/post/:id", function (req, res) {
  Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User]}]})
    .then(function (dbPostData) {
    if (dbPostData) {
      const post = dbPostData.get ({
        plain: true
      });
      res.render("single-post", {post: post});
    } else { res.status(404).end()}})
    ["catch"] (function (err) {
    res.status(500).json(err);
  });
});

router.get("/login", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/");
    return; 
  } res.render("login");
});

router.get("/signup", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  } res.render("signup");
});

module.exports = router;

