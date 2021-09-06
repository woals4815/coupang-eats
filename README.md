# 쿠팡 이츠 서버 클론 프로젝트

## Tech used
<p>
 <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
 <img src="https://img.shields.io/badge/Javascript-ffb13b?style=flat-square&logo=javascript&logoColor=white"/>
 <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
 <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
 <img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white"/>
 <img src="https://img.shields.io/badge/Kakao-FFCD00?style=flat-square&logo=Kakao&logoColor=white"/>
 <img src="https://img.shields.io/badge/Google-4285F4?style=flat-square&logo=Google&logoColor=white"/>
</p>


## 도메인
- 식당
- 유저
- 리뷰
- 주문
- 위치
    - 식당 위치
    - 유저 위치
- 찜
- 카트
    - 메인 메뉴 카트
    - 옵션 카트
- 카테고리
    - 식당 카테고리
    - 메뉴 카테고리 
    - 옵션 카테고리
 
 ## 프로젝트 특징
1. 3layer architecture
    - 컨트롤러 / 프로바이더or서비스 / DAO 로 나누어 3계층 레이어 구조로 프로젝트를 진행
2. 소셜 로그인(카카오, 구글)를 이용해서 회원가입 및 로그인 프로세스 단축
3. 네이버 SENSE API를 이용해서 SMS 인증 기능 구축
4. 디비 스키마 내에 각 테이블들을 기준으로 도메인 기반 프로젝트 설계
5. AWS EC2를 이용해서 서버 구축, S3를 이용해 이미지 파일 업로드, RDS를 이용해서 데이터베이스 서버 분리 구축 및 EC2와 연결

- CI/CD 실험 9차 모듈 삭제

