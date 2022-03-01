"use strict";
//  run npm install random-words

const {
  db,
  models: { User, Product, Category },
} = require("../server/db");

//random number generator
const makeRandomNumber = (num = 1000) => {
  const randomNum = Math.floor(Math.random() * num);
  return randomNum;
};

//  Create Categories for testing

const avaliableCategories = [
  "writing utensils",
  "paper products",
  "furniture",
  "editing supplies",
  "electronics",
];

//need assign quantity later (goes by every 4)
const availableProducts = [
  //writing utensils
  [
    "Ticonderoga Pencil",
    "This smooth-writing quality pencil features the classic yellow hexagonal shape",
    4.29,
    "https://i5.walmartimages.com/asr/d5a4a1fe-1358-4a3f-be15-82f791c13645.72af1ce7843bf5a94cffac1712492dfd.jpeg",
  ],
  [
    "Pilot G2 Gel Pen",
    "Gel ink pens for the ultimate overachiever",
    6.29,
    "https://m.media-amazon.com/images/I/71K3-UxL0nL._AC_SS450_.jpg",
  ],
  [
    "Zebra F-701 Pen",
    "Stainless steel from tip to clip",
    8.49,
    "https://www.zebrapen.com/wp-content/uploads/2013/12/F-701-resized-500x500.jpg",
  ],
  [
    "Pencil Sharpener",
    "Battery-powered pencil sharpener recommended for personal or home office use",
    22.99,
    "https://www.staples-3p.com/s7/is/image/Staples/sp41688198_sc7?wid=512&hei=512",
  ],

  //paper products
  [
    "Multipurpose Paper",
    "Reliable multipurpose paper is engineered for use in printers, fax machines, and copiers",
    11.49,
    "https://www.staples-3p.com/s7/is/image/Staples/s0309508_sc7?wid=512&hei=512",
  ],
  [
    'TRU RED™ 8.5" x 11" Copy Paper',
    "Reliable printer paper that is best for black & white printing",
    53.49,
    "https://bndlbuyapp.net/wp-content/uploads/s1181391_sc7.jpeg",
  ],
  [
    "Astrobrights Colored Paper",
    "Astrobrights paper in Solar Yellow is great for school projects, flyers, brochures, signs, coupons and posters.",
    22.99,
    "https://www.officecrave.com/image/data/product_image/263989.JPG",
  ],
  [
    "Bulk Multipurpose Paper",
    "Reliable multipurpose paper is engineered for use in printers, fax machines, and copiers",
    32.49,
    "https://www.quill.com/is/image/Quill/sp123233208_s7?iv=RLYpN3&wid=1080&hei=1080&fit=fit,1",
  ],

  //furniture
  [
    "Dry-Erase Whiteboard",
    "Suitable for light use in personal or low traffic environments for easy erasable writing",
    139.99,
    "https://www.staples-3p.com/s7/is/image/Staples/s1219579_sc7?wid=512&hei=512",
  ],
  [
    "3-Drawer Vertical File Cabinet",
    "Cabinet with three drawers for organization",
    147.99,
    "https://m.media-amazon.com/images/I/41QIUoS0h0L._AC_SX466_.jpg",
  ],
  [
    "Black & Decker LED Desk Lamp",
    "LED gooseneck desk lamp is great for sleek, modern spaces",
    53.99,
    "https://images.thdstatic.com/productImages/f916a4b9-8283-4cf2-9fba-11e4414aa34b/svn/gray-black-decker-desk-lamps-vled1812gray-bd-64_600.jpg",
  ],
  [
    "Union & Scale™ Adjustable Desk",
    'Desktop height range: 25.9"-51.5"',
    499.99,
    "https://www.staples-3p.com/s7/is/image/Staples/s1201494_sc7?wid=512&hei=512",
  ],

  //editing supplies
  [
    "Redi-Tag Page Flags",
    "Page flags feature a writable surface to edit, label or jot notes",
    2.29,
    "https://www.reditag.com/content/images/thumbs/0004514_check-box-removable-page-flags.png",
  ],
  [
    "C-Line® Slide N Grip Binding Bars",
    "Bind unpunched reports and add or delete pages quickly",
    32.99,
    "https://www.quill.com/is/image/Quill/s0158387_s7?$img400$",
  ],
  [
    "Post-it® Super Sticky Notes Cabinet Pack",
    "Post-it® Super Sticky Notes have 2X the sticking power",
    22.49,
    "https://m.media-amazon.com/images/I/71BwOkWHXoL._AC_SL1500_.jpg",
  ],
  [
    "Stickies Page Flags",
    "Page flags feature a writable surface to edit, label or jot notes and come in easy-to-use dispensers",
    7.47,
    "https://www.staples-3p.com/s7/is/image/Staples/sp42126008_sc7?wid=512&hei=512",
  ],

  //electronics
  [
    "Microsoft Surface Go",
    '10.5" 1920 x 1280 PixelSense Touchscreen',
    499.99,
    "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6478/6478762cv11d.jpg",
  ],
  [
    "Logitech MX Master 3 Mouse",
    "Laser mouse allows you to have complete control over the cursor movement",
    99.99,
    "https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-product-gallery-black-top.png",
  ],
  [
    'Dell E2420H 24" Monitor',
    "1920 x 1080 screen resolution delivers excellent detail",
    249.99,
    "https://www.bhphotovideo.com/images/images2500x2500/dell_e2420h_24_led_lcd_monitor_1559217.jpg",
  ],
  [
    'Lenovo Ideapad 3i 15" Laptop',
    "2.0GHz Intel Pentium 7505 dual-core processor with up to 3.5GHz speed and 4MB cache memory",
    329.99,
    "https://m.media-amazon.com/images/I/415nl1ySkRS._AC_.jpg",
  ],
];

