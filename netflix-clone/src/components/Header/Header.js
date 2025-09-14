import React from 'react'
import './header.css'
import SearchIcon from '@mui/icons-material/Search';
import NetflixLogo from '../../assets/images/NetflixLogo.png'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  return (
    <div className='header_outer_container'>
      <div className="header_container">
        <div className="header_left">
          <ul>
            <li><img src={NetflixLogo} alt="Netflix Logo" width="100" /></li>
            <li className='list'>Home</li>
            <li className='list'>TVShows</li>
            <li className='list'>Movies</li>
            <li className='list'>Latest</li>
            <li className='list'>MyList</li>
            <li className='list'>Browse by Languages</li>
          </ul>
        </div>
        <div className="header_right">
          <ul>
            <li><SearchIcon /></li>
            <li><NotificationsNoneIcon /></li>
            <li><AccountBoxIcon /></li>
            <li><ArrowDropDownIcon /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header


