import React, { useEffect, useState } from "react";
import { getProductById } from "../axios-services/productScreen";
import {useParams, useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createProductCart, addNewCart } from "../axios-services/cart";



const ProductScreen = () => {

const { id } = useParams();
const [singleProduct, setSingleProduct] = useState({})
const [qty, setQty] = useState(1);
const [myCart, setMyCart] = useState();

const userId = localStorage.getItem('userId');
const cartProductArray = JSON.parse(localStorage.getItem('cartProductArray'));
const cart = JSON.parse(localStorage.getItem('cart'))


useEffect(() => {
    (async () => {
        const singleProduct = await getProductById(id);
       // console.log("singleproduct",singleProduct);
        setSingleProduct(singleProduct);
    })();
  }, []);

  let history = useHistory();

  const handleAddToCart = async(event) => {

     event.preventDefault();
    let userId = localStorage.getItem('userId')
    let productInActiveCart = JSON.parse(localStorage.getItem('ActiveCart'));
    let addProdToCart;
    //console.log("prod",productId);
    console.log("user",userId);
    console.log("single",singleProduct);
    console.log("qty",qty);
    console.log("price",singleProduct.price)

    //console.log("cart", cart.cartProduct);

     addProdToCart = await createProductCart(userId, singleProduct.id, singleProduct.price, qty)
     if(!!productInActiveCart){
        productInActiveCart.push(addProdToCart);
    } else {
        productInActiveCart = [addProdToCart];
    }

    setMyCart(productInActiveCart);
    console.log(productInActiveCart);
    localStorage.setItem('ActiveCart',JSON.stringify(productInActiveCart))
    history.push(`/cart/${id}`);
  }


  
return (
    <div className="product">
        <Card>
            <CardMedia
            component="img"
            height="140"
            image={singleProduct.image}
            alt={singleProduct.name}
            />
        
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            <h2>{singleProduct.name}</h2>
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <h3> Description : {singleProduct.description}</h3>
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <strong> Price : ${singleProduct.price} </strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
            <h4> Availability : {singleProduct.stock > 0 ? 'In Stock' : 'Out Of Stock'} </h4>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <label>
            <strong>Quantity</strong> 
        </label>

        <select 
            value={ qty }
            onChange={(event) => setQty(event.target.value)}>
            {[...Array(singleProduct.stock).keys()].map((x) => (
                <option key = {x+1} value={x+1}>
                    {x+1}
                </option>
            ))}
        </select>

           
        </Typography>
        </CardContent>
        <CardActions>
        <Typography variant="body2" color="text.secondary">
            {singleProduct.stock > 0 ? <button onClick={(event) => {
                handleAddToCart(event)
            }}>Add to Cart</button> : <p> Product is out of stock </p> }  
        </Typography>

        <Typography variant="body2" color="text.secondary">
            <Link to = "/Shop"> Go Back to Product Page </Link>
        </Typography>
        </CardActions>
      
      </Card>
      </div>
  )
}

  export default ProductScreen;

