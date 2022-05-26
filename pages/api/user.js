const fs = require('fs')

const userData = require('../../data/user.json')

export default function handler(req, res) {
    switch (req.method) {
        case 'GET': {
            return getUsers(req, res);
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
            res.json({
                success: false,
                message: "Failed! User email already registered."
            })
        } else {
            userData.push(newUser)
            await fs.writeFileSync('data/user.json', JSON.stringify(userData), null, 4);
            res.json({
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

