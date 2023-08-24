import './Serach.css'

// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'
import { useQuery } from '../../hooks/useQuery'

// Components
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import { Link } from 'react-router-dom'

// Redux

const Search = () => {
    return (
        <div>Search</div>
    )
}

export default Search