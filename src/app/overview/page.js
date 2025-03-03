import GraphDash from "@/components/overviewGraph"
import HealthDisplay from "@/components/healthDisplay"

export default function Overview(){
    return(
        <div className="flex flex-col h-screen w-screen">
            <div className="w-full max-h-[30%] flex justify-center items-center">
                <GraphDash />
            </div>
            <div className="border-2 border-black">
                <HealthDisplay />
            </div>
            
        </div>
       
        
    )
}