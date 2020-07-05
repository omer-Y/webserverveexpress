const express = require('express');
const router = express.Router();

router.use((req, res) => {
    res.status(404).send('<h1>Sayfa bulunamadı!</h1>');
});

module.exports = router;