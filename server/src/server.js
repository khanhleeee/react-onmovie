const express = require('express');
const app = express();
const port = 5555 || process.env.PORT;
const route = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('REST called sucessfully!');
});

route(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});