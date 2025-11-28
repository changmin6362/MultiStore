# MultiStore (멀티 스토어 이커머스)
***
프로젝트의 목적 및 목표, 그리고 개발 의도

참여 인원 및 개발 기간
***
문제 해결과 사고 과정

<details>
  <summary>✅ DDD 기반 코드 구조 재정비</summary>
    개발 초기에는 도메인 주도 설계(DDD)에 익숙하지 않아 Repository, Service, Controller 구조를 기능 중심으로만 관리함.
    이후 프로젝트를 진행하면서, Repository는 도메인 단위로 관리하고 Controller와 Service는 기능 단위로 관리해야 한다는 필요성을 깨닫게 되어 리팩토링을 진행하게 되었음.
    DDD 기반으로 코드 구조를 리팩토링 하는 과정은 힘들었지만, 리팩토링을 수행하고 나니 코드의 구조가 명확해지고 확장성이 높아져서 이후의 개발 속도에 많은 도움을 주었음.
</details>

***
시연 영상 보기
***
## 프로젝트 아키텍처
Storybook 링크(공통 컴포넌트 및 페이지)

기술 문서 링크

API Swagger 링크

### 시스템 통신 및 인증 구조
- **통신 방식:** : REST API
- **프록시** : Next.js의 API Routes
- **인증** : JWT 기반의 Access Token, Refresh Token 사용
    - **토큰 관리** : Next.js의 Header를 사용해서 HttpOnly 쿠키로 관리
    - **토큰 갱신:** 액세스 토큰 만료 시, 리프레시 토큰을 사용하여 자동으로 갱신
- **인가** : 미정

### 핵심 도메인 로직
- **재고 관리 시스템 (동시성 제어)** :
    - 여러 사용자가 동시에 동일한 상품을 주문할 경우 발생하는 **재고 차감 동시성 문제**를 해결했습니다.
    - **MySQL 트랜잭션**과 **비관적 락(Pessimistic Lock)** 또는 **Redis 기반 분산 락(Distributed Lock)**을 활용하여 재고 데이터의 정합성을 보장합니다.
    - 이를 통해 재고 수량 초과 주문, 이중 결제 등의 치명적인 비즈니스 오류를 방지합니다.

- **주문 및 결제 처리 플로우** :
    - **주문 상태 관리:** 상품 준비 -> 배송 중 -> 배송 완료 등 주문의 라이프사이클을 관리하는 FSM(상태 머신) 구조를 설계했습니다.
    - **결제 연동 (예정):** PG사(결제대행사) API 연동을 위한 모듈을 설계 중입니다.

- **멀티스토어 입점 및 관리** :
    - 판매자(Seller)와 구매자(Buyer)의 역할을 구분하여 권한 관리 시스템(Role-Based Access Control)을 구축했습니다.
    - 각 판매자별 상품 등록 및 관리 페이지를 제공합니다.

### 추가 구현 예정
- OAuth2.0
- PG 연동
- 테스트 코드 작성
- 데이터 크롤링 및 분석 시스템
- 상품 추천 엔진
***
## Stack

### Frontend
- **Language** : JavaScript, TypeScript
- **Framework** : React, Next.js
- **Library** : Storybook, Tailwind CSS
- **Deployment** : 미정. 아마 Vercel

### Backend
- **Language** : Java
- **Framework** : Spring Boot
- **Library** : JdbcTemplate, lombok
- **Deployment** : 미정. 아마 AWS(EC2, RES)

***
## Git Flow 전략
- **main** : 운영 환경 코드
- **feat** : 기능 구현 코드
- **chore** : 기능 구현을 위한 초기 설정 & 라이브러리 추가를 위한 초기 설정
- **(frontend)** : 프론트엔드 코드
- **(backend)** : 백엔드 코드 & 백엔드와의 연결을 위한 프론트엔드의 api 코드


## 개발 진행 상황
- [x] 스토리북을 사용해서 공통 컴포넌트 구현
- [x] Mock Data를 사용하여 프론트엔드 페이지 구현
- [x] RESTful API를 통한 통신 기능 구현
- [x] MySQL 스키마 설계 및 DB 연결
- [x] JWT 토큰을 활용한 로그인, 회원가입 기능 구현
- [x] RBAC 기능 및 관리자 페이지 기능 구현
- [ ] OAuth2.0 연동
- [ ] 메인 페이지 기능 구현
- [ ] 마이 페이지 기능 구현
- [ ] 주소 관리 페이지 기능 구현
- [ ] 결제 수단 관리 페이지 기능 구현
- [ ] 스토어 페이지 기능 구현
- [ ] 상품 상세 페이지 기능 구현
- [ ] 검색 페이지 기능 구현
- [ ] 장바구니 페이지 기능 구현
- [ ] 주문 페이지 기능 구현 및 PG사 연동
- [ ] DDD 적용 및 Domain Service / Application Service 구조 리팩토링
- [ ] MSA로 분리 및 배포

## 기능 개발 후 수행해야 할 일
- [ ] API Swagger 작성
- [ ] CSRF, SQL Injection, XSS 대응
