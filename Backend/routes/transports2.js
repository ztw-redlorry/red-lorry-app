
module.exports = (app, db) => {
    app.get( "/transports2", (req, res) =>
        db.transport.findAll({
            include: [{
                model: Order,
                required: true
            }]
        }).then( (result) => res.json(result) )
    );
};