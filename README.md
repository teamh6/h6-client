## 시계 거래 앱

### 로컬에서 실행 하기
1. `env/.env.local` 파일 생성 합니다.
2. `.env` 파일을 참조하여 필요한 환경 변수를 설정합니다. 
   * REACT_APP_BASE_URL: api 서버 도메인
3. `npm run start`로 실행
   * `env-cmd`를 이용해서 `env/.env.local` 파일을 환경 변수로 사용해서 실행 됨

### 운영 환경에 배포하기
1. `npm run build:production` 실행
   * `env-cmd`를 이용해서 `env/.env` 파일을 환경 변수로 사용해서 빌드 됨
