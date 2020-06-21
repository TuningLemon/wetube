import routes from "./routes";

export const localsMdiddleware = (req, res, next) => {

    //미들웨어로 로컬변수를 global 변수로 사용하도록 만든다.
    res.locals.siteName = 'Wetube';
    res.locals.routes = routes;
    next();
};