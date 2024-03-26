
import { Link } from 'react-router-dom'
import './PersonalInformation.scss'
import AccountInfo from '../../components/AccountInfo/AccountInfo'
const PersonalInformation = () => {
  return (
    <div className='personal-information'>
      <AccountInfo />
      <Link to={"/"} className="back-to-home-btn">Anasayfaya Geri Dön</Link>
    </div>
  )
}

export default PersonalInformation
