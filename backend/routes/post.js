const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth")

const postCtrl = require("../controllers/post");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;