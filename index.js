const express = require('express')
const app = express()
//middleware
app.use(express.json())

//cors
const cors = require("cors")
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

//establish connection with mongoose database
const { initializeDataBase } = require("./db/db.connect")
initializeDataBase()

//start server at port 4000
const PORT = 4000
app.listen(PORT, () => {
     console.log("Server is running on port ",PORT)
})

app.get("/", (req, res) => {
  res.send("Hello Express!")
})

//import Clothing model 
const Clothing = require("./models/clothing.models")

//import Wishlist model
const Wishlist = require("./models/wishlist.models")

//import Cart model
const Cart = require("./models/cart.models")

//import Address model
const Address = require("./models/address.models")

// const newItem = {
//   name: "Premium Jacket",
//   title: "Men Premium Jacket",
//   description: "A stylish and comfortable premium jacket for men.",
//   imageUrl: "https://placehold.co/845x563?text=Premium+Jacket",
//   originalPrice: 3999,
//   currentPrice: 2000,
//   discount: 50,
//   rating: 4.5,
//   category: "Men",
//      sizes: ["S", "M", "L", "XL"],
//      // size: "S",
// //   quantity: 1,
// }

// const multipleItems = [
//   {
//     name: "Plaid Shirt",
//     title: "Men Plaid Casual Shirt",
//     description:
//       "This plaid shirt is a versatile wardrobe staple. Made from soft cotton, it offers comfort and breathability while maintaining a stylish look. The classic plaid pattern gives it a timeless appeal, while the tailored fit ensures a modern silhouette. Perfect for layering over a T-shirt or wearing on its own, this shirt can be dressed up or down for various occasions.",
//     imageUrl:
//       "https://static.zara.net/assets/public/d927/f42c/e75b4d5b9a2f/aa740e30d18a/04391375401-a4/04391375401-a4.jpg?ts=1729698077927&w=600",
//     originalPrice: 1799,
//     currentPrice: 1299,
//     discount: 28,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Cargo Shorts",
//     title: "Men Casual Cargo Shorts",
//     description:
//       "These cargo shorts are perfect for warm weather and outdoor activities. With multiple pockets for convenience and a relaxed fit, they offer both comfort and functionality. Made from durable cotton fabric, they are easy to wear and pair with a variety of casual tops. Whether you're hiking, running errands, or enjoying a sunny day, these shorts are designed for versatility and style.",
//     imageUrl: "https://placehold.co/845x563?text=Cargo+Shorts",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 3.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "V-Neck Sweater",
//     title: "Men V-Neck Wool Sweater",
//     description:
//       "This V-neck wool sweater is perfect for layering in cooler months. Made from high-quality wool, it offers warmth and comfort without being too heavy. The classic V-neck design makes it ideal for wearing over a shirt or on its own. Whether you're at work or out on a casual outing, this sweater adds a touch of class to your look.",
//     imageUrl: "https://placehold.co/845x563?text=V-Neck+Sweater",
//     originalPrice: 2499,
//     currentPrice: 1799,
//     discount: 28,
//     rating: 2.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Polo T-Shirt",
//     title: "Men Polo Shirt",
//     description:
//       "This polo shirt combines comfort with a refined look. Made from soft cotton, it offers breathability, making it ideal for both casual and semi-formal occasions. The classic collar and button placket add a touch of sophistication, while the slim fit ensures a flattering look. Pair it with jeans, chinos, or shorts for a stylish, effortless outfit.",
//     imageUrl: "https://placehold.co/845x563?text=Polo+T-Shirt",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Chukka Boots",
//     title: "Men Chukka Leather Boots",
//     description:
//       "These Chukka leather boots are perfect for adding a touch of sophistication to both casual and semi-formal outfits. Made from genuine leather, they are durable and stylish, with a clean, minimalistic design. The soft lining ensures comfort, while the sturdy soles offer reliable traction. Whether paired with jeans or chinos, these boots are a versatile choice for any wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Chukka+Boots",
//     originalPrice: 3499,
//     currentPrice: 2499,
//     discount: 29,
//     rating: 3.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Peacoat Jacket",
//     title: "Men Wool Peacoat Jacket",
//     description:
//       "This classic wool peacoat is perfect for colder weather. Made from a premium wool blend, it provides warmth and durability while maintaining a sharp, tailored appearance. The double-breasted design and wide collar give it a sophisticated, timeless look. Whether you're heading to work or out for a night on the town, this jacket is designed to keep you stylish and warm.",
//     imageUrl: "https://placehold.co/845x563?text=Peacoat+Jacket",
//     originalPrice: 4999,
//     currentPrice: 3599,
//     discount: 28,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Denim Skirt",
//     title: "Women Denim Skirt",
//     description:
//       "This denim skirt offers a casual yet stylish look, perfect for everyday wear. Made from durable denim, it features a flattering A-line fit and a mid-rise waist. The classic button-down design ensures comfort and ease, while the raw hem adds a modern twist. Whether worn with a casual T-shirt or dressed up with a blouse, this skirt is a versatile addition to your wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Denim+Skirt",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Tailored Blazer",
//     title: "Women Tailored Blazer",
//     description:
//       "This women’s tailored blazer is the perfect addition to any professional or semi-formal outfit. Made from high-quality fabric, it offers a polished look with a flattering fit. The notched lapels and single-breasted design give it a timeless appeal. Whether worn over a blouse, shirt, or dress, this blazer enhances your style and confidence for any occasion.",
//     imageUrl: "https://placehold.co/845x563?text=Tailored+Blazer",
//     originalPrice: 3999,
//     currentPrice: 2899,
//     discount: 28,
//     rating: 3.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Faux Fur Coat",
//     title: "Women Faux Fur Coat",
//     description:
//       "Stay warm and stylish with this chic faux fur coat. Perfect for colder months, the coat is made from soft faux fur that provides warmth without compromising on style. The oversized collar and button-down design give it a sophisticated, luxurious look. Whether paired with casual or dressy outfits, this coat is designed to keep you cozy and fashionable.",
//     imageUrl: "https://placehold.co/845x563?text=Faux+Fur+Coat",
//     originalPrice: 4999,
//     currentPrice: 3599,
//     discount: 28,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Cropped Top",
//     title: "Women Cropped T-Shirt",
//     description:
//       "This cropped T-shirt is a fun and trendy addition to your casual wardrobe. Made from soft cotton, it offers a comfortable fit while allowing for freedom of movement. The cropped design adds a modern touch, making it perfect for pairing with high-waisted jeans, skirts, or shorts. Whether you’re lounging at home or going out with friends, this top is ideal for a relaxed, casual look.",
//     imageUrl: "https://placehold.co/845x563?text=Cropped+Top",
//     originalPrice: 999,
//     currentPrice: 699,
//     discount: 30,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Ballet Flats",
//     title: "Women Ballet Flats",
//     description:
//       "These ballet flats are the perfect combination of style and comfort. Made from soft, flexible material, they provide a snug fit and are perfect for all-day wear. The simple yet elegant design features a delicate bow on the toe, adding a feminine touch. Ideal for pairing with dresses, skirts, or jeans, these flats are a versatile footwear choice for any occasion.",
//     imageUrl: "https://placehold.co/845x563?text=Ballet+Flats",
//     originalPrice: 1299,
//     currentPrice: 799,
//     discount: 38,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Classic Leather Jacket",
//     title: "Men Classic Leather Jacket",
//     description:
//       "This classic leather jacket combines style and durability. It features a sleek design with a smooth finish, making it perfect for both casual and semi-formal occasions. The jacket is made from high-quality leather, ensuring long-lasting wear while providing comfort and warmth. Ideal for layering over your favorite outfits, it adds a touch of sophistication and edge to any wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Leather+Jacket",
//     originalPrice: 4999,
//     currentPrice: 2999,
//     discount: 40,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Slim Fit Jeans",
//     title: "Men Slim Fit Denim Jeans",
//     description:
//       "These slim-fit denim jeans offer a modern, trendy look while maintaining comfort. The jeans are designed with a tailored fit that flatters the body, providing a sleek silhouette. Made from high-quality denim, they are durable and perfect for everyday wear. Whether paired with a casual T-shirt or a dressier shirt, these jeans are a versatile addition to your wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Slim+Fit+Jeans",
//     originalPrice: 1999,
//     currentPrice: 1499,
//     discount: 25,
//     rating: 3.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Cotton T-Shirt",
//     title: "Men Cotton Casual T-Shirt",
//     description:
//       "This cotton T-shirt is a must-have for anyone seeking comfort and style. Made from soft, breathable cotton fabric, it offers a relaxed fit ideal for daily wear. The simple design makes it easy to pair with jeans, shorts, or casual trousers. Available in various colors, this T-shirt will quickly become a staple piece in your casual wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Cotton+T-Shirt",
//     originalPrice: 999,
//     currentPrice: 699,
//     discount: 30,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Formal Shirt",
//     title: "Men Formal Shirt",
//     description:
//       "This formal shirt is designed for the modern man who values both style and comfort. It is made from a premium cotton blend that feels soft against the skin, while the tailored cut ensures a sharp, professional look. Perfect for office wear or formal events, the shirt features a crisp collar and button cuffs for a classic finish. It’s versatile enough to pair with a suit or trousers.",
//     imageUrl: "https://placehold.co/845x563?text=Formal+Shirt",
//     originalPrice: 2499,
//     currentPrice: 1799,
//     discount: 28,
//     rating: 2.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Sports Shoes",
//     title: "Men Running Sports Shoes",
//     description:
//       "These running sports shoes are designed to provide support and comfort during your workouts. With a lightweight and breathable upper, they ensure your feet stay cool and dry while you're on the move. The durable rubber sole offers excellent traction and stability on various surfaces, making them perfect for running, gym sessions, or casual wear. Their sleek design makes them ideal for both sports and everyday use.",
//     imageUrl: "https://placehold.co/845x563?text=Sports+Shoes",
//     originalPrice: 3999,
//     currentPrice: 2799,
//     discount: 30,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Woolen Sweater",
//     title: "Men Winter Woolen Sweater",
//     description:
//       "Stay warm and stylish with this cozy woolen sweater designed for cold winters. Crafted from soft wool, it traps heat to keep you comfortable while still being breathable. The classic design makes it versatile enough to wear for both casual and semi-formal occasions. Whether layered over a shirt or worn alone, this sweater adds a touch of sophistication to your winter wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Woolen+Sweater",
//     originalPrice: 1999,
//     currentPrice: 1299,
//     discount: 35,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Denim Jacket",
//     title: "Men Denim Jacket",
//     description:
//       "This trendy denim jacket is perfect for adding a rugged yet stylish flair to any outfit. Made from high-quality denim, it is both durable and comfortable, offering a relaxed fit that pairs well with a variety of looks. Whether layered over a T-shirt or dressed up with a button-down shirt, this jacket is ideal for casual outings, outdoor activities, and even cooler evenings.",
//     imageUrl: "https://placehold.co/845x563?text=Denim+Jacket",
//     originalPrice: 2999,
//     currentPrice: 1999,
//     discount: 33,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Chinos",
//     title: "Men Slim Fit Chinos",
//     description:
//       "These slim-fit chinos combine comfort and style for a polished casual look. Made from soft and breathable cotton fabric, they offer a comfortable fit while maintaining a sharp silhouette. The versatile design makes them perfect for both casual and semi-formal occasions, pairing well with shirts, polos, or casual jackets. Available in a variety of colors, these chinos are a great addition to any wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Chinos",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 3.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Hoodie",
//     title: "Men Casual Hoodie",
//     description:
//       "This casual hoodie is perfect for all seasons, offering both comfort and style. Made from a soft cotton blend, it provides warmth without feeling too heavy. Whether you're lounging at home, running errands, or hitting the gym, this hoodie is designed for easy wear and maximum comfort. The simple design and adjustable hood make it a versatile piece that pairs effortlessly with any casual outfit.",
//     imageUrl: "https://placehold.co/845x563?text=Hoodie",
//     originalPrice: 1999,
//     currentPrice: 1499,
//     discount: 25,
//     rating: 4.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Leather Belt",
//     title: "Men Genuine Leather Belt",
//     description:
//       "This genuine leather belt is a must-have for both formal and casual occasions. Crafted from high-quality leather, it offers durability and timeless style. The sleek design features a classic buckle, making it the perfect accessory to complete any outfit. Whether paired with jeans or a suit, this belt adds a sophisticated touch to your look.",
//     imageUrl: "https://placehold.co/845x563?text=Leather+Belt",
//     originalPrice: 799,
//     currentPrice: 599,
//     discount: 25,
//     rating: 2.0,
//     category: "Men",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Floral Maxi Dress",
//     title: "Women Floral Maxi Dress",
//     description:
//       "This beautiful floral maxi dress is perfect for any occasion, from casual outings to summer parties. The vibrant floral patterns create a lively and feminine look, while the flowing design ensures comfort and movement. Made from a lightweight and breathable fabric, it keeps you cool during warm weather. Dress it up with heels or pair it with sandals for a relaxed, boho-inspired look.",
//     imageUrl: "https://placehold.co/845x563?text=Maxi+Dress",
//     originalPrice: 2999,
//     currentPrice: 1999,
//     discount: 33,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "High Heel Sandals",
//     title: "Women High Heel Sandals",
//     description:
//       "These high heel sandals are perfect for formal occasions, offering both elegance and comfort. The stylish design features a sleek strap and a comfortable heel height, making them ideal for weddings, parties, and other special events. Made from high-quality materials, these sandals are durable and provide a secure fit. Pair them with dresses, skirts, or tailored trousers for a chic and sophisticated look.",
//     imageUrl: "https://placehold.co/845x563?text=Sandals",
//     originalPrice: 1999,
//     currentPrice: 1499,
//     discount: 25,
//     rating: 3.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Casual Top",
//     title: "Women Cotton Casual Top",
//     description:
//       "This casual cotton top is perfect for everyday wear, offering both comfort and style. The lightweight fabric makes it breathable and perfect for warmer weather, while the simple design ensures versatility. Pair it with jeans, shorts, or skirts for a relaxed, easy-going look. Whether you're at work or out for the weekend, this top is a great addition to your wardrobe.",
//     imageUrl: "https://placehold.co/845x563?text=Casual+Top",
//     originalPrice: 999,
//     currentPrice: 799,
//     discount: 20,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Puffer Jacket",
//     title: "Women Puffer Jacket",
//     description:
//       "This puffer jacket is designed for the winter months, offering warmth and style. Made from a soft yet durable material, it traps body heat to keep you cozy in cold temperatures. The quilted design and snug fit ensure comfort and a flattering silhouette. Whether you're hitting the slopes or simply staying warm on a chilly day, this jacket is a perfect choice.",
//     imageUrl: "https://placehold.co/845x563?text=Puffer+Jacket",
//     originalPrice: 3499,
//     currentPrice: 2499,
//     discount: 29,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Summer Dress",
//     title: "Women Summer Dress",
//     description:
//       "This lightweight summer dress is perfect for warm weather. Featuring a relaxed fit and soft fabric, it offers comfort while keeping you cool. The simple yet chic design can be dressed up with accessories or worn casually with sandals. Ideal for beach trips, picnics, or casual outings, this dress is versatile and easy to style.",
//     imageUrl: "https://placehold.co/845x563?text=Summer+Dress",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 3.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Ankle Boots",
//     title: "Women Ankle Boots",
//     description:
//       "These ankle boots are a stylish and versatile addition to your fall and winter wardrobe. Made from high-quality leather, they offer both durability and comfort. The sleek design features a low heel and side zipper, making them easy to slip on and off. Pair them with jeans, skirts, or dresses to add an edgy yet sophisticated touch to any outfit.",
//     imageUrl: "https://placehold.co/845x563?text=Ankle+Boots",
//     originalPrice: 1999,
//     currentPrice: 1299,
//     discount: 35,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     name: "Ruffled Blouse",
//     title: "Women Ruffled Blouse",
//     description:
//       "This ruffled blouse offers an elegant and feminine look. The delicate ruffles add a touch of sophistication, while the lightweight fabric ensures comfort throughout the day. Perfect for both work and casual outings, this blouse pairs well with skirts, trousers, or jeans. Dress it up with a statement necklace or keep it simple for a more laid-back style.",
//     imageUrl: "https://placehold.co/845x563?text=Ruffled+Blouse",
//     originalPrice: 1499,
//     currentPrice: 999,
//     discount: 33,
//     rating: 4.0,
//     category: "Women",
//     sizes: ["S", "M", "L", "XL"],
//   },
// ]
 


