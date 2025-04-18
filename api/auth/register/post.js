import User from "../../../models/user.js"

export default async function signupUser(req, res) {
	console.log("hi")
	const { username, password, email } = req.body
	console.log("Received signup request:", req.body)

	try {
		const existingUser = await User.findOne({ username })
		if (existingUser) {
			return res.status(400).json({ message: "Username already taken" })
		}

		const newUser = new User({ username, password, email })
		await newUser.save()

		req.session.userId = newUser._id
		res.status(201).json({ message: "Signup successful", user: newUser })
	} catch (error) {
		res.status(500).json({ message: "Error signing up", error })
	}
}
