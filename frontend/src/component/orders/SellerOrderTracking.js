import { getModified, getOrderDetails } from "../../controller/orderSlice";
// MUI Components
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "../../css/orderTracking.css";
import { changeStatusAsync, getOrderAsync } from '../cart/cartThunks';


function SellerOrderTracking(props) {
  const [finalClickInfo, setFinalClickInfo] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(true);
  const [popUpConfirm, setPopUpConfirm] = useState(false);
  let orders = useSelector(getOrderDetails);
  var modified = useSelector(getModified);
  const dispatch = useDispatch();

  const handleOnCellClick = (params, event) => {
    event.preventDefault();
    setFinalClickInfo(params);
    // setPopUpOpen(true);
    // if (popUpConfirm === true) {
      dispatch(changeStatusAsync(params.id))
    // }
  };

  useEffect(() => {
    if (modified !== "succeed") {
      dispatch(getOrderAsync());
    }
  }, [dispatch, modified]);


  const columns = [
    { field: "uuid", headerName: "Order Number", width: 130 },
    {
      field: "products",
      headerName: "Products",
      width: 450,
      renderCell: (products) => (
        <ul>
          {products.value.map((product, index) => (
            <li key={index}>
              {" "}
              id: {product.id}
              {" "}
              name: {product.name}
            </li>
          ))}
        </ul>
      ),
    },
    { field: "status", headerName: "Status", width: 130 },
  ];

  let extendedOrders = orders.map((order) => ({
    ...order,
    id: order._id
  }))

  return (
    <Container maxWidth="xl" className="dashboard" sx={{ bgcolor: '#F7F8FC' }}>

      {/* {popUpOpen &&
        <div>
          <AlertPopup
            setOpen={setPopUpOpen}
            // setConfirm = {setPopUpConfirm}
          />
        </div>
      } */}

      <Grid
        container
        rowSpacing={5}
        sx={{ marginLeft: "8vw", marginTop: "2vw" }}
        className="orderTrackingContent"
      >
        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Unprocessed Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={extendedOrders.filter(order => order.status === "Unprocessed")}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onCellClick={(handleOnCellClick)}
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          In Shipment Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={extendedOrders.filter(order => order.status === "Shipped")}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>

        <Grid item xs={10} className="orderTrackingHeader">
          {" "}
          Delivered Orders
        </Grid>
        <Grid item xs={10} style={{ height: 400 }}>
          <DataGrid
            rows={extendedOrders.filter(order => order.status === "Delivered")}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SellerOrderTracking;

