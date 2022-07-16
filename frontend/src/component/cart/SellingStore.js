import Grid from "@mui/material/Grid";
import ItemInCart from './ItemInCart';
import "../../css/cart.css";


function SellingStore(props) {
    const renderedProducts = props.products?.map((product, index) => {
        return <ItemInCart key={index} item={product} />
    })

    return (
        <Grid container className="sellingStore" sx={{ marginBottom: "2vw" }} >
            <Grid item xs={10} sx={{ marginBottom: "2vw" }} id="storeName">
                {props.StoreName}
            </Grid>
            <Grid item xs={10}>
                {renderedProducts}
            </Grid>
        </Grid>
    )
}

export default SellingStore;