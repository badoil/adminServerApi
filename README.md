# 온라인 스토어 서버 api 작업

스타트업 회사인 teameverywhere 의 외주를 받음
온라인 쇼핑몰의 서버 api 작업으로서, 나름 규모있는 서버 api 작성을 외주로 작업

# Javascript, Mysql, Swagger

프로그램 언어는 자바스크립트, 데이터베이스는 mysql로 작업함
프론트쪽과의 작업을 위해서 swagger로 진행

# Rest-api

Rest-api 를 따르고 있고, 이에 따라 CRUD 구현

# 프로젝트 구조

기타 세팅파일 및 config 파일들은 생략해서 올렸고, 작업했던 api 및 model 위주로 올림

server/controllers/api/
+ 스웨거와 연결되는 index 파일과 라우팅을 담당하는 ctrl(컨트롤) 파일, 데이터베이스 쿼리를 요청하는 model을 핸들링하는 handler 파일로 구성
+ 쿼리 요청결과를 여기서 처리하여 프로트로 응답결과(response)를 보내줌

async/await
+ 비동기 처리를 위해서 모든 쿼리 요청은 async/await 으로 하였고, try/catch로 예외처리 및 에러처리를 마련

models/
+ 직접적인 쿼리문을 여기서 작성하고 components/db.js 로 쿼리를 요청해서 mysql 데이터 처리
+ 또한 쿼리 요청 결과는 리턴되어 다시 server/controllers/api/ 로 보내짐

mysql - beginTransaction/commit/rollback
+ mysql의 커밋과 롤백은 components/db.js 에서 promise로 처리하고 query도 여기서 처리

# Overview

데이터구조
+ 결국 프론트로 응답하는 데이터 구조를 프론트엔드 개발자와 협의해서 결정 후 구조에 맞게 json 형태로 response 보냄

데이터처리
+ 데이터를 알맞게 보내주기 위해서 server/controllers/api/ 의 ctrl 파일에서 여러 데이터 처리가 필요했음
+ 특히 데이터 update 요청 중에서 multiple update 요청은 쿼리문 자체에 변수를 사용하고 for문을 이용하는등 처리에 애먹음(ex: models/goods)
+ 이 과정에서 데이터구조와 처리의 중요성을 알았고 익숙해짐

mysql
+ 테이블 관계가 복잡하고 많다보니, JOIN, sub-query 사용에 익숙해짐
+ ORDER BY, LIMIT 사용
