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
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        db.select('*')
            .from('cocktails')
            .orderBy('id')
            .where('basespirit', 'like', `%${base_spirit.capitalize()}%`)
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
