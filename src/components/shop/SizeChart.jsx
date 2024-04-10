import LowerSizeChart from '/lowerSizeChart.jpg'
import OversizedSizeChart from '/oversizedSizeChart.jpg'
import RegularSizeChart from '/regularTshirtSizeChart.jpg'


import '../../assets/sizechart.css'

export default function SizeChart(){
    return (
        <>  
            <div id="size-chart" className='inter-thin'>
                <p> Size chart for our Funkyverse Oversized Tshirt </p>
                <br/>
                <img src={OversizedSizeChart}/>
                <br/><br/>
                <p> Size chart for our Funkyverse Regular Tshirt </p>
                <br/>
                <img src={RegularSizeChart}/>
                <br/><br/>
                <p> Size chart for our Funkyverse Lowers</p>
                <br/>
                <img src={LowerSizeChart}/>
            </div>
        </>
    )
}