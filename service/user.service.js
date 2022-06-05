import UserModel from "../model/user.model.js"

class UserService {
    async find (query) {
        let user = await UserModel.findOne(query)
        return user
    }
    async create (data) {
        let user = await UserModel.create(data)
        return user
    }
}

export default new UserService()