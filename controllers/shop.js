const {Shop, Categorie} = require('../models/shop');

exports.newProduct = (req, res, next) => {
    if (!req.body.title || !req.body.categorie || !req.body.price || !req.body.photos)
        return res.status(403).json({error: "Params Missing"});
    Shop.create({
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        categorie: req.body.categorie,
        quantity: req.body.quantity ? req.body.quantity : 0,
        price: req.body.price,
        coupon : req.body.coupon ? req.body.coupon : {activate: false},
        hidden: req.body.hidden ? req.body.hidden : false,
        meta : {hit : 0},
        photos : req.body.photos
    })
         .then(() => res.status(201).json({message:"Succes"}))
         .catch(error => res.status(401).json({error}));
};

exports.editProduct = (req, res, next) => {
    if (!req.body.id)
        return res.status(403).json({error: "Params Missing"});
    Shop.updateOne({id: req.body.id}, {$set: {
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        categorie: req.body.categorie,
        quantity: req.body.quantity ? req.body.quantity : 0,
        price: req.body.price,
        coupon : req.body.coupon ? req.body.coupon : {activate: false},
        hidden: req.body.hidden ? req.body.hidden : false,
        photos : req.body.photos
    }})
         .then(() => res.status(201).json({message:"Succes"}))
         .catch(error => res.status(401).json({error}));
};

exports.deleteProduct = (req, res, next) => {
    if (!req.body.title)
        return res.status(401).json({error: "Params Missing"});
    Shop.deleteOne({title: req.body.title})
    .then(() => res.status(201).json({message: "Succes"}))
    .catch(error => res.status(401).json({error}));
};

exports.getOneProduct = (req, res, next) => {
    if (!req.body.title)
        return res.status(401).json({error: "Params Missing"});
    Shop.findOne({title: req.body.title}).populate('photos').exec()
    .then(item => {
        if (!item)
            return res.status(401).json({error: "No Item Found"});
        else {
            return res.status(200).json({
                title: item.title,
                description: item.description,
                categorie: item.categorie,
                theme: item.theme,
                quantity: item.quantity,
                price: item.price,
                photos: item.photos
            });
        }
    });
};

exports.listAll = (req, res, next) => {
    var query = {}
    var sortQ = {}
    if (req.body.filter)
        Categorie.find({name: req.body.filter}).populate('photos').exec()
        .then(query = {categorie: req.body.filter})
    if (req.body.sort)
        sortQ = req.body.sort
    Shop.find(query).limit(req.body.limit).sort(sortQ).populate('photos').exec()
    .then(item => {
        if (!item[0])
            return res.status(401).json({error: "No Item"});
        return res.status(200).json(item)
    });
};

exports.newCategorie = (req, res) => {
    if (!req.body.name)
        return res.status(403).json({error: "Params Missing"})
    Categorie.create({name: req.body.name})
    .then (cat => {
        return res.status(200).json(cat)
    });
}

exports.listCategories = (req, res) => {
    Categorie.find({})
    .then (cat => {
        return res.status(200).json(cat)
    });
}


// Add Buy Callback + Paypal Integration !!!!!