//function to save an entry into the DB
async function createClothingEntry(newItem) {
     try {
          const item = new Clothing(newItem)
          const saveItem =await item.save()
          console.log("Saved Item: ", saveItem)
           return saveItem
     } catch (error) {
          console.log("Error in saving the clothing item ",error)
     }
}

// createClothingEntry(newItem)

//add multiple entries
async function createMultipleClothingEntry(multipleItems) {
     try {
          const savedItems = await Clothing.insertMany(multipleItems)
          // const saveItem =await item.save()
          console.log("Saved Items: ", savedItems)
           return savedItems
     } catch (error) {
          console.log("Error in saving the clothing items ",error)
     }
}

// createMultipleClothingEntry(multipleItems)


//writing a post call to save data into db
app.post("/api/products", async (req, res) => {
     try {
          const savedItem = await createClothingEntry(req.body)
          res.status(201).json({
               message: "Item added successfulyy.",
               item: savedItem
          })
     } catch (error) {
          res.status(500).json({error: "Failed to add movie"})
     }
})

//writing a get api for fetching all products
async function readAllItems() {
     try {
          const allItems = await Clothing.find()
          // console.log(allItems)
          return allItems
     } catch (error) {
          throw error
     }
}

app.get("/api/products", async (req, res) => {
     try {
          const items = await readAllItems()
          if (items.length != 0) {
               res.json(items)
          } else {
               res.status(404).json({error: "Items not found"})
          }
     } catch (error) {
          res.status(500).json({message: "Failed to fetch items"})
     }
})


