const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.post("/", postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.put("/:id", postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;