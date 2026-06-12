const songModel = require("../models/song.model");
const id3 = require("node-id3");
const { uploadFile } = require("../service/storage.service");

async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ success: false, message: "Mood is required" });
    }

    const tags = id3.read(req.file.buffer);
    const artist = tags?.artist || tags?.TPE1 || "Unknown Artist";
    const title = tags?.title || req.file.originalname || "Untitled";

    const [songFile, posterFile] = await Promise.all([
      uploadFile({ buffer: songBuffer, filename: title + ".mp3", folder: "/Moodify/songs" }),
      uploadFile({ buffer: tags?.image?.imageBuffer || Buffer.alloc(0), filename: title + ".jpeg", folder: "/Moodify/poster" })
    ]);

    const song = await songModel.create({ title, artist, url: songFile.url, posterUrl: posterFile.url, mood });

    return res.status(201).json({ success: true, message: "Song created successfully", song });
  } catch (error) {
    console.error("[uploadSong] Error:", error);
    return res.status(500).json({ success: false, message: "Error uploading song", error: error.message });
  }
}

async function getSong(req, res) {
  try {
    const { mood } = req.query;

    const query = {};
    if (mood) {
      // Normalize to lowercase so "Happy" and "happy" both work
      query.mood = mood.toLowerCase().trim();
    }

    console.log(`[getSong] query:`, query);
    const songs = await songModel.find(query);
    console.log(`[getSong] found ${songs.length} songs for mood "${mood}"`);

    // ✅ KEY FIX: was "song:" — frontend reads "songs:"
    return res.status(200).json({
      success: true,
      message: "Songs fetched successfully",
      songs: songs || []
    });
  } catch (error) {
    console.error("[getSong] Error:", error);
    return res.status(500).json({ success: false, message: "Error fetching songs", error: error.message });
  }
}

module.exports = { uploadSong, getSong };
