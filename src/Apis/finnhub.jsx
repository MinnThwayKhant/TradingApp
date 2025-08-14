import axios from "axios";

const TOKEN = "d2ebk5hr01qr1ro967k0d2ebk5hr01qr1ro967kg"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1/",
    params: {
        token: TOKEN
    }
})