import dotenv from "dotenv";
dotenv.config();

const adminPassword = process.env.ADMINPASSWORD;
const userPassword = process.env.USERPASSWORD;
const data = {
  users: [
    {
      firstName: "Dominique",
      lastName: "Smith",
      email: "dsmithuag@gmail.com",
      password: adminPassword,
      isAdmin: true,
    },
    {
      firstName: "Kalina",
      lastName: "ali",
      email: "kali28@gmail.com",
      password: userPassword,
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Bratitude",
      slug: "bratitude",
      category: "lips",
      images: "/images/LipProduct1.jpg", //679px x 829px
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Paradise Pink",
      slug: "paradise-pink",
      category: "lips",
      images: "/images/LipProduct2.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Cosmic Pink",
      slug: "comsic-pink",
      category: "lips",
      images: "/images/LipProduct3.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Glam Bratz",
      slug: "glam-bratz",
      category: "lips",
      images: "/images/LipProduct4.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Forever Diamonds",
      slug: "forever-diamonds",
      category: "lips",
      images: "/images/LipProduct5.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Yazmin",
      slug: "yazmin",
      category: "lips",
      images: "/images/LipProduct6.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Rock Angelz",
      slug: "rock-angelz",
      category: "lips",
      images: "/images/LipProduct7.jpg",
      price: 20,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Cateye",
      slug: "cateye",
      category: "lashes",
      images: "/images/Lash1.jpg",
      price: 15,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Carmen",
      slug: "carmen",
      category: "lashes",
      images: "/images/Lash2.jpg",
      price: 15,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Big One",
      slug: "big-one",
      category: "lashes",
      images: "/images/Lash3.png",
      price: 15,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Big Purr",
      slug: "big-purr",
      category: "lashes",
      images: "/images/Lash4.png",
      price: 15,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Glitter Snatch",
      slug: "glitter-snatch",
      category: "lashes",
      images: "/images/Lash5.png",
      price: 15,
      countInStock: 0,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Platinum",
      slug: "platinum",
      category: "lashes",
      images: "/images/Lash6.png",
      price: 15,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Crysalis",
      slug: "crysalis",
      category: "lashes",
      images: "/images/Lash7.jpg",
      price: 15,
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "Big Lippie Bundle",
      slug: "big-lippie-bundle",
      category: "lips",
      price: 45,
      images: "/images/LipBundle.jpg",
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      name: "In the Nude Bundle",
      slug: "in-the-nude-bundle",
      category: "lips",
      price: 30,
      images: "/images/LipBundle2.jpg",
      countInStock: 10,
      rating: 4.5,
      numReviews: 10,
      description: "Lorem ipsum dolor sit amet",
    },
  ],
};

export default data;
