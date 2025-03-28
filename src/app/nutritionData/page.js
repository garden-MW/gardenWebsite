'use client'
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/specificGraph"

export default function NutritionData() {

    return (
        <div className="flex flex-col h-screen w-screen p-10 space-y-5 items-center justify-evenly">
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <SpecificGraph type="nutrition" />
            </div>
            <div className="bg-white w-full h-44 rounded-lg flex items-center justify-center">
                <p className="p-3 text-center">Placeholder for info box</p>
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" w-full h-auto flex items-center">
                    <RowInfo type={"nutrition"} isAverage/>
                </div>
                <div className=" w-full h-auto flex items-center">
                    <RowInfo type={"nutrition"} isRecent/>
                </div>
            </div>
           
    
        </div>
    )
}