//  Create Developer accounts for testing
const createDeveloperAccounts = async () => {
  const admin = {
    username: "admin",
    password: "123",
    type: "admin",
    email: "admin@admin.com",
    address: "123 Cool Lane, Boston, MA",
  };

  const customer = {
    username: "customer",
    password: "123",
    type: "customer",
    email: "customer@gmail.com",
    address: "123 Chill Lane, Boston, MA",
  };

  const productOne = await Product.findByPk(1);
  const productTwo = await Product.findByPk(2);

  const userOne = await User.create(admin);
  const userTwo = await User.create(customer);

  await userOne.addProduct(productOne);
  await userTwo.addProduct(productTwo);
};

//Create Categores
const createCategories = async () => {
  for (let i = 0; i < avaliableCategories.length; i++) {
    await Category.create({ name: avaliableCategories[i] });
  }
};

//Create Products
const createProducts = async () => {
  for (let i = 0; i < availableProducts.length; i++) {
    let categoryIndex = 0;

    if (i < 4) {
      categoryIndex = 0;
    } else if (i >= 4 && i < 8) {
      categoryIndex = 1;
    } else if (i >= 8 && i < 12) {
      categoryIndex = 2;
    } else if (i >= 12 && i < 16) {
      categoryIndex = 3;
    } else if (i >= 16) {
      categoryIndex = 4;
    }

    const category = await Category.findOne({
      where: {
        name: avaliableCategories[categoryIndex],
      },
    });

    const prod = {
      name: availableProducts[i][0],
      description: availableProducts[i][1],
      price: availableProducts[i][2],
      imgUrl: availableProducts[i][3],
      quantity: makeRandomNumber(),
    };
    const currentProduct = await Product.create(prod);
    await currentProduct.addCategory(category);
  }
};

//Run create functions
const seedAllItems = async () => {
  await createCategories();
  await createProducts();
  await createDeveloperAccounts();
};

// Sync the database. Clear the database if force:true
async function syncDB() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("The Database has been Synced!");
}

// Main function for running everything (exported)
async function runSeed() {
  console.log("seeding...");
  try {
    await syncDB();
    await seedAllItems();
  } catch (err) {
    console.error(err);
    process.exitCode = -1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}
/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
  */
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = runSeed;
