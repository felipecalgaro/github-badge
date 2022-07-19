type SocialMediaButtonProps = {
    name: string
    href: string
    iconSrc: string
}

export function SocialMediaButton(props: SocialMediaButtonProps) {
    return (
        <a
            href={props.href}
            className="bg-[#ffffff15] shadow-[#00000057] shadow-lg border-2 border-[#ffffff0d] rounded-sm w-12 h-12 flex justify-center items-center hover:shadow-md hover:bg-[#ffffff0b] hover:scale-95 duration-300 transition-all"
            key={props.name}
        >
            <img src={props.iconSrc} alt={`${props.name} icon`} />
        </a>
    )
}