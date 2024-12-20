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



