import './Home.css'

// Components
import LikeContainer from '../../components/LikeContainer/LikeContainer'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import { Link } from 'react-router-dom'


// Hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from '../../hooks/useResetComponentMessage'

// Redux
import { getPhotos, like } from '../../slices/photoSlice'

const Home = () => {

    const dispatch = useDispatch()
    const resetMessage = useResetComponentMessage()

    const { user } = useSelector((state) => state.auth)
    const { photos, loading } = useSelector((state) => state.photo)

    // load all photos
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    // like a photo
    const handleLike = (photo) => {
        dispatch(like(photo._id))
        resetMessage()
    }

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div>
            <h1>ReactGram</h1>
        </div>
    )
}

export default Home