import jimp from 'jimp'
import path from 'path'
import UserDTO from '../DTO/userDTO.js'
import userService from '../service/user.service.js'

class UpdateController {
    async user(req, res) {
        let { name, avatar } = req.body
        if (!avatar) {
            avatar = 'https://picsum.photos/200/200'
        } else {
            let buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64')
        }

        let imagePath = `${Date.now()} - ${Math.round(Math.random() * 1e9)}.png`

        try {
            let jimResp = await jimp.read(buffer)
            jimResp.resize(150, jimp.AUTO).write(path.resolve(__dirname, `../storage/${imagePath}`))
        } catch (err) {
            return res.status(500).json({ message: "Không thể tải ánh lên", error })
        }

        try {
            let user = await userService.find({ id: req.user.id }).update({ name, avatar: imagePath })
            if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" })

            user.activated = true
            user.name = name
            user.avatar = avatar
            user.save()

            return res.json({ message: "Activated", user: new UserDTO(user) })
        } catch (err) {
            res.status(500).json({ message: "Không thể kích hoạt tài khoản", err })
        }

        return
    }
}

export default new UpdateController()