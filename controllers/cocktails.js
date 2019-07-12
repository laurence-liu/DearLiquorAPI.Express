const handleCocktails = (req, res, db) => {
    const { base_spirit, page } = req.query;
    
    var nextToken = page ? parseInt(page) + 1 : 2
    var resultObj = {}

    if (base_spirit == null && page != null) {
        db.select('*')
            .from('cocktails')
            .orderBy('id')
            .limit(20)
            .offset(20 * (page - 1))
            .then(cocktail => {
                resultObj['cocktail'] = cocktail
                resultObj['nextToken'] = nextToken
                res.json(resultObj)
        }).catch(err => res.status(400).json('error getting cocktails'))
    }
    
    if (base_spirit != null) {
        db.select('*')
            .from('cocktails')
            .orderBy('id')
            .where('basespirit', 'like', '%Whiskey%')
            .orWhere('basespirit', 'like', '%Whisky%')
            .limit(20)
            .offset(20 * (page - 1))
            .then(cocktail => {
                resultObj['cocktail'] = cocktail
                resultObj['nextToken'] = nextToken
                res.json(resultObj)
        }).catch(err => res.status(400).json('error getting cocktails'))
    }
}

module.exports = {
    handleCocktails: handleCocktails
};
