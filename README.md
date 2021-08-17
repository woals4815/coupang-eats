# 쿠팡 이츠 프로젝트


## 클라이언트 개발 담당: 
## 1주차 과제
* ERD 설계
- Link: https://aquerytool.com/aquerymain/index/?rurl=02d2f3ff-cd71-4040-8622-99bc0c89158e
- password: 8518bg

* User
    - user join[X]
        - local login 
    - user login[X]
        - jwt token 반환[X]
    - user profile[X]
        - jwt middleware[X]
            - 요청 객체에 userId를 넣어서 userId로 유저 조회 함[X]
        - token verify[X]
* Category
    - food
    - menu
        - 전체 식당 전체 메뉴 카테고리 조회
        - 특정 식당 전체 메뉴 카테고리 조회
        - 메뉴 카테고리 생성
    - info
    - option


* Restaurant
    - get restaurants
        - 전체 조회[X]
        - id로 특정 식당 조회[X]
        - 생성[X]
    - Post restaurant
* Menu
    - 전체 식당 전체 메뉴 조회
    - 특정 식당 전체 메뉴 리스트 조회
    - 특정 식당 특정 카테고리별 메뉴 리스트 조회
    - 특정 식당 특정 카테고리 메뉴 상세 조회
* Cart
* Order
* Favoriete
* Review

* Location
    - restaurant location
        - id로 특정 식당 위치 조회[X]
        - 전체 식당 위치 조회[X]
        - 식당 위치 생성[X]
    - user location
        - 전체 유저 위치 조회[X]
        - id로 특정 유저 위치 조회[X]
        - 식당 위치 생성[X]

* Response
    - Add base response[X]
    - Add response handler
        - success handler[X]
        - error handler[X]

* devops
    - EC2 server에 git clone


### 개발 일지
15일: 하,,, 도메인에 api를 연결하려는데 안돼서 지금까지 시간을 버렸다. 내일은 무조건 만든다 
16일: 유저 인식을 위한 jwt middleware를 만들고 가게 위치, 가게 조회, 가게 도메인을 위주로 전체적인 플로우 구성 
17일: 메뉴 카테고리와 식당 메뉴의 url 구분이 좀 힘들다. 일단 /menus와 /categories/menus로 나눴다. 일단 메뉴 카테고리 더미 데이터를 넣고 그다음 메뉴 더미 데이터를 넣어서 클라이언트한테 최대한 편한 출력물을 만들어야겠다


## 이슈
- dev 서브 도메인에 웹 앱 서버 구동 하려 하니까 ssl이 잘 안 돼서 ssl를 재갱신 받았다. 그랬더니 계속 리디렉션을 너무 많이 했다. 그리고 이름이 중복되는 dev.vicion.shop을 주석 처리 해줘서 들어가는 건 처리했다. 근데 계속 프록시가 404로 리디렉트 하길래 try files를 주석처리 했다. 그래서 서버가 잘 구동하고 데이터 출력을 잘 하더라.
근데 npm run pm2 로 구동하면 메인 도메인, 서브 도메인 둘 다 기능을 하는데 이건 한나한테 물어봐야겠다. -16일 개발 이슈-

## 2주차 과제

## 추가 사항