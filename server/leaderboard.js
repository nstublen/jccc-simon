let topScores = [0, 0, 0, 0, 0];

function get(req, res) {
    let leaderboard = {
        topScores
    }
    res.send(JSON.stringify(leaderboard));
}

function post(req, res) {
    let newScore = req.body;

    if (!newScore || !newScore.hasOwnProperty("score")) {
        res.status = 400;
        res.send("Invalid format");
        return;
    }

    topScores.push(newScore.score);
    topScores.sort((a, b) => b - a);

    topScores = topScores.slice(0, 5);

    let leaderboard = {
        topScores
    }
    res.send(JSON.stringify(leaderboard));
}

module.exports = {
    get,
    post
};
