const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

router.use('/updateUser-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
