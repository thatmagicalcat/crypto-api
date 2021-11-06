const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const PORT = 6969
const app = express()

let quote = {}
let q = null
let a = null

app.get('/', (req, res) => {
	res.json("Welcome to my api")
})

app.get('/quote', (req, res) => {
	const url = `https://zenquotes.io/`
	axios.get(url).then(response => {
		const $ = cheerio.load(response.data)

		$('div[id="carousel-quote-1"]').each(function () {
			$(this).find('div > h1').each(function (index, element) {
				quote['quote'] = $(element).text()
			})
			$(this).find('div > p').each(function () {
				quote['author'] = $(this).text()
			})
		})
		res.json(quote)
	})
})

app.listen(PORT, () => console.log(`Server is listening at ${PORT}`))