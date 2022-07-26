import { useEffect, useId, useState } from "react"
import GithubLogo from "../assets/github-logo.svg"
import { useFetch } from "../hooks/useFetch"
import Repository from "./Repository"

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

interface BadgeProps {
	username: string
}

function findRepoPropertyValue(repo: RepositoryType, property: keyof RepositoryType) {
	return repo[Object.keys(repo).find(el => el === property) as keyof RepositoryType]
}

function filterBestRepoByProperty(repos: RepositoryType[] | null, property: keyof RepositoryType, setBestRepoByProperty: (repo: RepositoryType | undefined) => void) {
	const reposPropertyValues = repos?.map(repo => findRepoPropertyValue(repo, property))
	setBestRepoByProperty(repos?.find(repo => findRepoPropertyValue(repo, property) === Math.max(...reposPropertyValues as number[])))
}

export function Badge(props: BadgeProps) {
	const { data: profile, error } = useFetch<ProfileType>(props.username)
	const { data: repos } = useFetch<RepositoryType[]>(`${props.username}/repos`)

	const [mostStarredRepo, setMostStarredRepo] = useState<RepositoryType>()
	const [mostForkedRepo, setMostForkedRepo] = useState<RepositoryType>()

	const id = useId()

	useEffect(() => {
		filterBestRepoByProperty(repos, 'stargazers_count', setMostStarredRepo)
		filterBestRepoByProperty(repos, 'forks', setMostForkedRepo)
	}, [repos])

	if (!error) {
		return (
			<>
				<div className="w-32 h-min clip-path-hexagon mt-10">
					<img src={profile?.avatar_url} alt="Github Profile Image" />
				</div>
				<p className="text-2xl text-white text-center block font-thin">{profile?.name}</p>
				<a target='_blank' href={profile?.html_url} className="flex gap-3 mt-4 group">
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
				</div>
			</>
		)
	} else {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<p className="text-white font-extralight text-lg text-center">{`Error while fetching Github data. Username '${props.username}' is possibly incorrect.`}</p>
			</div>
		)
	}
}

