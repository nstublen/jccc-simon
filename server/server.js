const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const leaderboard = require("./leaderboard");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/leaderboard', leaderboard.get);
app.post('/leaderboard', leaderboard.post);

app.listen(3000, () => console.log('Leaderboard app listening on port 3000!'));
