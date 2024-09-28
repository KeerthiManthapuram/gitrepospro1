// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterItemData, isActive, updateActiveFilterId} = props
  const {id, language} = languageFilterItemData

  const onSelectingFilter = () => {
    updateActiveFilterId(id)
  }

  const selectedBtn = isActive ? 'highlight' : ''

  return (
    <li className="filter-item">
      <button
        type="button"
        className={`filter-btn ${selectedBtn}`}
        onClick={onSelectingFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
