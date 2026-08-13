# AI 협업 기록

## [setup] 프로젝트 환경 설정

### 프롬프트 1

React 채용 파이프라인 보드 구현을 위한 환경 설정

기술:
- React
- Vite
- TypeScript
- TanStack Query
- CSS Modules
- Vitest
- React Testing Library
- npm

요구사항:
1. 개발 서버, 빌드, lint, 테스트용 npm 스크립트 구성
2. TanStack Query Provider를 애플리케이션 진입점에 연결
3. 테스트 실행에 필요한 기본 설정 추가
4. 기능별 구현에 적합한 최소 폴더 구조 구성

기능 순서(참고용)
setup
→ mock-api
→ board-layout
→ card-list
→ stage-move
→ optimistic-update
→ search-filter
→ detail-panel
→ loading-error-empty
→ a11y-keyboard
→ optimistic-update-test
→ concurrency
→ documentation

### AI 출력 요지

- Vite와 TypeScript 설정 및 개발·빌드·lint·테스트 스크립트를 구성했다.
- 애플리케이션 진입점에 독립된 TanStack Query Provider를 연결했다.
- jsdom 기반 Vitest와 React Testing Library 설정 및 기본 렌더링 테스트를 추가했다.
- Provider, 전역 스타일, 테스트 설정만 분리한 최소 폴더 구조를 구성했다.

### 리뷰 / 검증

- 1차 출력 그대로 채택.

## [mock-api] 지원자 조회 및 단계 저장 API

### 프롬프트 1

지원자 mock API 구현

요구사항:
1. 지원자 타입과 250명의 시드 데이터 구성
2. 지원자 목록 조회와 단계 변경 API 구현
3. 요청에 200~800ms 네트워크 지연 적용
4. 단계 변경 요청에 약 15% 실패 적용
5. 성공한 변경 사항을 localStorage에 저장
6. UI가 저장소에 직접 접근하지 않도록 API 계층 분리

이번 작업에서는 보드 UI와 낙관적 업데이트를 제외한다.

### AI 출력 요지

- 지원자와 채용 단계 타입 및 250명의 시드 데이터를 구성했다.
- 네트워크 지연과 단계 변경 실패를 적용한 조회·수정 API를 구현했다.
- 변경 결과를 localStorage에 저장하고 저장 데이터 검증 로직을 추가했다.
- 조회, 저장, 실패 상황을 검증하는 테스트를 추가했다.

### 리뷰 / 검증

- npm run test:run 테스트 후 1차 출력 그대로 채택.
