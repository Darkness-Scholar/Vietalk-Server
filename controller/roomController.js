class RoomController {
    async createRoom(req, res) {
        let { roomName, roomType, roomPassword } = req.body
        if (!roomName || !roomType) {
            return res.status(400).json({ message: "Room name & room type are required" })
        } if (!roomPassword && roomType === "private") {
            return res.status(400).json({ message: "Room password is required" })
        }

        
    }
}