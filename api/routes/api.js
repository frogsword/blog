const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postContoller");
const commentController = require("../controllers/commentController")
const verifyToken = require("../passport/verifyToken");
const router = express.Router();

//auth
router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/logout", authController.logout)

router.get("/auth-status", authController.authStatus)

//posts
router.get("/posts", postController.allPosts)

router.get("/posts/:postid", postController.singlePost)

router.post('/posts', verifyToken, postController.createPost)

router.put("/posts/:postid", verifyToken, postController.updatePost)

router.delete("/posts/:postid", verifyToken, postController.deletePost)

//comments
router.get("/posts/:postid/comments", commentController.allCommentsOnPost)

router.get("/comments/:commentid/comments", commentController.parentCommentAndChildrenComments)

router.get("/comments/:commentid", commentController.singleComment)

router.post("/posts/:postid/comments", verifyToken, commentController.createCommentOnPost)

router.post("/comments/:commentid/comments", verifyToken, commentController.createCommentOnComment)

router.put("/posts/:postid/comments/:commentid", verifyToken, commentController.updateComment)

router.put("/posts/:postid/comments/:commentid/delete", verifyToken, commentController.deleteComment)

module.exports = router;