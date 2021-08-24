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
18일: 아무것도 못했다. 오늘 다른 일 때문에 너무 바빴다. 내일은 메인 뷰 전부를 구현할 수 있도록 더미 데이터를 넣고 테스트 할 수 있도록 api 구축할 것이다.
19일: 드디어 이제 이 과제에 집중할 수 있게 됐다. 오늘은 옵션의 카테고리 생성, 특정 식당 옵션 카테고리 특정 메뉴 카테고리 전체 조회, 메뉴 담은 카트 생성 API, 특정 메뉴 특정 카테고리 옵션 조회, 옵션 카트 생성을 구축했다. 여기서 고민인게 옵션 추가를 해서 카트에 담기(카트 생성), 이걸 어떻게 옵션이 있는 지 없는 지를 구분해서 하나의 트랜잭션에 넣을 수 있을 지 고민을 했다. 

20일: 
1. 기획서의 변동사항
    - 개발 순서가 좀 달라졌음. 쿠팡 이츠는 유저가 create 하는 데이터가 많이 없기 때문에 거의 다 서비스 제공자 측에서 미리미리 데이터를 만들어놔야 함. 그래서 식당 도메인을 기준으로 메뉴, 메뉴 옵션, 각각의 카테고리 등을 백오피스에서 생성할 수 있도록 api를 먼저 생성한 다음, 유저가 카트에 담을 수 있는 상호작용 api를 구축했음
2. ERD 진행상황, 몇퍼센트 완료되었는지
    - 몇 개 칼럼 추가했음. 현재 ERD로 프로젝트를 진행해도 무방하다고 판단함
3. api 리스트업 진행상황
    - 현재 약 30개 정도 리스트 업 해놓은 상황. 다만 백오피스용, 유저용을 구분해서 하다 보니 클라측에서 필요한 데이터가 무엇무엇인지 더 추가적으로 파악해서 api를 구축하고 더미 데이터를 생성해야 하는 상태
4. 현재 어떤 기능(api)를 구현중에 있는지
    - 메인 화면 가게 리스트 조회 정렬 기능 추가[O]
    - 식당 리스트 조회 리뷰 개수, 평균 평점 추가
5. 더미데이터 진행 상황
    - 식당: 엽기 떡볶이(광흥창점)
    - 메뉴 카테고리: 엽기 메뉴
    - 메뉴: 엽기떡볶이
    - 메뉴 옵션 카테고리: 매운맛 선택, 엽기메뉴 토핑 추가선택 1 (최대 1개 가능), 엽기메뉴 토핑 추가선택 2 (최대 1개 가능), 엽기메뉴 토핑 추가선택 3 (최대 1개 가능), 엽기메뉴 떡/오뎅사리 추가선택 (최대 1개 가능)
    - 메뉴 옵션: 착한맛, 덜매운맛, 매운맛, 중국당면 추가, 치즈 추가, 당면 추가, 햄 7개 추가, 우동사리 추가, 베이컨 추가, 계란 2개 추가, 퐁당치즈만두 등등 
6. 클라이언트 개발자 or 서버 개발자와의 회의에 따른 회의록
7. 개발팀장님의 피드백(1차, 2차)
    - 1차: 개발일지 제대로 쓰라고 함. 딱히 다른 건 지적 없었음
8. 개발 도중에 발생하는 이슈: 없음

22일 개발일지
1. 기획서의 변동사항
    - 없음
2. ERD 진행상황, 몇퍼센트 완료되었는지
    - 없음. 그 전 ERD 그대로 진행하는 중
3. api 리스트업 진행상황
    - 현재 37개 정도 리스트업 해놨음. 그 중 31개는 이미 구축 해 둔 상태. 다만 상세한 명세서는 작성하지 않아서 추가해야 함.
4. 현재 어떤 기능(api)를 구현중에 있는지
    - 카트에 담고 주문한 뒤 주문 완료 되고 배달 완료 및 과거 주문 내역 확인까지의 프로세스 전체 api를 구축 중.
    - 특정 식당 찜하기 및 찜 한 가게 리스트 api 구축
5. 더미데이터 진행 상황
    - 식당: 엽기 떡볶이(광흥창점), 매일공기 연남점, 바른치킨 서강대점, 미스터카츠 이대점
    - 메뉴 카테고리: 엽기 메뉴
    - 메뉴: 엽기떡볶이
    - 메뉴 옵션 카테고리: 매운맛 선택, 엽기메뉴 토핑 추가선택 1 (최대 1개 가능), 엽기메뉴 토핑 추가선택 2 (최대 1개 가능), 엽기메뉴 토핑 추가선택 3 (최대 1개 가능), 엽기메뉴 떡/오뎅사리 추가선택 (최대 1개 가능)
    - 메뉴 옵션: 착한맛, 덜매운맛, 매운맛, 중국당면 추가, 치즈 추가, 당면 추가, 햄 7개 추가, 우동사리 추가, 베이컨 추가, 계란 2개 추가, 
    퐁당치즈만두 등등 
    - 이미지: 엽떡 식당 사진 추가, 카테고리 사진들 추가.
    - 찜: 엽떡 찜 추가
6. 클라이언트 개발자 or 서버 개발자와의 회의에 따른 회의록
7. 개발팀장님의 피드백(1차, 2차)
    - 1차: 개발일지 제대로 쓰라고 함. 딱히 다른 건 지적 없었음
