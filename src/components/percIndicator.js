export default function PercIndicator({percentage}){
    if (Math.abs(percentage) < 60){
        return (
            <div className="w-11 h-[70%]  bg-orange-400 shadow-[0px_4px_3px_0px_rgba(0,0,0,0.25)] rounded-lg" />
        )
    }
    else if (Math.abs(percentage) < 80){
        return (
            <div className="w-11 h-[70%]  bg-yellow-500 shadow-[0px_4px_3px_0px_rgba(0,0,0,0.25)] rounded-lg" />
        )
    }
    else{
        return (
            <div className="w-11 h-[70%]  bg-green-600 shadow-[0px_4px_3px_0px_rgba(0,0,0,0.25)] rounded-lg" />
        )
    }
}