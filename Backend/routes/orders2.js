module.exports = (app, db) => {
    app.get( "/orders2", (req, res) =>
        db.zamowienie.findAll().then( (result) => res.json(result) )
    );
};