8. 개발 도중에 발생하는 이슈: 없음

23일 개발일지
1. 기획서의 변동사항
    - 없음
2. ERD 진행상황, 몇퍼센트 완료되었는지
    - 메뉴 테이블 내에 description 칼럼 추가. not null로 해서 description이 없는 메뉴들은 공란으로 넣어서 데이터 삽입
3. api 리스트업 진행상황
    - 현재 39개 정도 리스트업 해놨음. 그 중 34개는 이미 구축 해 둔 상태. 다만 상세한 명세서는 작성하지 않아서 추가해야 함.
4. 현재 어떤 기능(api)를 구현중에 있는지
    - 메뉴 이미지 업로드 api 구축중
    - 유저 쿠폰 api 필요
    - 유저 결제 방식 api 필요
    - 포토 리뷰 api 필요
5. 더미데이터 진행 상황
    - 식당: 엽기 떡볶이(광흥창점), 매일공기 연남점, 바른치킨 서강대점, 미스터카츠 이대점
    - 메뉴 카테고리: 각 식당 메뉴 카테고리 전체(사이드메뉴, 음료 카테고리 제외)
    - 메뉴: 엽기떡볶이
    - 메뉴 옵션 카테고리: 매운맛 선택, 엽기메뉴 토핑 추가선택 1 (최대 1개 가능), 엽기메뉴 토핑 추가선택 2 (최대 1개 가능), 엽기메뉴 토핑 추가선택 3 (최대 1개 가능), 엽기메뉴 떡/오뎅사리 추가선택 (최대 1개 가능), 
    - 메뉴 옵션: 착한맛, 덜매운맛, 매운맛, 중국당면 추가, 치즈 추가, 당면 추가, 햄 7개 추가, 우동사리 추가, 베이컨 추가, 계란 2개 추가, 
    퐁당치즈만두 등등 
    - 이미지: 엽떡 식당 사진 추가, 카테고리 사진들 추가.
    - 찜: 엽떡 찜 추가
    - 특정 유저 위치 추가
6. 클라이언트 개발자 or 서버 개발자와의 회의에 따른 회의록
7. 개발팀장님의 피드백(1차, 2차)
    - 1차: 개발일지 제대로 쓰라고 함. 딱히 다른 건 지적 없었음
8. 개발 도중에 발생하는 이슈: 없음

24일 개발일지
1. 기획서의 변동사항
    - 없음
2. ERD 진행상황, 몇퍼센트 완료되었는지
    - UserLocaitons 테이블 위도 경도 칼럼 삭제 후, location, locationDetail 추가 
3. api 리스트업 진행상황
    - 현재 39개 정도 리스트업 해놨음. 그 중 36개는 이미 구축 해 둔 상태. 다만 상세한 명세서는 작성하지 않아서 추가해야 함.
4. 현재 어떤 기능(api)를 구현중에 있는지
    - 메뉴 이미지 업로드 api 구축중
    - 유저 쿠폰 api 필요
    - 유저 결제 방식 api 필요
    - 포토 리뷰 api 필요
5. 더미데이터 진행 상황
    - 식당: 엽기 떡볶이(광흥창점), 매일공기 연남점, 바른치킨 서강대점, 미스터카츠 이대점
    - 메뉴 카테고리: 각 식당 메뉴 카테고리 전체(사이드메뉴, 음료 카테고리 제외)
    - 메뉴: 엽기떡볶이
    - 메뉴 옵션 카테고리: 매운맛 선택, 엽기메뉴 토핑 추가선택 1 (최대 1개 가능), 엽기메뉴 토핑 추가선택 2 (최대 1개 가능), 엽기메뉴 토핑 추가선택 3 (최대 1개 가능), 엽기메뉴 떡/오뎅사리 추가선택 (최대 1개 가능), 
    - 메뉴 옵션: 착한맛, 덜매운맛, 매운맛, 중국당면 추가, 치즈 추가, 당면 추가, 햄 7개 추가, 우동사리 추가, 베이컨 추가, 계란 2개 추가, 
    퐁당치즈만두 등등 
    - 이미지: 엽떡 식당 사진 추가, 카테고리 사진들 추가.
    - 찜: 엽떡 찜 추가
    - 특정 유저 위치 추가
6. 클라이언트 개발자 or 서버 개발자와의 회의에 따른 회의록
7. 개발팀장님의 피드백(1차, 2차)
    - 1차: 개발일지 제대로 쓰라고 함. 딱히 다른 건 지적 없었음
8. 개발 도중에 발생하는 이슈: 없음

## 이슈
- dev 서브 도메인에 웹 앱 서버 구동 하려 하니까 ssl이 잘 안 돼서 ssl를 재갱신 받았다. 그랬더니 계속 리디렉션을 너무 많이 했다. 그리고 이름이 중복되는 dev.vicion.shop을 주석 처리 해줘서 들어가는 건 처리했다. 근데 계속 프록시가 404로 리디렉트 하길래 try files를 주석처리 했다. 그래서 서버가 잘 구동하고 데이터 출력을 잘 하더라.
근데 npm run pm2 로 구동하면 메인 도메인, 서브 도메인 둘 다 기능을 하는데 이건 한나한테 물어봐야겠다. -16일 개발 이슈-

## 2주차 과제

## 추가 사항