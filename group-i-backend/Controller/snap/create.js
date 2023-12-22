const { MIDTRANS_URL_POST, MIDTRANS_SECRET_KEY } = require("../../config/config");

const buySnap = async (data) => {
    const url = `${MIDTRANS_URL_POST}/snap/v1/transactions`;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Basic ${MIDTRANS_SECRET_KEY}`,
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url, options);
    // if(response.ok){
    //   console.log("succcess fetch api midtrans")
    // }
    return await response.json();
  };
  
  module.exports = buySnap;