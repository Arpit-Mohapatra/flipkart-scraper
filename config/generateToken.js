const jwt =require('jsonwebtoken')

const generateToken = (user) => {
    const token =jwt.sign({
        id:user._id,
        name:user.name
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'30d'
    })

    return token;
}

module.exports =generateToken;