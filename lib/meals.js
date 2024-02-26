import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'

const db = sql('meals.db')

export async function getMeals() {
  // await new Promise((resolve) => setTimeout(resolve, 7000))
  // throw new Error('Could not fetch meals')
  return db.prepare('SELECT * FROM meals').all()
}

export async function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug)
}

export async function saveMeal(meal) {
  // const slug = meal.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z-]/g, '') //! With this line, the slug will be generated from the title

  meal.slug = slugify(meal.title, { lower: true }) //! With this line, the slug will be generated from the title using the slugify package
  meal.instructions = xss(meal.instructions) //! With this line, the instructions will be sanitized using the xss package

  //! Process the images
  const ext = meal.image.name.split('.').pop()
  const filename = `${meal.slug}.${ext}`

  const stream = fs.createWriteStream(`public/images/${filename}`)

  // const bufferedImage = Buffer.from(meal.image.data)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Could not save image')
    }
    console.log('Image saved')
  })

  meal.image = `/images/${filename}`
  
  db.prepare(
    `INSERT INTO meals
    (
      slug,
      title,
      image,
      summary,
      instructions,
      creator,
      creator_email
    )
      VALUES 
      (
        @slug,
        @title,
        @image, 
        @summary, 
        @instructions, 
        @creator, 
        @creator_email
    )`
  ).run(meal)

  // stmt.run({ ...meal, slug })
}
