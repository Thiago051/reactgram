import './Photo.css'

import { uploads } from '../../utils/config'


// Components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'
import PhotoItem from '../../components/PhotoItem/PhotoItem'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { getPhoto } from '../../slices/photoSlice'


const Photo = () => {

    const { id } = useParams()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth)
    const { photo, loading, error, message } = useSelector((state) => state.photo)

    // comentários

    // load photo data
    useEffect(() => {
        dispatch(getPhoto(id))
    }, [dispatch, id])

    // like e comentários

    if (loading) {
        return <p>Carregando...</p>
    }

    return (
        <div id='photo'>
            <PhotoItem photo={photo} />
        </div>
    )
}

export default Photo