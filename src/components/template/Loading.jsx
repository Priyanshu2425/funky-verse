import Loader from '/loader.gif'
import '../../assets/loader.css'
export default function Loading(){
    return (
        <>
            <div style={{display: "flex", 
            alignItems:"center", 
            justifyContent:"center", 
            height: "100%", width: "100%",
            position: "absolute",
            zIndex: 1,
            backgroundColor: 'white',
            top: 0,
            }}>
                <span class="loader"></span>
            </div>

        </>
    )
}