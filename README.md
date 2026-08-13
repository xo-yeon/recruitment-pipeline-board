# 채용 파이프라인 보드

지원자 1,000명의 채용 진행 상태를 단계별 컬럼에서 조회하고 관리하는 React 애플리케이션입니다. 단계 이동, 검색·필터, 상세 보기와 함께 낙관적 업데이트, 실패 롤백, 경쟁 상태 처리, Undo와 가상 스크롤을 구현했습니다.

## 배포 링크

[Vercel에서 실행하기](https://recruitment-pipeline-board-6ar0v1vgo-pure-arch.vercel.app/)

## 기술 스택

- React 19
- Vite 6
- TypeScript
- TanStack Query
- CSS Modules
- Vitest
- React Testing Library
- npm

## 설치 및 실행

```bash
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시된 로컬 주소로 접속합니다.

## 주요 기능

- 서류 검토, 면접, 처우 협의, 최종 합격, 불합격의 5개 채용 단계
- 지원자 카드와 단계별 인원 표시
- 액션 버튼을 사용한 지원자 단계 이동과 새로고침 후 상태 유지
- API 응답 전 UI 선반영과 실패 시 이전 상태 롤백 및 오류 안내
- 이름 검색과 직무 필터 및 결과 인원 표시
- 지원자 상세 사이드 패널
- 로딩, 조회 오류, 전체 데이터 없음, 검색 결과 없음 상태
- 키보드 단계 이동과 상세 패널 포커스 관리
- 동일 지원자 연속 이동 요청의 경쟁 상태 방지
- 최근 성공한 단계 이동 1건 Undo
- 지원자 1,000건과 컬럼별 가상 스크롤
- 작은 화면에서 카드 너비를 유지하는 보드 가로 스크롤

## Mock API 구현 방식

`src/api/applicants.ts`에 Promise 기반 mock API를 직접 구현했습니다.

- 지원자 1,000명의 결정적 시드 데이터 사용
- 조회와 단계 변경에 200~800ms 네트워크 지연 적용
- 단계 변경 요청에 약 15% 실패 확률 적용
- 성공한 변경 결과를 localStorage에 저장
- UI가 localStorage에 직접 접근하지 않도록 API 계층 분리

개발 환경에서 조회 오류 화면을 확인하려면 주소에 `?mock=error`를 추가합니다.

```text
http://localhost:5173/?mock=error
```

에러 화면에서 `다시 시도`를 누르면 해당 쿼리가 제거되고 지원자 목록을 다시 조회합니다. 이 재현 옵션은 개발 환경에서만 동작합니다.

## 검증 명령

```bash
npm run test:run
npm run lint
npm run build
```

- `npm run test:run`: 전체 자동 테스트 실행
- `npm run lint`: ESLint 검사
- `npm run build`: TypeScript 검사와 프로덕션 빌드

## 완료 범위

미완성 기능은 없습니다. 필수 요구사항과 선택한 도전 요구사항인 경쟁 상태 처리, 1,000건 가상 스크롤, Undo, 핵심 테스트와 키보드 접근성을 모두 구현했습니다.
