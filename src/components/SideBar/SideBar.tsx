import { Categories } from '../../Types/Types';
import './SideBar.scss';

interface CategoriesProps{
  categories: Categories[] 
  handleChangeCategory: (categoryName:string) => void
  selectedCategory:string
}


const SideBar : React.FC<CategoriesProps> = ({categories,handleChangeCategory,selectedCategory}) => {
  return (
    <div className='sidebar'>
      <h3 className='sidebar-title'>Tür</h3>
      {categories && categories.map((category) =>(
        <button key={category.id}  className='sidebar-btn' onClick={() => handleChangeCategory(category.name)}>{category.name}</button>
      ))}
      {selectedCategory !== "All Movies" &&(
        <button className='sidebar-btn' onClick={() => handleChangeCategory("All Movies")}>Filtreyi Temizle</button>
      )}
    </div>
  )
}

export default SideBar
