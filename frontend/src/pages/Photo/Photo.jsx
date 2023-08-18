import './Photo.css'

import { uploads } from '../../utils/config'


// Components
import Message from '../../components/Message/Message'
import { Link } from 'react-router-dom'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// Redux

const Photo = () => {

    const { id } = useParams()

    return (
        <div>Photo: {id}</div>
    )
}

export default Photo