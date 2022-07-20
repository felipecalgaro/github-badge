import { GitFork, Star } from "phosphor-react"

interface RepositoryProps {
    propertyValue: number | undefined
    property: string | undefined
    html_url: string | undefined
    id: string | undefined
    name: string | undefined
}

export default function Repository(props: RepositoryProps) {
    console.log('chegou');
    return (
        <div className="flex justify-center items-center text-center gap-2 flex-col text-white font-sans w-full xs:w-auto">
            <a
                target='_blank'
                href={props.html_url}
                key={props.id}
                className='text-center px-2 flex-col gap-3 w-36 bg-[#ffffff15] shadow-[#00000057] shadow-lg border-2 border-[#ffffff0d] rounded-sm flex justify-center items-center hover:shadow-md hover:bg-[#ffffff0b] hover:scale-[0.98] duration-300 transition-all'
            >
                <div className="h-12 flex items-center justify-center">
                    <p>{props.name}</p>
                </div>
                <hr className="w-5/6 mx-auto" />
                <div className="flex justify-center items-center gap-1 mb-2">
                    <p>{props.propertyValue}</p>
                    {props.property === 'stars' ? <Star /> : <GitFork />}
                </div>
            </a>
            <p className="text-sm xs:mb-0 mb-4 text-stone-200 font-thin">{`Repo with most ${props.property}`}</p>
        </div>
    )
}   