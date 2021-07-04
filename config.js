const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' // development
    : 'http://localhost:3000/api'; // production

const dbUrl = process.env.NODE_ENV === 'development' 
    ? 'mongodb://localhost:27017/nextauth' // development
    : 'mongodb://localhost:27017/nextauth'; // production

const Url = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' // development
    : 'http://localhost:3000'; // production

export {
    apiUrl, 
    dbUrl,
    Url
};