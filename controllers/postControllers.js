const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")
const { default: axios } = require("axios")
const cheerio = require("cheerio")

const scraped = asyncHandler(async (req, res) => {
    const allowedDomains = ['flipkart.com'];
    const {flipkartUrl} = req.body

    if(!flipkartUrl) {
        res.status(400)
        throw new Error("Url not sent")   
    }

    const domain = new URL(flipkartUrl).hostname;
    if (!allowedDomains.includes(domain)) {
        return res.status(400).json({ message: 'URL domain is not allowed' });
    }

    const existingData = await Post.findOne({
      userId: req.user.id,
      flipkartUrl: flipkartUrl,
    })

    if(existingData) {
        res.status(201).json({
                id: existingData._id,
                user: existingData.userId,
                title: existingData.title,
                price: existingData.price,
                description: existingData.description,
                numReviews: existingData.numReviews,
                ratings: existingData.ratings
        })
    }

    try{
        const response = await axios.get(flipkartUrl)
        const $ = cheerio.load(response.data)
        
        const title = $('h1.product-title').text();
        const price = parseFloat($('span.product-price').text().replace(/[^\d.]/g, ''));
        const description = $('div.product-description').text();
        const numReviews = parseInt($('span.product-reviews').text());
        const ratings = parseFloat($('span.product-ratings').text());
        const mediaCount = $('div.product-media').length

        const post = await Post.create({
            userId: req.user.id,
            flipkartUrl,
            title,
            price,
            description,
            numReviews,
            ratings,
            mediaCount,
        })

        if(post) {
            res.status(201).json({
                id: post._id,
                user: post.userId,
                title: post.title,
                price: post.price,
                description: post.description,
                numReviews: post.numReviews,
                ratings: post.ratings
        })
        }else {
            res.status(400)
            throw new Error("Failed to create user")
        }

    }catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error scraping or saving post' });
    }
})

module.exports = {scraped}