const Nightmare = require('nightmare')
const nightmare = Nightmare({
  show: true,
})
const fs = require('fs')

const BASEURL = 'https://soundcloud.com'
const TARGET_URL = '/the-herman-show/tracks'

nightmare
  .goto(BASEURL + TARGET_URL)
  .wait('.sound__body')
  .evaluate(() => {
    //get all episodes on a page and filter out the non for sale ones
    let episodes = [...document.querySelectorAll('.sound__body')]

    //loop through and extract info from each episode into an object
    let data = episodes.map((episode, i) => {
      let index = ++i
      let rawTitle = episode.querySelector('.soundTitle__title span').innerText
      let title = rawTitle.split(" (")[0];
      let rawDate = episode.querySelector('.relativeTime').title.slice(10)
      let day = rawDate.split(' ')[0]
      let month = rawDate.split(' ')[1]
      let year = rawDate.split(' ')[2]
      let date = `${month} ${day}, ${year}`
      let link = episode.querySelector('a.soundTitle__title').href

      return {
        title,
        date,
        link,
        index
      }
    })
    //return the array of objects
    return data
  })
  .end()
  .then(data => {
    console.log(data);
    //convert to JSON and save as file
    data = JSON.stringify(data, null, 2)
    fs.writeFileSync('episodes.json', data)
  })
  .catch(error => {
    console.error('Scraping failed:', error)
  })