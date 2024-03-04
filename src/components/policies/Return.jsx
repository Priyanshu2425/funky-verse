import { useEffect } from "react";
import "../../assets/policy.css"

function Return() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	
	return (
		<>
			<div className="policy">
				<h1 className="policy-title">Delivery and Shipping Policy </h1>
				<p className="policy-content">
					<h3 className="policy-title">
						What is Funkyverse's Exchange Policy for Funkyverse Clothing?
					</h3>
					All the collection in Funkyverse are limited edition products and are
					made specially on your order demand that's why currently we do not
					exchange or return the product on the basis of size issue, but in case
					if the product is damages ripped or the wrong size or product is
					delivered to you, in that case its the responsibility of Funkyverse
					to get that product exchanged or returned according to your wish.
					<br/>
					<br/>
					<h3 className="policy-title">
						What sort of checks do you do for Returned Products?
					</h3>
					We check products to ensure that they are unused and in the same
					condition as they were when they were sent out to you. Clothing
					products with tags should have the brand tags intact, products with
					removed tags indicate usage and will not be accepted for returns.
					<br/>
					<br/>
					<h3 className="policy-title">
						How long will the return process take?
					</h3>
					Once you request a return, we will arrange for the product to be
					picked up from your address. This Reverse Pickup facility is only
					available for pin codes supported for Reverse Pickups by our courier
					partners. You will need to keep the product(s) packed and ready for
					pick-up. We will issue credit for your return after it reaches our
					office and the products are verified. This process will take 7-10
					working days from the date of raising the return request.
					<br/>
					<br/>
					<h3 className="policy-title">
						What is the Refund Policy?
					</h3>
					We do not offer any refunds.
				</p>
			</div>
		</>
	);
}

export default Return;
