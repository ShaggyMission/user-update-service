const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('./docs/swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

router.use('/register-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
