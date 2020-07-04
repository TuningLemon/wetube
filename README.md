# WETUBE

Cloning Youtube with Vanilla and NodeJS

## Pages:
----------------------


- []Home
- [x]Join
- [x]Login
- [x]Search
- []User Detail
- []Edit Profile
- []Change Password
- []Upload
- []Video Detail
- []Edit Video


## 정리중
------------------------------

init.js > app.js > router > controller > (home)pug > (videoBlock) pug


- init.js:
open port

- app.js:
express app
middleware 
메인 router 연결 

- middlewares.js:
multer 
localMiddleware  // 미들웨어로 로컬변수를 global 변수로 사용하도록 만든다 

- routes.js:
각종 라우터(길) 설정 

- db.js: 
init.js 에서 import되어있음. 
mongoose.connection
DB CONNECTED 

- gitignore 
공유된 공간에 git으로 올리는데 제외되는 것 

* FOLDER LIST

- views (.pug)
    - layouts : main 
    - partials: header footer socialLogin
    - 특징: 모든 url HTML 템플릿 

- models
    - Video.js : mongoose 로 schema 설정 후, model 생성 완료. 
    - Comments.js

- routers (routes.js 작성한 구성대로)
    - 특징 : controller에 연결됨. 
    - globalRouter
    - userRouter 
    - videoRouter

- controllers
    - 특징: routers에 연결되어 있는 각종 함수들. 
    - 각 함수는 res.render("pug파일이름", {전달 변수}) 을 렌더링함. 
    - userController.js
    - videoController.js



