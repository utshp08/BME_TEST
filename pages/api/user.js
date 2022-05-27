const fs = require('fs')

const userData = require('../../data/user.json')

export default function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            const { email } = req.query
            if (email) {
                return getUserEmail(req, res)
            } else {
                return getUsers(req, res)
            }
        }

        case 'POST': {
            return addUser(req, res);
        }

        case 'PUT': {
            return updateUser(req, res);
        }

        case 'DELETE': {
            return deleteUser(req, res);
        }
    }
}

const getUserEmail = async (req, res) => {
    const { email } = req.query
    try {
        const existingUser = userData.filter((user, index) => {
            return email === user.email
        })

        if (existingUser.length > 0) {
            res.json({
                success: false,
                message: "Email was already taken."
            })
        } else {
            res.json({
                success: true,
                message: "Email still available."
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: "Failed! " + err.message
        })
    }
}

const getUsers = async (req, res) => {
    res.json(userData)
}

const addUser = async (req, res) => {
    let newUser = JSON.parse(req.body)
    try {
        const existingUser = userData.filter((user, index) => {
            return newUser.email === user.email && user
        })
        if (existingUser.length > 0) {
            return res.json({
                success: false,
                message: "Failed! User email already registered."
            })
        } else {
            userData.push(newUser)
            await fs.writeFileSync('data/user.json', JSON.stringify(userData), null, 4);
            return res.json({
                success: true,
                message: "Success! User added successfully."
            })
        }
    } catch (err) {
        res.json({
            success: false,
            message: "Failed! " + err.message
        })
    }

}

