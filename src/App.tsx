import { useEffect, useId, useState } from 'react'
import GithubLogo from "./assets/github-logo.svg"
import Repository from './components/Repository'
import { useFetch } from './hooks/useFetch'

// const socialMedias = [
//   {
//     name: 'Facebook',
//     href: '#',
//     iconSrc: FacebookIcon
//   },
//   {
//     name: 'Twitter',
//     href: '#',
//     iconSrc: TwitterIcon
//   },
//   {
//     name: 'Instagram',
//     href: '#',
//     iconSrc: InstagramIcon
//   },
//   {
//     name: 'Youtube',
//     href: '#',
//     iconSrc: YoutubeIcon
//   },
// ]

interface ProfileType {
  login: string
  name: string
  avatar_url: string
  bio: string
  html_url: string
}

interface RepositoryType {
  name: string | undefined
  key: string | undefined
  html_url: string | undefined
  stargazers_count?: number | undefined
  forks?: number | undefined
  watchers?: number | undefined
}

function findRepoPropertyValue(repo: RepositoryType, property: keyof RepositoryType) {
  return repo[Object.keys(repo).find(el => el === property) as keyof RepositoryType]
}

function filterBestRepoByProperty(repos: RepositoryType[] | null, property: keyof RepositoryType, setBestRepoByProperty: (repo: RepositoryType | undefined) => void) {
  const reposPropertyValues = repos?.map(repo => findRepoPropertyValue(repo, property))
  setBestRepoByProperty(repos?.find(repo => findRepoPropertyValue(repo, property) === Math.max(...reposPropertyValues as number[])))
}

function App() {
  const { data: profile } = useFetch<ProfileType>('diego3g')
  const { data: repos } = useFetch<RepositoryType[]>('diego3g/repos')
  const [mostStarredRepo, setMostStarredRepo] = useState<RepositoryType>()
  const [mostForkedRepo, setMostForkedRepo] = useState<RepositoryType>()
  // const [mostWatchersRepo, setMostWatchersRepo] = useState<RepositoryType>()

  const id = useId()
  // const [bestRepos, setBestRepos] = useState<RepositoryType[] | undefined>()

  // const previousValues = useRef({ mostForkedRepo, mostStarredRepo, mostWatchersRepo })

  useEffect(() => {
    // const reposStars = repos?.map(repo => repo.stargazers_count)
    // setMostStarredRepo(repos?.find(repo => repo.stargazers_count === Math.max(...reposStars as number[])))

    // const reposForks = repos?.map(repo => repo.forks)
    // setMostForkedRepo(repos?.find(repo => repo.forks === Math.max(...reposForks as number[])))

    // const reposWatchers = repos?.map(repo => repo.watchers)
    // setMostForkedRepo(repos?.find(repo => repo.watchers === Math.max(...reposWatchers as number[])))

    filterBestRepoByProperty(repos, 'stargazers_count', setMostStarredRepo)
    filterBestRepoByProperty(repos, 'forks', setMostForkedRepo)
    // filterBestRepoByProperty(repos, 'watchers', setMostWatchersRepo)
  }, [repos])

  // useEffect(() => {
  //   if (
  //     previousValues.current.mostForkedRepo !== mostForkedRepo &&
  //     previousValues.current.mostStarredRepo !== mostStarredRepo &&
  //     previousValues.current.mostWatchersRepo !== mostWatchersRepo
  //   ) {
  //     setBestRepos([mostForkedRepo, mostStarredRepo, mostWatchersRepo] as RepositoryType[])
  //     previousValues.current = { mostForkedRepo, mostStarredRepo, mostWatchersRepo }
  //   }
  // })

  return (
    <div className="w-screen bg-zinc-800 h-screen bg-blur bg-cover bg-top bg-no-repeat flex justify-center items-center relative overflow-x-hidden">
      <div className="w-auto xs:h-[600px] h-auto relative flex items-center">
        <div className="rounded-full bg-gradient-to-tr animate-bounce-slow from-primary to-secondary w-40 h-40 right-3/4 top-2/3 absolute"></div>
        <div className="rounded-full animate-bounce-slower bg-gradient-to-br from-primary to-secondary w-60 h-60 left-3/4 bottom-1/2 absolute"></div>
        <div className="clip-path-hexagon animate-bounce-slowest bg-gradient-to-tl from-secondary to-primary w-72 h-72 right-full top-10 absolute"></div>
        <div className="clip-path-triangle animate-bounce-normal bg-gradient-to-l from-primary to-secondary w-52 h-52 left-3/4 bottom-11 absolute"></div>
        <main className="w-96 h-full backdrop-blur-md shadow-xl shadow-[#00000057] bg-[#ffffff0c] border-2 rounded-md border-[#ffffff18] flex flex-col items-center">
          <div className="w-32 h-min clip-path-hexagon mt-10">
            <img src={profile?.avatar_url} alt="Github Profile Image" />
          </div>
          <p className="text-2xl text-white text-center block font-thin">{profile?.name}</p>
          <a href={profile?.html_url} className="flex gap-3 mt-4 group">
            <img src={GithubLogo} alt="Github Logo" />
            <p className="text-white group-hover:text-stone-400 transition-colors">{profile?.login}</p>
          </a>
          <div className="px-8 m-8 text-center">
            <p className="text-stone-300 font-thin">{profile?.bio}</p>
          </div>
          <div className="flex justify-center items-center flex-wrap xs:gap-4 gap-6">
            <Repository
              name={mostForkedRepo?.name}
              html_url={mostForkedRepo?.html_url}
              id={id + 'fork-repo'}
              propertyValue={mostForkedRepo?.forks}
              property={'forks'}
            />
            <Repository
              name={mostStarredRepo?.name}
              html_url={mostStarredRepo?.html_url}
              id={id + 'star-repo'}
              propertyValue={mostStarredRepo?.stargazers_count}
              property={'stars'}
            />
            {/* <Repository
              name={mostWatchersRepo?.name}
              html_url={mostWatchersRepo?.html_url}
              key={id + 'watcher-repo'}
              propertyValue={mostWatchersRepo?.watchers}
              property={'watchers'}
            /> */}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
