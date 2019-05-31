const handleCocktails = (req, res, db) => {
    const { page } = req.query;
    
    var from = page ? 25 * (page - 1) + 1 : 1
    var end = page ? 25 * page : 25
    var nextToken = page ? parseInt(page) + 1 : 2
    var resultObj = {}

    db.select('*').from('cocktails').whereBetween('id', [from, end]).then(cocktail => {
        resultObj['cocktail'] = cocktail
        resultObj['nextToken'] = nextToken
        res.json(resultObj)
    }).
    catch(err => res.status(400).json('error getting cocktails'))
}

module.exports = {
    handleCocktails: handleCocktails
};
