const ProductModel = require('../models/product')

const getAllProductsStatic = async (req,res,next) => {
    try {
        const allProducts = await ProductModel.find({price: { $gt: 40 } }).sort('price')
        res.status(200).json({ allProducts, nbHits: allProducts.length})
    } catch (error) {
        console.log(error)
    }
}

const getAllProducts = async (req,res,next) => {
    try {
        const { featured, company, name, sort, fields, numericFilters } = req.query
        let queryObject = {}

        if (featured) {
            queryObject.featured = 'true' ? true : false
        }

        if (company) {
            queryObject.company = company
        }

        if (name) {
            queryObject.name = { $regex: name, $options: 'i' }
        }

        let result = ProductModel.find(queryObject)

        if (numericFilters) {
            const operatorMap = {
                '>':'$gt',
                '>=':'$gte',
                '=':'$eq',
                '<':'$lt',
                '<=':'$lte',
            }
            const regEx = /\b(<|>|>=|<=|=)\b/
            const filters = numericFilters.replace(
                regEx, 
                (match) => `-${operatorMap[match]}-`
            )
            const options = ['price', 'rating']
            filters = filters.split(',').forEach((item) => {
                const [field, operator,value] = item.split()
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) }
                }
            })

        }

        if ( sort ) {
            const sortList = sort.split(','). join(' ')
            result = result.sort(sortList)
        } else {
            result = result.sort('createdAt')
        }

        if (fields) {
            const fieldsList = fields.split(',').join(' ')
            result = result.select(fieldsList)
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit
        result = result.limit(limit).skip(skip)

        allProducts = await result
        if (!allProducts) {
            return res.status(200).json({ success: true })
        }
        res.status(200).json({ allProducts, nbHits: allProducts.length })
    } catch (error) {
        console.log(error)
    }
}

const getProduct = (req,res) => {
    res.send('Product Infos')
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
    getProduct
}