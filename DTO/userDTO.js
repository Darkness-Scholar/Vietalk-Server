class UserDTO {
    constructor(user) {
        this.id = user._id
        this.email = user.email
        this.name = user.name
        this.avatar = user.avatar
        this.activated = user.activated
        this.createAt = user.createAt
    }
}

export default UserDTO