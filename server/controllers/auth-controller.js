const home = async (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error){
        console.error(error);
    }
};

// Registration Logic

const register = async (req, res) => {
    try{
        res.status(200).send({message:req.body});
    } catch (error){
        res.status(400).send({message:"Page not found"});
    }
}

module.exports = {home, register};