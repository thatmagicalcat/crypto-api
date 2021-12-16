const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const PORT = process.env.PORT | 8080
const app = express()

let coins = {}
let names = []

const url = `https://coinmarketcap.com/`

app.get('/', (req, res) => {
    axios.get(url).then(response => {
        const $ = cheerio.load(response.data)

        // api variables
        let fname = ""
        let sname = ""
        $("table.h7vnx2-2.czTsgW.cmc-table").each(function () {
            $(this).find("table > tbody > tr > td > div.sc-16r8icm-0.escjiH").each(function () {
                $(this).find("div > a > div > div").each(function () {
                    
                    // Getting the coin name
                    $(this).find("div > p.sc-1eb5slv-0.iworPT").each(function () {
                        fname = $(this).text()
                    })

                    // Getting the short form of the coin
                    $(this).find("div > div > p.sc-1eb5slv-0.gGIpIK.coin-item-symbol").each(function () {
                        sname = $(this).text()
                    })
                    var coin_name = fname + " - " + sname
                    names.push(coin_name)
                })
            })

            $(this).find("table > tbody > tr > td > div.sc-131di3y-0.cLgOOr > a.cmc-link > span").each(function (index, element) {
                coins[names[index]] = $(this).text()
            })
        })

        res.json(coins)
    })
})

app.listen(PORT)