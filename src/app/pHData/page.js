'use client'
import RowInfo from "@/components/rowInfo"
import SpecificGraph from "@/components/specificGraph"

export default function PHData() {

    return (
        <div className=" p-10 flex flex-col h-screen w-screen space-y-5 items-center justify-evenly">
            <div className="w-full h-auto lg:max-w-[50%] flex justify-center items-center">
                <SpecificGraph type="pH" />
            </div>
            <div className="bg-white w-full h-44 rounded-lg flex items-center justify-center">
                <p className="p-3 text-center">Placeholder for info box</p>
            </div>
            <div className="flex flex-row w-full h-auto justify-between ">
                <div className=" h-auto flex items-center">
                    <RowInfo type={"pH"} isAverage/>
                </div>
                <div className=" h-auto flex items-center">
                    <RowInfo type={"pH"} isRecent/>
                </div>
            </div>
           
    
        </div>
    )
}