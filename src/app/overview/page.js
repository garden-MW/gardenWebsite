import GraphDash from "@/components/overviewGraph"

export default function Overview(){
    return(
        <div className="flex justify-center h-screen w-screen">
            <div className="w-full h-full max-w-[90%] max-h-[30%] flex justify-center items-center">
                <GraphDash />
            
            </div>
        </div>
       
        
    )
}