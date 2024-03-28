import DeliveryPolicy from '../policies/DeliveryPolicy'
import Return from '../policies/Return'
import Terms from '../policies/Terms'

export default function Faq(){
    return (
        <>
            <div id="Faq">
                <DeliveryPolicy/>
                <Return/>
                <Terms/>
            </div>
        </>
    )
}