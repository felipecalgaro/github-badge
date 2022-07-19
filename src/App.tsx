import FacebookIcon from './assets/facebook-icon.svg'
import GithubLogo from "./assets/github-logo.svg"
import InstagramIcon from './assets/instagram-icon.svg'
import TwitterIcon from './assets/twitter-icon.svg'
import YoutubeIcon from './assets/youtube-icon.svg'
import { SocialMediaButton } from "./components/SocialMediaButton"
import { useFetch } from './hooks/useFetch'

const socialMedias = [
  {
    name: 'Facebook',
    href: '#',
    iconSrc: FacebookIcon
  },
  {
    name: 'Twitter',
    href: '#',
    iconSrc: TwitterIcon
  },
  {
    name: 'Instagram',
    href: '#',
    iconSrc: InstagramIcon
  },
  {
    name: 'Youtube',
    href: '#',
    iconSrc: YoutubeIcon
  },
]

interface DataType {
  login: string
  name: string
  avatar_url: string
  bio: string
  html_url: string
}

function App() {
  const { data: profile } = useFetch<DataType>('diego3g')

  return (
    <div className="w-screen bg-zinc-800 h-screen bg-blur bg-cover bg-top bg-no-repeat flex justify-center items-center relative overflow-hidden">
      <div className="w-auto h-[600px] relative flex items-center">
        <div className="rounded-full bg-gradient-to-tr animate-bounce-slow from-primary to-secondary w-40 h-40 right-3/4 top-2/3 absolute"></div>
        <div className="rounded-full animate-bounce-slower bg-gradient-to-br from-primary to-secondary w-60 h-60 left-3/4 bottom-1/2 absolute"></div>
        <div className="clip-path-hexagon animate-bounce-slowest bg-gradient-to-tl from-secondary to-primary w-72 h-72 right-full top-10 absolute"></div>
        <div className="clip-path-triangle animate-bounce-normal bg-gradient-to-l from-primary to-secondary w-52 h-52 left-3/4 bottom-11 absolute"></div>
        <main className="w-96 h-full backdrop-blur-md shadow-xl shadow-[#00000057] bg-[#ffffff0c] border-2 rounded-md border-[#ffffff18] flex flex-col items-center">
          <div className="w-32 h-min clip-path-hexagon mt-10">
            <img src={profile?.avatar_url} alt="Github Profile Image" />
          </div>
          <p className="text-2xl text-white text-center block mt-8 font-thin">{profile?.name}</p>
          <a href={profile?.html_url} className="flex gap-3 mt-4 group">
            <img src={GithubLogo} alt="Github Logo" />
            <p className="text-white group-hover:text-stone-400 transition-colors">{profile?.login}</p>
          </a>
          <div className="px-8 m-8 text-center">
            <p className="text-stone-300 font-thin">{profile?.bio}</p>
          </div>
          <div className="flex justify-center gap-4">
            {socialMedias.map(socialMedia => <SocialMediaButton name={socialMedia.name} href={socialMedia.href} iconSrc={socialMedia.iconSrc} key={socialMedia.name} />)}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