//writing an api to get a product by its id
async function readProductById(productId) {
     try {
          const product = await Clothing.findById(productId)
          return product
     } catch (error) {
          console.log(error)
     }
}

app.get("/api/products/:id", async (req, res) => {
     try {
          const product = await readProductById(req.params.id)

          if (product) {
               res.json(product)
          } else {
               res.status(404).json({message: "Product not found"})
          }
     } catch (error) {
          res.status(500).json({error: "Failed to get the item"})
     }
})


//wishlist

//function to save an entry into the DB
async function createWishlistEntry(newItem) {
     try {
          const item = new Wishlist(newItem)
          const saveItem =await item.save()
          console.log("Saved Item: ", saveItem)
           return saveItem
     } catch (error) {
          console.log("Error in saving the clothing item ",error)
     }
}

// createWishlistEntry(newItem)

//writing a post call to save data into db
app.post("/api/wishlist/products", async (req, res) => {
     try {
          const savedItem = await createWishlistEntry(req.body)
          res.status(201).json({
               message: "Item added successfulyy.",
               item: savedItem
          })
     } catch (error) {
          res.status(500).json({error: "Failed to add movie"})
     }
})

//writing a get api for fetching all products
async function readAllWishlistItems() {
     try {
          const allItems = await Wishlist.find()
          // console.log(allItems)
          return allItems
     } catch (error) {
          throw error
     }
}



