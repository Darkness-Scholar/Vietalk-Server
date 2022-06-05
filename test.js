import axios from "axios"

class HTTP {
    constructor(url) {
        this.url = url;
    }

    async get(path, headers={}) {
        return await (axios.get(this.url + path))
    }
    async post(path, data, headers={}) {
        return await (axios.post(this.url + path, data))
    }
}

var request = new HTTP('http://localhost:4444')

const SENDOTP = "/api/auth/send-otp"
const VERIFY = "/api/auth/verify-otp"
const ACTIVATE = "/api/auth/activate"

// otp: "1703", 
// hash: "9d155a368cd3ad5016a99be7a99be9c04ebd44c1286f825ac770d1328e79b96a", 
// email: "tungxm123@gmail.com",
// expires: "1654079717968"

async function main() {
    try {
        let { data } = await request.post(ACTIVATE, { 
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTliZTExODYzMWIzN2Q5ZmIwY2E2NCIsImFjdGl2YXRlZCI6ZmFsc2UsImlhdCI6MTY1NDI0MjgzMywiZXhwIjoxNjU0MjQ2NDMzfQ.uer9N4R7X_JBzDb93UbDfqnlx4v4hyvfZXRDOMDO-r4"
         })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

main()