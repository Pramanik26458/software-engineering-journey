const songModel=require("../models/song.modal")
const id3=require("node-id3")
const storageService=require("../service/storage.service")
async function uploadSong(req,res){

  const songBuffer=req.file.buffer  

  const  {mood} =req.body;

  const tags =id3.read(req.file.buffer)
  const [songFile, posterFile] = await Promise.all([
    storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/Moodify/songs"
    }),
    storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/Moodify/poster"
    })
  ])

  const song =await songModel.create({
    title:tags.title,
    url:songFile.url,
    posterUrl:posterFile.url,
    mood
  })

  res.status(201).json({
    message:"song created Sucessfully",
    song
  })

}

async function getSong(req, res) {

    const { mood } = req.query;

    const song = await songModel.find({
        mood
    });

    res.status(200).json({
        message: "song fetched sucessfully.",
        song,
    });
}

module.exports={ uploadSong ,getSong}