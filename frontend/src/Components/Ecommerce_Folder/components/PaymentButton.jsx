import { useRazorpay } from "react-razorpay";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const PaymentButton = ({ amount, product }) => {
  const RAZORPAY_KEY_ID = "rzp_test_uKcZGSMuN7tEhw";

  const { token } = useAuth();
  const { Razorpay } = useRazorpay();

  const LOCAL_URL = "http://localhost:3000";
  const PUBLIC_URL = "https://jk-automobile-9xtf.onrender.com";

  const url = location.hostname === "localhost" ? LOCAL_URL : PUBLIC_URL;

  const handlePayment = async () => {
    // if (token === null) {
    //   alert("Register or LogIn to make this payment");
    // }
    try {
      const response = await axios.post(
        `${url}/api/payment/create-order`,
        { amount: 100000 },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.message === "You are not authorised") {
        alert("LogIn To make this payments");
      }
      const { order, userInfo } = await response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "J.K. AutoElectronic Works",
        description: "Pay to download",
        order_id: order.id,
        handler: async (response) => {
          const body = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            totalAmount: order.amount,
            userId: userInfo.id,
            products: product,
          };
          try {
            await axios.post(
              `${url}/api/payment/verify-payment`,
              JSON.stringify(body),
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            //   .then(async (res) => {
            //     const response = await axios.get(
            //       `${url}/bin/download-bin/${module_id}/${res.data.order}`,
            //       {
            //         headers: {
            //           "Content-Type": "application/json",
            //           Authorization: `Bearer ${token}`,
            //         },
            //       }
            //     );
            //     window.location.href = response.data.url;
            //   });
            alert("Payment successful!");
          } catch (err) {
            // alert("Payment failed: " + err.message);
            alert("Try to Login or comeback later");
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.number,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open(options);
    } catch (err) {
      alert(
        "Error creating order: " +
          " Please LogIn or Register " +
          err?.response?.data?.message || err.message
      );
      console.log(err);
    }
  };

  return (
    <button
      className="checkout-btn"
      // onClick={() => alert("Proceeding to checkout!")}
      onClick={handlePayment}
    >
      Proceed to Checkout
    </button>
  );
};

export default PaymentButton;
