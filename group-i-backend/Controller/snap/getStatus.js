const { MIDTRANS_SECRET_KEY,MIDTRANS_URL } = require ("../../config/config");

const getStatusSnap = async (order_id) => {
    const url = `${MIDTRANS_URL}/v2/${order_id}/status`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Basic ${MIDTRANS_SECRET_KEY}`,
      },
    };
    const response = await fetch(url, options);
  
    return await response.json();
  };
  
  module.exports = getStatusSnap;