app.get("/api/wishlist/products", async (req, res) => {
     try {
          const items = await readAllWishlistItems()
          if (items.length != 0) {
               res.json(items)
          } else {
               res.status(404).json({error: "Items not found"})
          }
     } catch (error) {
          res.status(500).json({message: "Failed to fetch items"})
     }
})


//writing an api to get a product by its id
async function readWishlistProductById(productId) {
     try {
          const product = await Wishlist.findById(productId)
          return product
     } catch (error) {
          console.log(error)
     }
}

app.get("/api/wishlist/products/:id", async (req, res) => {
     try {
          const product = await readWishlistProductById(req.params.id)

          if (product) {
               res.json(product)
          } else {
               res.status(404).json({message: "Product not found"})
          }
     } catch (error) {
          res.status(500).json({error: "Failed to get the item"})
     }
})

//writing an api to delete a product by its id
async function deleteWishlistProductById(productId) {
     try {
          const product = await Wishlist.findByIdAndDelete(productId)
          return product
     } catch (error) {
          console.log(error)
     }
}

//writing a delete api to delete a movie
app.delete("/api/wishlist/products/:productId", async (req, res) => {
  try {
    const deletedProduct = await deleteWishlistProductById(req.params.productId)
    res.status(200).json({
      message: "Product deleted sucessfully.",
      Item: deletedProduct,
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" })
  }
})








//Cart

//function to save an entry into the DB
async function createCartEntry(newItem) {
     try {
          const item = new Cart(newItem)
          const saveItem =await item.save()
          console.log("Saved Item: ", saveItem)
           return saveItem
     } catch (error) {
          console.log("Error in saving the clothing item ",error)
     }
}

// createCartEntry(newItem)

//writing a post call to save data into db
app.post("/api/cart/products", async (req, res) => {
     try {
          const savedItem = await createCartEntry(req.body)
          res.status(201).json({
               message: "Item added successfulyy.",
               item: savedItem
          })
     } catch (error) {
          res.status(500).json({error: "Failed to add movie"})
     }
})

//writing a get api for fetching all products
async function readAllCartItems() {
     try {
          const allItems = await Cart.find()
          // console.log(allItems)
          return allItems
     } catch (error) {
          throw error
     }
}



app.get("/api/cart/products", async (req, res) => {
     try {
          const items = await readAllCartItems()
          if (items.length != 0) {
               res.json(items)
          } else {
               res.status(404).json({error: "Items not found"})
          }
     } catch (error) {
          res.status(500).json({message: "Failed to fetch items"})
     }
})


//writing an api to get a product by its id
async function readCartProductById(productId) {
     try {
          const product = await Cart.findById(productId)
          return product
     } catch (error) {
          console.log(error)
     }
}

app.get("/api/cart/products/:id", async (req, res) => {
     try {
          const product = await readCartProductById(req.params.id)

          if (product) {
               res.json(product)
          } else {
               res.status(404).json({message: "Product not found"})
          }
     } catch (error) {
          res.status(500).json({error: "Failed to get the item"})
     }
})


 // Function to update the quantity of a cart product by its ID
// async function updateCartProductQuantity(productId, newQuantity) {
//   try {
//     const updatedProduct = await Cart.findByIdAndUpdate(
//       productId,
//       { quantity: newQuantity },
//       { new: true } // Return the updated document
//     );
//     return updatedProduct;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function updateCartProductById(productId, dataToUpdate) {
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      productId, 
      dataToUpdate, // Fields to update
      { new: true } 
    )
    return updatedProduct
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}


