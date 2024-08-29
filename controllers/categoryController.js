const Category=require('../model/category');

//Add Category
async function createCategory  (req, res)  {
    const { name,createdBy } = req.body;
    try {
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ msg: 'Category already exists' });
        }
        const category = new Category({ 
            name,
            createdBy,
            createdAt:Date.now() });
        await category.save();
        res.status(201).json({ msg: 'Category created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


//getAll category
async function getAllCategories (req, res) {
    try {
        const categories = await Category.find();
        
        res.status(201).json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//Update category
async function updateCategory  (req, res) {
    const { name,createdBy } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        category.name= name || category.name;
        category.createdBy= createdBy || category.createdBy;
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//Delete category
async function deleteCategory  (req, res)  {
   
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ msg: 'Category not found' });
        }
        res.status(201).json({ msg: 'Category deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports={
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
 };
