import { FormEvent, useState } from "react"
import GithubLogo from '../assets/github-logo.svg'

interface LoginProps {
    setIsLogged: (arg: boolean) => void
    setUsername: (arg: string) => void
}

export function Login(props: LoginProps) {
    const [inputValue, setInputValue] = useState('')

    return (
        <>
            <p className="font-light text-white mt-12 xs:text-2xl text-xl">Login to your Github account</p>
            <form
                className="mt-8 flex flex-col w-full px-12 gap-6"
                autoComplete="off"
                onSubmit={
                    (e: FormEvent) => {
                        e.preventDefault()
                        props.setIsLogged(true)
                        props.setUsername(inputValue)
                    }
                }>
                <div className="flex justify-center items-center gap-2">
                    <label htmlFor="username">
                        <img src={GithubLogo} alt='github logo' className="w-5" />
                    </label>
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        className="px-2 outline-none mr-full bg-transparent border-b-2 w-40 focus:border-secondary xs:focus:w-full focus:w-3/5 transition-all duration-300 border-[#ffffff4f] text-white font-sans font-light"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary-300 w-24 mt-6 mb-8 py-2 rounded-sm shadow-md shadow-[#00000053] self-center font-sans text-sm hover:bg-primary-500 active:shadow-none active:scale-90 transition-all"
                >
                    Submit
                </button>
            </form>
        </>
    )
}