## 개요 (Overview)

Coinbase는 암호화폐를 거래하는 제도권 금융 브랜드처럼 보입니다. 마케팅 화면은 차분하고, 여백이 있으며(editorial-spaced), 거의 단색에 가깝습니다. 브랜드의 유일한 강조 색상은 **Coinbase Blue** (`{colors.primary}` — #0052ff)로, 아주 절제하여 사용됩니다. 모든 기본 CTA 필(pill) 버튼, 브랜드 워드마크, 본문 내 강조 링크에만 사용됩니다. 이 파란색 외에, 시스템은 흰색 캔버스, 먹색(ink) 텍스트, 부드러운 회색의 높이 단(elevation bands), 그리고 전체 화면(full-bleed) 제품 목업 히어로 영역을 위한 깊고 검은색에 가까운 에디토리얼 캔버스 (`{colors.surface-dark}` — #0a0b0d)로 구성됩니다.

글꼴 쌍(Type pairs)은 히어로 헤드라인을 위한 **CoinbaseDisplay**와 본문, 캡션, 네비게이션을 위한 **CoinbaseSans**를 사용합니다. Display 글꼴은 일반적인 거래 플랫폼처럼 700+ 굵기가 아닌 **400 굵기(weight 400)**로 지정됩니다. 이러한 선택은 핀테크의 긴박함보다는 에디토리얼의 차분함과 제도권의 신뢰감을 나타냅니다.

페이지 흐름(rhythm)은 세 가지 모드로 순환합니다: 밝은 흰색 에디토리얼 섹션, 부드러운 회색 높이 단, 그리고 여러 레이어의 제품 UI 목업 카드가 떠 있는 **전체 화면 어두운 에디토리얼 히어로 영역**입니다. 대시보드 목업이 떠 있는 어두운 히어로 영역은 브랜드를 가장 잘 나타내는 독특한 컴포넌트입니다.

**핵심 특징:**
- 단일 강조 색상: `{colors.primary}` (#0052ff Coinbase Blue)는 모든 기본 CTA, 워드마크, 본문 내 브랜드 링크에 사용됩니다. 극히 절제되어 사용됩니다.
- 차분한 디스플레이 굵기: CoinbaseDisplay는 항상 400 굵기이며, 절대 700+를 사용하지 않습니다.
- 에디토리얼 필(pill) 기하학: 모든 CTA는 `{rounded.pill}` (100px), 모든 자산 글리프는 `{rounded.full}`, 모든 카드는 `{rounded.xl}` (24px)입니다. 날카로운 모서리는 없습니다.
- 플로팅 제품 UI 카드가 포함된 전체 화면 어두운 히어로 영역: `{component.hero-band-dark}`와 인라인 `{component.product-ui-card-dark}` 목업은 브랜드의 가장 강력한 시그니처 패턴입니다.
- 거래 의미론(Trading semantics): `{colors.semantic-up}` (#05b169) 및 `{colors.semantic-down}` (#cf202f) — 텍스트 색상에만 적용되며, 배경 채우기에는 절대 사용되지 않습니다.
- 96px 섹션 리듬: 넉넉한 에디토리얼 간격.

## 색상 (Colors)

### 브랜드 및 강조 색상 (Brand & Accent)
- **Coinbase Blue** (`{colors.primary}` — #0052ff): 단일 브랜드 색상. 모든 기본 CTA 필 버튼, Coinbase 워드마크, 본문 내 브랜드 링크.
- **Coinbase Blue Active** (`{colors.primary-active}` — #003ecc): 기본 필 버튼을 눌렀을 때(press-state) 어두워지는 색상.
- **Coinbase Blue Disabled** (`{colors.primary-disabled}` — #a8b8cc): 비활성화된 CTA를 위한 흐려진 파란색 틴트.
- **Accent Yellow** (`{colors.accent-yellow}` — #f4b000): 피처 카드 내부의 비트코인/자산 글리프 채우기에 매우 제한적으로 사용되는 소규모 서브 브랜드 강조 색상. 시각적 표현용으로만 사용되며, 액션 색상이 아닙니다.

### 표면 (Surface)
- **Canvas** (`{colors.canvas}` — #ffffff): 기본 페이지 배경.
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7): 미세하게 번갈아 나타나는 배경 영역용 표면.
- **Surface Strong** (`{colors.surface-strong}` — #eef0f3): 보조 버튼, 검색 필 버튼, 자산 아이콘 플레이트의 연한 회색 배경.
- **Surface Dark** (`{colors.surface-dark}` — #0a0b0d): 전체 화면 어두운 히어로 영역, CTA 영역을 위한 깊고 어두운 검은색 배경. `{colors.ink}`와 동일한 16진수 값을 공유합니다.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — #16181c): 한 단계 더 밝은 색상으로, 어두운 히어로 영역 내부에서 떠 있는 제품 UI 목업 카드에 사용됩니다.

### 실선 (Hairlines)
- **Hairline** (`{colors.hairline}` — #dee1e6): 흰색 표면의 기본 1px 구분선.
- **Hairline Soft** (`{colors.hairline-soft}` — #eef0f3): 더 밝은 구분선으로, `{colors.surface-strong}`과 동일한 색상 값을 가집니다.

### 텍스트 (Text)
- **Ink** (`{colors.ink}` — #0a0b0d): 디스플레이 헤드라인, 기본 네비게이션, 본문 강조.
- **Body** (`{colors.body}` — #5b616e): 기본 본문 텍스트 — 약간 차가운 회색.
- **Body Strong** (`{colors.body-strong}` — #0a0b0d): Ink와 동일하며, 더 강한 강조에 사용됩니다.
- **Muted** (`{colors.muted}` — #7c828a): 부제목, 브레드크럼, 푸터 보조 텍스트.
- **Muted Soft** (`{colors.muted-soft}` — #a8acb3): 비활성화된 링크 텍스트.
- **On Primary** (`{colors.on-primary}` — #ffffff): Coinbase Blue CTA 위의 흰색 텍스트.
- **On Dark** (`{colors.on-dark}` — #ffffff): 어두운 히어로 영역 위의 흰색 텍스트.
- **On Dark Soft** (`{colors.on-dark-soft}` — #a8acb3): 어두운 영역에서 보조 텍스트를 위한 흐린 오프화이트 색상.

### 거래 의미론 (Trading Semantics)
- **Semantic Up** (`{colors.semantic-up}` — #05b169): 가격 상승 초록색, 텍스트 색상에만 사용됩니다.
- **Semantic Down** (`{colors.semantic-down}` — #cf202f): 가격 하락 빨간색, 텍스트 색상에만 사용됩니다.

## 타이포그래피 (Typography)

### 폰트 패밀리 (Font Family)
이 시스템은 **CoinbaseDisplay**(디스플레이 헤드라인), **CoinbaseSans**(본문, 네비게이션, 캡션, 버튼), **CoinbaseIcons**(아이콘 폰트) 및 표 형식의 숫자 데이터를 위한 **CoinbaseMono**를 사용합니다. 대체 폰트(Fallback): `-apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

디스플레이와 본문의 구별은 기능적입니다: CoinbaseDisplay는 히어로 헤드라인에만 적용되고, CoinbaseSans는 다른 모든 영역에 적용됩니다.

### 계층 구조 (Hierarchy)

| 토큰 | 크기 | 굵기 | 줄 높이 | 자간 | 사용처 |
|---|---|---|---|---|---|
| `{typography.display-mega}` | 80px | 400 | 1.0 | -2px | 홈페이지 히어로 h1 |
| `{typography.display-xl}` | 64px | 400 | 1.0 | -1.6px | 서브 히어로 |
| `{typography.display-lg}` | 52px | 400 | 1.0 | -1.3px | 섹션 헤더 |
| `{typography.display-md}` | 44px | 400 | 1.09 | -1px | CTA 영역 헤드라인 |
| `{typography.display-sm}` | 36px | 400 | 1.11 | -0.5px | 서브 섹션 헤더 — CoinbaseSans |
| `{typography.title-lg}` | 32px | 400 | 1.13 | -0.4px | 카드 그룹 제목 |
| `{typography.title-md}` | 18px | 600 | 1.33 | 0 | 컴포넌트 제목, 자산 행 기본 텍스트 |
| `{typography.title-sm}` | 16px | 600 | 1.25 | 0 | 리스트 레이블 |
| `{typography.body-md}` | 16px | 400 | 1.5 | 0 | 기본 본문 |
| `{typography.body-strong}` | 16px | 700 | 1.5 | 0 | 강조된 본문 |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | 푸터 본문 |
| `{typography.caption}` | 13px | 400 | 1.5 | 0 | 이미지 캡션 |
| `{typography.caption-strong}` | 12px | 600 | 1.5 | 0 | 배지 필 레이블 |
| `{typography.number-display}` | 18px | 500 | 1.4 | 0 | 자산 가격, 변동률 — CoinbaseMono |
| `{typography.button}` | 16px | 600 | 1.15 | 0 | 표준 CTA 필 버튼 |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | 상단 네비게이션 메뉴 항목 |

### 원칙 (Principles)
- **디스플레이 굵기는 400으로 유지됩니다.** 가장 뚜렷한 타이포그래피적 선택으로, "긴박한 거래 플랫폼"이 아닌 "차분한 제도권 브랜드"임을 전달합니다.
- **디스플레이에만 음수 자간(letter-spacing) 적용.** 디스플레이는 -1px에서 -2px의 자간을 사용하지만, 본문은 0을 유지합니다.
- **모든 숫자에 CoinbaseMono 적용.** 자산 가격, 변동률 등 표 형식의 수치는 모두 CoinbaseMono로 렌더링합니다.

### 대체 폰트 참고사항 (Note on Font Substitutes)
CoinbaseDisplay, CoinbaseSans 및 CoinbaseMono는 라이선스가 적용된 Coinbase 전용 서체입니다.
- **CoinbaseDisplay → Inter** (weight 400, letter-spacing -1.5%).
- **CoinbaseSans → Inter** (weight 400/600).
- **CoinbaseMono → JetBrains Mono** 또는 **Geist Mono** (weight 500).

## 레이아웃 (Layout)

### 간격 시스템 (Spacing System)
- **기본 단위:** 4px.
- **토큰:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.base}` 16px · `{spacing.md}` 20px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 96px.
- **섹션 패딩:** 모든 주요 에디토리얼 영역에 `{spacing.section}` (96px) 적용.
- **카드 내부 패딩:** 피처 카드 및 제품 UI 목업에 `{spacing.xl}` (32px) 적용.

### 그리드 및 컨테이너 (Grid & Container)
- **최대 콘텐츠 너비:** 중앙 정렬 기준 약 1200px. 히어로 이미지는 전체 화면(full-bleed)으로 구성.
- **에디토리얼 본문:** 단일 12열 그리드.
- **피처 카드 그리드:** 데스크톱 기준 히어로 분할 시 2열, 혜택 그리드는 3열.
- **푸터:** 데스크톱 기준 6열 링크 리스트.

### 여백의 철학 (Whitespace Philosophy)
트레이딩 대시보드보다는 Bloomberg나 Financial Times에 가까운 여백 구성입니다. 섹션 간 간격은 96px이며, 섹션 내부의 카드 간격은 24px입니다. 정보의 밀도는 마케팅 페이지가 아니라 로그인 후 서비스 내부 화면에서 제공됩니다.

## 높이 및 깊이 (Elevation & Depth)

| 단계 | 처리 방식 | 사용처 |
|---|---|---|
| Flat | 그림자 없음, 테두리 없음 | 표면의 80% |
| Hairline 테두리 | 1px `{colors.hairline}` | 흰색 배경 위의 피처 카드 윤곽선 |
| Soft 그림자 | `0 4px 12px rgba(0, 0, 0, 0.04)` | 단일 그림자 단계 — 마우스 호버된 카드 |
| Photographic | 전체 화면 제품 UI 목업 | 히어로 깊이감 |

### 장식적 깊이감 (Decorative Depth)
- **어두운 히어로 내부의 여러 레이어의 제품 UI 카드**는 가장 뚜렷한 장식 패턴입니다. `{component.product-ui-card-dark}`가 더 어두운 기본 배경 위에 떠 있으며, 종종 두 번째 더 작은 카드가 비스듬한 각도로 겹쳐집니다.
- **기하학적인 브랜드 일러스트**는 그림자가 생략된 곳에 일러스트 형태의 깊이감을 제공합니다.

## 도형 (Shapes)

### 모서리 곡률(Border Radius) 스케일

| 토큰 | 값 | 사용처 |
|---|---|---|
| `{rounded.none}` | 0px | 예약됨 (실질적으로 사용되지 않음) |
| `{rounded.xs}` | 4px | 인라인 태그 |
| `{rounded.sm}` | 8px | 컴팩트 행 |
| `{rounded.md}` | 12px | 폼 입력창 |
| `{rounded.lg}` | 16px | 중간 크기 카드 |
| `{rounded.xl}` | 24px | 피처 카드, 제품 UI 목업, 요금제 영역 |
| `{rounded.pill}` | 100px | 모든 CTA 버튼, 검색 필, 배지 |
| `{rounded.full}` | 9999px | 자산 아이콘 원형, 아바타 |

대화형 요소에는 필(pill) 디자인, 컨테이너에는 카드 곡률(24px), 아이콘에는 완전한 원을 적용합니다. 날카로운 모서리는 배제합니다.

## 컴포넌트 (Components)

### 상단 네비게이션 (Top Navigation)

**`top-nav-light`** — 흰색 페이지의 기본 상단 네비게이션. 배경 `{colors.canvas}`, 텍스트 `{colors.ink}`, 높이 64px. 레이아웃: 왼쪽 Coinbase 워드마크, 중앙 기본 가로 메뉴 (Cryptocurrencies / Individuals / Businesses / Institutions / Developers / Company), 오른쪽 검색 아이콘 + 지구본 + Sign In + Sign Up CTA.

**`top-nav-on-dark`** — 어두운 히어로 영역 위의 상단 네비게이션. 배경 `{colors.surface-dark}`, 텍스트 `{colors.on-dark}`. 레이아웃은 동일합니다.

### 버튼 (Buttons)

**`button-primary`** — 대표적인 Coinbase Blue 필(pill) 버튼. 배경 `{colors.primary}`, 텍스트 `{colors.on-primary}`, 서체 `{typography.button}` (16px / 600), 패딩 12px × 20px, 높이 44px, 모서리 `{rounded.pill}` (100px).

**`button-primary-active`** — 버튼을 누른 상태(Press state). 배경 `{colors.primary-active}` (더 어두운 파란색).

**`button-primary-disabled`** — 흐려진 파란색 틴트. 배경 `{colors.primary-disabled}`. 커서 상태 `not-allowed`.

**`button-secondary-light`** — 흰색 표면 위의 부드러운 회색 보조 버튼. 배경 `{colors.surface-strong}`, 텍스트 `{colors.ink}`, 동일한 필 기하학 적용.

**`button-secondary-dark`** — 어두운 히어로 영역에서 사용됨. 배경 `{colors.surface-dark-elevated}`, 텍스트 `{colors.on-dark}`, 동일한 필 기하학 적용.

**`button-outline-on-dark`** — 흰색 테두리가 있는 투명한 필 버튼. 배경 투명, 텍스트 `{colors.on-dark}`, 1px 흰색 테두리.

**`button-tertiary-text`** — 인라인 텍스트 링크. 배경 투명, 텍스트 `{colors.primary}`, 서체 `{typography.button}`.

**`button-pill-cta`** — 홈페이지 히어로 영역에 사용되는 더 큰 필 CTA ("Get started"). 동일한 Coinbase Blue 팔레트를 사용하지만, 더 돋보이도록 높이 56px, 패딩 16px × 32px를 적용합니다.

### 히어로 영역 (Hero Bands)

**`hero-band-dark`** — 브랜드 고유의 전체 화면 어두운 히어로 영역. 배경 `{colors.surface-dark}`, 텍스트 `{colors.on-dark}`, 전체 화면에 걸쳐 여러 레이어로 배치된 제품 UI 목업 카드. 왼쪽 디스플레이 헤드라인은 `{typography.display-mega}` (80px / 400), 부제목은 `{typography.body-md}`, 두 개의 CTA 포함.

**`hero-band-light`** — Wealth 및 Explore 페이지에 사용되는 흰색 캔버스 변형. 배경 `{colors.canvas}`, 텍스트 `{colors.ink}`. 동일한 뼈대와 밝은 색상 팔레트 적용.

### 카드 (Cards)

**`product-ui-card-dark`** — 떠 있는 제품 UI 목업 카드. 배경 `{colors.surface-dark-elevated}`, 텍스트 `{colors.on-dark}`, 모서리 `{rounded.xl}` (24px), 패딩 32px. 주로 2~3개의 카드가 약간 회전된 상태로 겹쳐 배치되어 계층화된 대시보드를 흉내 냅니다.

**`product-ui-card-light`** — Explore 페이지에서 자산 카드에 사용되는 밝은 캔버스 변형. 배경 `{colors.canvas}`, 텍스트 `{colors.ink}`, 동일한 기하학 구조, 1px 실선(hairline) 테두리 적용.

**`feature-card`** — 3열 및 2열 그리드에 사용됨. 배경 `{colors.canvas}`, 텍스트 `{colors.ink}`, 서체 `{typography.title-md}`, 모서리 `{rounded.xl}`, 패딩 32px.

### 거래 표면 (Trading Surfaces)

**`asset-row`** — 자산 목록(Explore, Wealth)의 가로 행. 배경 투명, 1px 실선 구분선. 레이아웃: 왼쪽 32px 원형 자산 아이콘, 자산 이름 + 티커(ticker), `{typography.number-display}` 형식의 가격 열, `{component.price-up-cell}` 또는 `{component.price-down-cell}`이 포함된 24시간 변동률 열.

**`price-up-cell`** + **`price-down-cell`** — 인라인 가격 변동 셀. 배경 채우기 없이 텍스트 색상(초록색 또는 빨간색)만 `{typography.number-display}` 서체로 적용.

**`asset-icon-circular`** — 자산 글리프 뒤의 원형 플레이트. 배경 `{colors.surface-strong}`, 모서리 `{rounded.full}`, 직경 32px.

### 가격 구성 (Pricing)

**`pricing-tier-card`** — 개발자 플랫폼의 표준 가격 티어 카드. 배경 `{colors.canvas}`, 모서리 `{rounded.xl}`, 패딩 32px, 1px 실선 테두리. 레이아웃: 티어 이름 + 가격 + 기능 체크리스트 + CTA 필 버튼.

**`pricing-tier-featured`** — 추천 요금제 카드. 배경 `{colors.surface-dark}`, 텍스트 `{colors.on-dark}`. 동일한 구조를 가지되 어두운 색상 팔레트를 적용하여, 컬러 리본 없이도 "추천 요금제"임을 시각적 반전을 통해 알립니다.

### 폼 요소 (Forms)

**`text-input`** — 표준 텍스트 입력창. 배경 `{colors.canvas}`, 텍스트 `{colors.ink}`, 모서리 `{rounded.md}` (12px), 패딩 14px × 16px, 높이 48px, 1px 실선 테두리. 포커스 시 테두리가 2px 두께의 Coinbase Blue로 굵어집니다.

**`search-input-pill`** — 필(pill) 모양의 검색창. 배경 `{colors.surface-strong}`, 모서리 `{rounded.pill}`, 패딩 12px × 20px, 높이 44px.

### 태그 및 배지 (Tags & Badges)

**`badge-pill`** — 섹션 레이블("INSTITUTIONAL", "REGULATED")로 사용되는 작은 대문자 필 배지. 배경 `{colors.surface-strong}`, 텍스트 `{colors.ink}`, 서체 `{typography.caption-strong}`, 모서리 `{rounded.pill}`.

### CTA / 푸터 (CTA / Footer)

**`cta-band-dark`** — 푸터 상단의 "자산을 직접 관리하세요" 영역. 배경 `{colors.surface-dark}`, 텍스트 `{colors.on-dark}`, 세로 패딩 96px. 중앙 정렬 헤드라인 + 두 개의 CTA.

**`footer-light`** — 하단 흰색 캔버스 푸터. 배경 `{colors.canvas}`, 텍스트 `{colors.body}`. 6열 링크 리스트.

**`footer-link`** — 개별 푸터 링크. 배경 투명, 텍스트 `{colors.body}`.

**`legal-band`** — 푸터 링크 열 아래의 최하단 법적 고지 영역. 모든 텍스트는 `{typography.caption}` 크기의 `{colors.muted}` 색상입니다.

## 권장사항 및 금지사항 (Do's and Don'ts)

### 권장사항 (Do)
- `{colors.primary}` (Coinbase Blue) 색상은 기본 CTA, 워드마크, 브랜드 글리프 일러스트, 본문 내 강조 링크에만 남겨두세요.
- 모든 CTA는 `{rounded.pill}` (100px), 모든 자산 글리프는 `{rounded.full}`로 설정하세요.
- CoinbaseDisplay 헤드라인 굵기는 400으로 유지하세요.
- 어두운 영역과 밝은 영역이 번갈아 나타나는 배치를 페이지 흐름으로 사용하세요.
- 모든 수치는 `{typography.number-display}`를 통해 CoinbaseMono로 렌더링하세요.
- 모든 어두운 히어로 영역에는 레이어 구조의 제품 UI 목업 카드 스택을 매칭하세요.

### 금지사항 (Don't)
- 보조 브랜드 색상을 임의로 추가하지 마세요. Coinbase Blue가 유일한 액션 색상이며, 거래용 초록색/빨간색은 의미론적으로만 사용됩니다.
- 디스플레이 텍스트를 굵게 처리하지 마세요. 디스플레이 폰트는 400 굵기를 유지하며, 굵게 처리하면 브랜드 고유의 분위기가 변합니다.
- 추가적인 그림자 단계를 설계하지 마세요. 시스템에는 오직 하나의 그림자 단계만 존재합니다.
- CTA에 날카로운 모서리인 `{rounded.none}` (0px)를 사용하지 마세요.
- 하나의 헤드라인 안에서 CoinbaseDisplay와 CoinbaseSans를 섞어 쓰지 마세요.
- 거래용 초록색/빨간색을 버튼 배경색으로 사용하지 마세요.
- 서드파티 위젯(쿠키 동의, OneTrust 등)에서 CTA 색상을 추출하지 마세요. 브랜드의 CTA 색상은 실제 제품의 CTA에 나타나는 색상이지, 팝업창 모달의 색상이 아닙니다.

## 반응형 동작 (Responsive Behavior)

### 브레이크포인트 (Breakpoints)

| 이름 | 너비 | 주요 변경 사항 |
|---|---|---|
| Mobile | < 640px | 히어로 h1 80→40px, 피처 카드 그리드 1열 구성, 자산 행이 위아래로 쌓임, 네비게이션이 햄버거 메뉴로 축소됨, 레이어 구성의 제품 UI 카드가 단일 카드로 축소됨. |
| Tablet | 640–1024px | 히어로 h1 64px, 피처 카드 그리드 2열 구성, 자산 행은 가로 구조를 유지하되 너비가 좁아짐. |
| Desktop | 1024–1280px | 전체 히어로 h1 80px, 피처 카드 그리드 3열 구성, 전체 가로형 자산 행 레이아웃 적용. |
| Wide | > 1280px | 콘텐츠 너비는 최대 1200px로 제한되며, 히어로 영역 일러스트/사진은 전체 화면 적용. |

### 터치 대상 크기 (Touch Targets)
- 기본 CTA 필 버튼: 높이 44px — WCAG AAA 표준 만족.
- 더 큰 히어로 필 버튼 (`{component.button-pill-cta}`): 높이 56px — AAA 기준을 크게 상회.
- 자산 아이콘 원형: 지름 32px — 아슬아슬하지만 상하 패딩 8px를 주어 실질적으로 48px의 터치 영역을 보장.
- 검색 필 버튼: 높이 44px — AAA 표준 만족.

### 축소 전략 (Collapsing Strategy)
- 상단 네비게이션은 768px 미만에서 햄버거 메뉴 시트로 전환됩니다. 회원가입(Sign Up) CTA는 노출을 유지합니다.
- 히어로 h1은 화면 크기에 따라 점진적으로 축소됩니다: 80 → 64 → 52 → 44 → 36px.
- 여러 장이 비스듬하게 겹쳐진 레이어 구성의 제품 UI 목업 카드는 모바일에서 가장 위의 단일 카드로 축소되어 겹침을 해제합니다.
- 요금제 카드 그리드: 3열 → 2열 → 1열로 변화합니다.
- 모바일에서 자산 행은 세로로 누적됩니다: 위쪽에 티커(ticker), 아래쪽에 가격 + 변동률이 나란히 위치합니다.

## 작성 가이드 (Iteration Guide)

1. 한 번에 하나의 컴포넌트에 집중하고 YAML 키를 직접 참조하세요.
2. 새로운 CTA는 기본적으로 `{rounded.pill}` (100px), 아이콘 플레이트는 `{rounded.full}`을 사용합니다. 카드는 `{rounded.xl}`을 사용합니다.
3. 변형(variants)은 `components:` 블록 내부에 개별 엔트리로 구현됩니다.
4. 모든 곳에 `{token.refs}` 형식을 사용하고, 16진수(Hex) 코드를 코드 안에 직접 작성하지 마세요.
5. 마우스 호버(Hover) 상태는 명세하지 않으며, 오직 Default와 Active/Pressed 상태만 정의합니다.
6. 디스플레이 폰트는 CoinbaseDisplay 400을 사용하고, 본문은 CoinbaseSans 400/600/700을 사용합니다. 숫자는 모두 CoinbaseMono를 사용합니다.
7. Coinbase Blue는 극히 제한적으로 사용하여, 영역당 한두 번의 시각적 초점만 만듭니다.

## 알려진 한계 및 차이점 (Known Gaps)

- CoinbaseDisplay, CoinbaseSans, CoinbaseMono는 유료 라이선스 서체이므로 본 문서에서는 대체 서체로 Inter 및 JetBrains Mono를 제안합니다.
- 호가창, 차트, 주문 폼 등 실제 거래용 제품 UI 화면은 로그인 후에만 제공되므로, 본 명세는 마케팅 영역만을 다룹니다.
- 애니메이션 타이밍에 대한 정의는 본 명세 범위를 벗어납니다.
- 포커스 상태를 제외한 폼 검증 에러 상태 등은 명세에 반영되지 않았습니다.
- 노란색 강조 색상은 비트코인 자산 글리프 일러스트 내부에만 표시되며, 순수하게 시각 보조 용도로만 분류됩니다.
