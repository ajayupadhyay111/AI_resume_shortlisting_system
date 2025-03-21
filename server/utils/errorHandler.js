const errorHandler = (error, req, res, next) => {
    if(error.status === 401){
        res.status(401).json({ message: error.message });
    }else{
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = errorHandler;
