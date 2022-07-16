/* Styling & MUI */
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "../../css/cart.css";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';

/* Styling & MUI */
import React from "react";
import { useSelector } from 'react-redux';
import { getCart } from '../../controller/cartSlice';
import SellingStore from './SellingStore';

import { useDispatch } from 'react-redux';
import { submitOrderAsync } from './cartThunks';
import { useEffect } from "react";

function Cart() {
  let cart = useSelector(getCart);
  console.log(cart);
  const dispatch = useDispatch();
  /*
  useEffect(() => {
    let cart = useSelector(getCart);
}, []);
*/

  let uniqueStoreNames = [... new Set(cart?.map(product => product.soldBy))];
  let storeNames = Array.from(uniqueStoreNames).sort();

  console.log(storeNames)

  const renderedSellingStores = []
  for (let i in storeNames) {
    let storeName = storeNames[i]; 
    let tempArray = cart?.filter(p => p.soldBy === storeName)
    renderedSellingStores.push(<SellingStore key={i} StoreName={storeName} products={tempArray} ></SellingStore>)
    i++
  }
  
  const handleCheckout = event => { 
    event.preventDefault()
    dispatch(submitOrderAsync(cart))
  }

  return (
    <Container maxWidth="xl" className="dashboard" sx={{ bgcolor: '#F7F8FC', marginTop: "-1vw" }}>
      <Box className="cart">
        <h1> Cart</h1>
        <Grid container rowSpacing={5} sx={{ marginLeft: "8vw", marginBottom: "2vw" }}>
          <Grid item xs={10} rowSpacing={5}>
            <Box>
              {renderedSellingStores}
            </Box>
          </Grid>
        </Grid>
        <h2 id="Sum"> Sum: {cart.sum}</h2>
        <button className="Btn" id="checkoutIcon" onClick={handleCheckout}> <ShoppingCartCheckoutOutlinedIcon> </ShoppingCartCheckoutOutlinedIcon></button>
      </Box>
    </Container>
  );

}

export default Cart;

