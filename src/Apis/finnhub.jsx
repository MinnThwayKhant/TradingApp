import axios from "axios";

const TOKEN = "d2f0og1r01qmrq4pa2agd2f0og1r01qmrq4pa2b0"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1/",
    params: {
        token: TOKEN
    }
})