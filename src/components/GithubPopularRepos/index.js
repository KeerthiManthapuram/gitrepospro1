import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failed: 'FAILED',
  success: 'SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositoriesData: [],
    activeFilterButtonId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getRepositoriesData()
  }

  getRepositoriesData = async () => {
    const {activeFilterButtonId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilterButtonId}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failed,
      })
    }
  }

  updateActiveFilterId = id => {
    this.setState(
      {
        activeFilterButtonId: id,
      },
      this.getRepositoriesData,
    )
  }

  renderFilterButtons = () => {
    const {activeFilterButtonId} = this.state
    return (
      <ul className="filter-items-holder">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageFilterItemData={eachLanguage}
            isActive={eachLanguage.id === activeFilterButtonId}
            updateActiveFilterId={this.updateActiveFilterId}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItems = () => {
    const {repositoriesData} = this.state
    return (
      <ul className="items-holder">
        {repositoriesData.map(each => (
          <RepositoryItem key={each.id} repositoryItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  renderNotFoundView = () => {
    return (
      <div className="not-found-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="image"
        />
        <h1 className="warn">Something Went Wrong</h1>
      </div>
    )
  }

  rendertheItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItems()
      case apiStatusConstants.failed:
        return this.renderNotFoundView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        {this.renderFilterButtons()}
        {this.rendertheItems()}
      </div>
    )
  }
}

export default GithubPopularRepos
