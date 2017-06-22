if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const contentful = require('contentful')

const router = express.Router()

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN
})

function fetchData (req, res, next) {
  // @todo: make proper error handling
  client.getEntries({
    // categories
    'content_type': '5KMiN6YPvi42icqAUQMCQe'
  })
    .then(data => {
      req.navs = data.items.map(category => {
        return {
          title: category.fields.title,
          className: category.fields.className
        }
      })

      next()
    })
    .catch(err => console.log(err))
}

router.use(fetchData)

router.get('/', function (req, res) {
  res.render('pages/index', {
    navs: req.navs
  })
})

module.exports = router
