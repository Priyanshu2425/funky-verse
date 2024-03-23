export default function Order({order}){
    return (
        <>
            <div style={{width: "100%"}} key={order.transactionId}>
                <h3>Order Placed: {order.date}</h3>
                <p>transactionId: {order.transactionId}</p>
                <p>Amount: ₹{order.amount/100}</p>
                <p>Status: {order.status}</p>
                <p>Payment Mode: {order.mode}</p>
                <p>Delivery: {order.delivery}</p>
                <p>Delivery Tracking Id: {order.deliveryPartnerTrackingId}</p>

                {order.products.map((item, index)=>{
                    return <div style={{width: "100%", display: "flex"}} key={index}>
                        <img style={{width: "100px"}} src={item.imageLink1}/>
                        
                            <p>{item.productName}</p>
                            <p>Size: {item.size}</p>
                            <p>Quantity: {item.quantity} </p>
                            <p>Amount: ₹{item.total_price}</p>
                        
                    </div>;
                })}
            </div>
            
        </>
    )
}