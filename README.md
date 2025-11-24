# MultiStore (멀티 스토어 이커머스)
***
프로젝트의 목적 및 목표, 그리고 개발 의도

참여 인원 및 개발 기간
***
문제 해결 방식 및 개선 예시(구체적인 기술을 사용해서 어떤 요소가 얼마나 나아졌는지 구체적으로 작성)

- **문제 상황:** 일반적인 DB 트랜잭션만으로는 대규모 트래픽 발생 시 재고 데이터 불일치(Race Condition) 문제가 발생할 수 있습니다.
- **해결 기술:** **Redis 분산 락(Distributed Lock)**을 도입했습니다.
- **개선 효과:** 동시 주문 시에도 재고의 정합성을 100% 보장하며, 초당 처리 가능한 주문 건수(Throughput)가 X% 개선되었습니다. (실제 측정값 입력)
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
- **Library** : JDBCTemplate
- **Deployment** : 미정. 아마 AWS(EC2, RES)

***
## Git Flow 전략
- **main** : 운영 환경 코드
- **feat** : 기능 구현 코드
- **chore** : 기능 구현을 위한 초기 설정 & 라이브러리 추가를 위한 초기 설정
- **(frontend)** : 프론트엔드 코드
- **(backend)** : 백엔드 코드 & 백엔드와의 연결을 위한 프론트엔드의 api 코드 
