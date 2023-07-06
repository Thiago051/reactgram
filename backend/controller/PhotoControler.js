const Photo = require('../models/Photo')
const User = require('../models/User')

const mongoose = require('mongoose')

// insert a photo, with an user related
const insertPhoto = async (req, res) => {

    const { title } = req.body
    const image = req.file.filename

    const user = await User.findById(req.user._id)

    // create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userID: user._id,
        userName: user.name
    })

    // if photo was created successfully, return data
    if (!newPhoto) {
        res.status(422).json({ errors: ['Houve um problema, por favor tente mais tarde.'] })
    }

    res.status(201).json(newPhoto)
}

// remove a photo from DB
const deletePhoto = async (req, res) => {

    const { id } = req.params
    const userId = req.user._id

    try {
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

        // check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ['1 Foto não encontrada.'] })
            return
        }

        // check if photo belongs to user
        if (!photo.userID.equals(userId)) {
            res.status(422).json({ errors: ['Ocorreu um erro, por favor tente novamente mais tarde.'] })
            return
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({ id: photo._id, message: 'Foto excluída com sucesso' })
    } catch (error) {
        res.status(404).json({ errors: ['2 Foto não encontrada.'] })
        return
    }
}

// get all photos
const getAllPhotos = async (req, res) => {

    const photos = await Photo.find({}).sort([['createdAt', -1]]).exec()

    res.status(200).json(photos)
}

// get user photos
const getUserPhotos = async (req, res) => {

    const { id } = req.params

    const photos = await Photo.find({ userID: id }).sort([['createdAt', -1]]).exec()

    res.status(200).json(photos)
}

// get photo by id
const getPhotoById = async (req, res) => {

    const { id } = req.params

    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    // check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ['Foto não encontrada.'] })
        return
    }

    res.status(200).json(photo)
}

// update a photo
const updatePhoto = async (req, res) => {

    const { id } = req.params
    const { title } = req.body

    const reqUser = req.user

    const photo = await Photo.findById(id)

    // check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ['Foto não encontrada.'] })
        return
    }

    // check if photo belongs to user
    if (!photo.userID.equals(reqUser._id)) {
        res.status(422).json({ erors: ['Ocorreu um erro, por favor tente novamente mais tarde.'] })
        return
    }

    if (title) {
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message: 'Foto atualizada com sucesso.'})
}

// like funcionality
const likePhoto = async (req, res) => {

    const {id} = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)
    
    // check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ['Foto não encontrada.'] })
        return
    }

    // check if user already liked the photo
    if(photo.likes.includes(reqUser._id)) {
        res.status(422).json({errors: ['Você já curtiu a foto.']})
        return
    }

    // put user id in likes array
    photo.likes.push(reqUser.id)

    await photo.save()

    res.status(200).json({photoId: id, userId: reqUser._id, message: 'A foto foi curtida'})
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto
}