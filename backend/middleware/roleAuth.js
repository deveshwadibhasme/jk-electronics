
const roleAuth = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!roles.includes(user.role)) {
            return res.status(401).json({ message: 'You are not authorised' })
        }
        if (user.status) {
            return res.status(401).json({ message: 'You are Blocked' })
        }
        next();
    }
}

export default roleAuth