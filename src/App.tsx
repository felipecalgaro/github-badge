import { useState } from "react";
import { Badge } from "./components/Badge";
import { InformUser } from './components/InformUser';

export default function App() {
  const [isUserInformed, setIsUserInformed] = useState(false)
  const [username, setUsername] = useState('')

  return (
    <div className="w-screen bg-zinc-800 h-screen bg-blur bg-cover bg-top bg-no-repeat flex justify-center items-center relative overflow-x-hidden">
      <div className="w-auto xs:h-[600px] h-auto relative flex items-center">
        <div className="rounded-full bg-gradient-to-tr animate-bounce-slow from-primary-300 to-secondary w-40 h-40 right-3/4 top-2/3 absolute"></div>
        <div className="rounded-full animate-bounce-slower bg-gradient-to-br from-primary-300 to-secondary w-60 h-60 left-3/4 bottom-1/2 absolute"></div>
        <div className="clip-path-hexagon animate-bounce-slowest bg-gradient-to-tl from-secondary to-primary-300 w-72 h-72 right-full top-10 absolute"></div>
        <div className="clip-path-triangle animate-bounce-normal bg-gradient-to-l from-primary-300 to-secondary w-52 h-52 left-3/4 bottom-11 absolute"></div>
        <main className={isUserInformed ? "w-96 h-full backdrop-blur-md shadow-xl shadow-[#00000057] bg-[#ffffff0c] border-2 rounded-md border-[#ffffff18] flex flex-col items-center" : "w-96 h-auto backdrop-blur-md shadow-xl shadow-[#00000057] bg-[#ffffff0c] border-2 rounded-md border-[#ffffff18] flex flex-col items-center"}>
          {isUserInformed ? <Badge username={username} /> : <InformUser setUsername={setUsername} setIsUserInformed={setIsUserInformed} />}
        </main>
      </div>
    </div>
  )
}