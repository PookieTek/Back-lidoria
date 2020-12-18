const File = require('../models/files');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const uuid = require('uuid');

async function resize(name, path, ext) {
    const image = await Jimp.read(path);
    await image.writeAsync(`/uploads/${name}${ext}`);
    await image.resize(500, 500);
    await image.writeAsync(`/uploads/${name}_500x500${ext}`);
    await image.resize(250, 250);
    await image.writeAsync(`/uploads/${name}_250x250${ext}`);
    
}

exports.upload = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
        var oldpath = files.file.path;
        const namefile = files.file.name;
        var parse = namefile.split(".");
        var ext = "." + parse[parse.length - 1];
        var name = uuid.v4();
        const img = new File({
            path: `/uploads/${name}`,
            extension: ext
        });
        await img.save();
        await resize(name, oldpath, ext);
        res.status(200).json({img});
    });
};

exports.getFile = (req, res, next) => {
    if (!req.body.id)
        return res.status(401).json({error: "Params Missing"});
    File.findOne({_id: req.body.id})
    .then(file => {
        if (!file)
            return res.status(401).json({error: "No file found"});
        res.status(200).json(file);
    }).catch(error => res.status(500).json({error}));
};

exports.listFiles = (req, res, next) => {
    File.find()
    .then(files => {
        return res.status(200).json(files);
    }).catch(error => res.status(400).json({error}));
};

exports.delete = (req, res, nextr) => {
    if (!req.body.id)
        return res.status(401).json({error: "Params Missing"});
    File.findOne({_id: req.body.id})
    .then(file => {
        if (!file)
            return res.status(401).json({error: "No file found"});
        fs.unlinkSync(file.path + file.extension);
        fs.unlinkSync(file.path + "_500x500" + file.extension);
        fs.unlinkSync(file.path + "_250x250" + file.extension);
    }).catch(error => res.status(400).json({error}));
    File.deleteOne({_id: req.body.id})
    .then(file => {
        if (!file)
            return res.status(401).json({error: "No file found"});
    }).catch(error => res.status(400).json({error}));
    return res.status(200).json();
}
