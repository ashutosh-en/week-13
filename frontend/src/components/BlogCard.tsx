

interface BlogCardProps{
    authorName:string,
    title:string,
    content:string,
    publicationdate:string,
}
export const BlogCard=({
    authorName,
    title,
    content,
    publicationdate
}:BlogCardProps)=>{
    return<div className="p-4 border-b border-slate-200 pb-4">
        <div className="flex">
            <Avatar name={authorName}/>
            <div className="font-extralight pl-2 justify-center flex-col">{authorName}</div>
            <div className="font-thin text-slate-500 pl-2 justify-center flex-col">{publicationdate}</div>
        </div>
        <div className="text-xl font-semibold">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-sm font-thin text-slate-500 pt-4" >
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
}

export function Avatar({name,size="small"}:{name:string ,size?:"big"|"small"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`font-medium text-gray-600 dark:text-gray-300 ${size==="small"?"text-xs":"text-md"}`}>{name[0]}</span>
</div>
}

