import { useEffect } from "react";
import "../../assets/policy.css"

function DeliveryPolicy(){
    useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

    return (
        <>
            <div className="policy">

                <h1 className="policy-title">Delivery and Shipping Policy </h1>
                <p className="policy-content">
                    For domestic buyers, orders are shipped through registered domestic 
                    courier companies and /or speed post only. Orders are shipped within 5 
                    to 20 Days days or as per the delivery date agreed at the time of order
                    confirmation and delivering of the shipment subject to Courier Company
                    / post office norms, and the order will be delivered in 7 to 25 days. 
                    UCHIT ANAND is not liable for any delay in delivery by the courier company
                    / postal authorities and only guarantees to hand over the consignment to
                    the courier company or postal authorities within 8+ Days days from the 
                    date of the order and payment or as per the delivery date agreed at the 
                    time of order confirmation. Delivery of all orders will be to the address 
                    provided by the buyer. Delivery of our services will be confirmed on your
                    mail ID as specified during registration. 
                </p>
            </div>
        </>
    )
}

export default DeliveryPolicy;