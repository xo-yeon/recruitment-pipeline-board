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
