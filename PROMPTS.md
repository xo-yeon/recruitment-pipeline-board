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

## [board-layout] 채용 단계별 보드 레이아웃

### 프롬프트 1

채용 단계별 보드 레이아웃 구현

요구사항:
1. 서류 검토, 면접, 처우 협의, 최종 합격, 불합격 컬럼 구성
2. 각 컬럼에 단계명, 설명, 지원자 수 영역 표시
3. 작은 화면에서도 사용할 수 있는 가로 스크롤 보드 구성
4. 단계 정보를 상수로 분리해 재사용 가능하게 구성

이번 작업에서는 지원자 카드와 mock API 연결을 제외한다.

### AI 출력 요지

- 채용 단계 정보를 재사용 가능한 상수로 분리했다.
- 보드와 컬럼 컴포넌트를 구성하고 5개 단계를 표시했다.
- 좁은 화면에서는 컬럼을 가로 스크롤할 수 있도록 구성했다.

### 리뷰 / 검증

- 테스트를 실행해 5개 채용 단계가 모두 표시되는 것을 확인했다.

### 프롬프트 2

디자인은 DESIGN.md를 참고해서 구현

### AI 출력 요지

- 흰 캔버스, 단일 파란색 강조, pill 형태, 24px 카드 반경을 반영했다.

### 리뷰 / 검증

- 문제: 디자인 스타일을 추가하고 싶음
- 판단: Coinbase 기반 `DESIGN.md` 파일 추가
- 수정: 기존 CSS 색상과 여백을 `DESIGN.md` 기준으로 변경
