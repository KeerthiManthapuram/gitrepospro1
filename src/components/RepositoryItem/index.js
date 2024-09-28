// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} =
    repositoryItemDetails
  return (
    <li className="item">
      <img src={avatarUrl} className="avatar" alt={name} />
      <h1 className="name">{name}</h1>
      <div className="counts-holder">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="counts">{starsCount} stars</p>
      </div>
      <div className="counts-holder">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="counts">{forksCount} forks</p>
      </div>
      <div className="counts-holder">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="counts">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
