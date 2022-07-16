import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating.js";

function Product(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.images}
          className="card-img-top"
          alt={product.name}
        ></img>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>${product.price}</Card.Text>
        <Button className="cusButton">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
