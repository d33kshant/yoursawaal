const signupUser = (req, res) => {
	// TODO: Regiater user
}

const loginUser = (req, res) => {
	// TODO: Login user
}

const authenticate = (req, res, next) => {
	// TODO: Authenticate jwt token, Required login if not
	next()
}

const authorize = (req, res, next) => {
	// TODO: Authorize jwt token 
	next()
}

module.exports = {
	signupUser,
	loginUser,
	authenticate,
	authorize
}