// API to update the quantity of a cart product
// app.post("/api/cart/products/:productId", async (req, res) => {
//   const { productId } = req.params;
//   const { quantity } = req.body; // New quantity from request body

//   try {
//     const updatedProduct = await updateCartProductQuantity(productId, quantity);

//     if (updatedProduct) {
//       res.status(200).json({
//         message: "Product quantity updated successfully.",
//         updatedProduct,
//       });
//     } else {
//       res.status(404).json({ error: "Product not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update product quantity" });
//   }
// });
app.post("/api/cart/products/:productId", async (req, res) => {
  const { productId } = req.params 
  const dataToUpdate = req.body  

  try {
    const updatedProduct = await updateCartProductById(productId, dataToUpdate)

    if (updatedProduct) {
      res.status(200).json({
        message: "Product updated successfully.",
        updatedProduct,
      })
    } else {
      res.status(404).json({ error: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" })
  }
})




//writing an api to delete a product by its id
async function deleteCartProductById(productId) {
     try {
          const product = await Cart.findByIdAndDelete(productId)
          return product
     } catch (error) {
          console.log(error)
     }
}

//writing a delete api to delete a movie
app.delete("/api/cart/products/:productId", async (req, res) => {
  try {
    const deletedProduct = await deleteCartProductById(req.params.productId)
    res.status(200).json({
      message: "Product deleted sucessfully.",
      Item: deletedProduct,
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" })
  }
})


//writing apis for address

const newAddress = {
  name: "John Doe",
  addressLocation: "Main Office",
  street: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  postalCode: "10001",
  phoneNumber: "123-456-7890",
}


// Function to save an entry into the Address DB
async function createAddressEntry(newItem) {
  try {
    const item = new Address(newItem);
    const saveItem = await item.save();
    console.log("Saved Address: ", saveItem);
    return saveItem;
  } catch (error) {
    console.log("Error in saving the address item ", error);
  }
}

// createAddressEntry(newAddress)

// POST API to save data into the Address DB
app.post("/api/address", async (req, res) => {
  try {
    const savedItem = await createAddressEntry(req.body);
    res.status(201).json({
      message: "Address added successfully.",
      item: savedItem,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add address" });
  }
});


//to read all addresses

async function readAllAddresses() {
  try {
    const allItems = await Address.find();
    return allItems;
  } catch (error) {
    throw error;
  }
}

app.get("/api/address", async (req, res) => {
  try {
    const items = await readAllAddresses();
    if (items.length !== 0) {
      res.json(items);
    } else {
      res.status(404).json({ error: "Addresses not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
});


//getting address by its id

async function readAddressById(addressId) {
  try {
    const address = await Address.findById(addressId);
    return address;
  } catch (error) {
    console.log(error);
  }
}

app.get("/api/address/:id", async (req, res) => {
  try {
    const address = await readAddressById(req.params.id);
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get the address" });
  }
});



//updating the address by its id

async function updateAddressById(addressId, dataToUpdate) {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      dataToUpdate,
      { new: true } 
    );
    return updatedAddress;
  } catch (error) {
    console.log(error);
  }
}


app.post("/api/address/:id", async (req, res) => {
  try {
    const updatedAddress = await updateAddressById(req.params.id, req.body);
    if (updatedAddress) {
      res.status(200).json({
        message: "Address updated successfully.",
        updatedAddress,
      });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update address" });
  }
});


//delete an address by its id

async function deleteAddressById(addressId) {
  try {
    const address = await Address.findByIdAndDelete(addressId);
    return address;
  } catch (error) {
    console.log(error);
  }
}


app.delete("/api/address/:id", async (req, res) => {
  try {
    const deletedAddress = await deleteAddressById(req.params.id);
    res.status(200).json({
      message: "Address deleted successfully.",
      Item: deletedAddress,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});



