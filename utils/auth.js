const jwt = require('jsonwebtoken');

module.exports = function (req)
{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if ((req.body.userId && req.body.userId !== userId)) {
            return false;
        }
        else {
            return true;
        }
    } catch {
        return false;
    }
}