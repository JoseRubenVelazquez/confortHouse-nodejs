const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderMain, renderAbout, renderContact, renderService } = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/main", renderMain);
router.get("/about", renderAbout);
router.get("/contacts", renderContact);
router.get("/Services", renderService);

module.exports = router;
