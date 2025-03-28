import GraphDash from "@/components/overviewGraph"
import HealthDisplay from "@/components/healthDisplay"
import RowInfo from "@/components/rowInfo"

export default function Overview(){
    return(
        <div className="flex flex-col h-screen w-screen space-y-5 p-5 items-center justify-center">
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <GraphDash />
            </div>
            <div className="lg:max-w-[50%]  w-[90%] h-[50%] flex items-center">
                <RowInfo type={"nutrition"} withDetails/>
            </div>
            <div className="lg:max-w-[50%] w-[90%] h-[50%] flex items-center">
                <RowInfo type={"pH"} withDetails/>
            </div>
    
        </div>
       
        
    )
}