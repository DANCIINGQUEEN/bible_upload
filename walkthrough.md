# Bible MongoDB Insertion Walkthrough

성경 텍스트 파일을 파싱하여 MongoDB에 성공적으로 저장했습니다. 한글 인코딩 문제(EUC-KR)를 해결하고 31,077개의 구절을 모두 데이터베이스에 삽입했습니다.

## 작업 내용

1.  **프로젝트 설정**: Node.js 프로젝트 초기화 및 `dotenv`, `mongodb`, `iconv-lite` 라이브러리 설치.
2.  **데이터셋 생생**: `bible/` 폴더의 66개 텍스트 파일을 읽어 JSON 형식으로 변환.
    -   EUC-KR 인코딩 처리로 한글 깨짐 방지.
    -   구약/신약 구분, 권/장/절 정보 추출.
3.  **MongoDB 데이터 삽입**: `.env` 파일의 연결 정보를 사용하여 데이터를 삽입.
    -   대량 데이터 처리를 위해 1,000개 단위로 나누어 삽입.
4.  **검증**: 삽입된 데이터의 개수와 내용을 확인하여 무결성 보장.

## 주요 파일

- [prepare-dataset.js](file:///c:/Users/park/Desktop/park/프로그램/antigravity/project3_bible_insert/prepare-dataset.js): 텍스트 파일 파싱 및 JSON 생성 스크립트.
- [insert-to-mongodb.js](file:///c:/Users/park/Desktop/park/프로그램/antigravity/project3_bible_insert/insert-to-mongodb.js): MongoDB 데이터 삽입 스크립트.
- [verify-insertion.js](file:///c:/Users/park/Desktop/park/프로그램/antigravity/project3_bible_insert/verify-insertion.js): 삽입 결과 확인 스크립트.

## 검증 결과

- **총 구절 수**: 31,077개
- **데이터 샘플**:
```json
{
  "testament": "Old",
  "bookIndex": 1,
  "bookName": "창세기",
  "chapter": 1,
  "verse": 1,
  "headline": "천지 창조",
  "content": "태초에 하나님이 천지를 창조하시니라"
}
```
