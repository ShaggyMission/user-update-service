const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRoutes);     
app.use('/users', swaggerRoutes);            

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
