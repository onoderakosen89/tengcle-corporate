# Schema.org Validator 検証結果

**テスト日時**: 2026年1月7日
**テストURL**: https://www.tengcle.com/

## 検出された構造化データ

| スキーマタイプ | エラー | 警告 | アイテム数 |
|--------------|--------|------|----------|
| WebPage | 2 ERRORS | 0 WARNINGS | 1 ITEM |
| BreadcrumbList | 0 ERRORS | 0 WARNINGS | 1 ITEM |
| ItemList | 0 ERRORS | 0 WARNINGS | 1 ITEM |
| LocalBusiness / ProfessionalService | 0 ERRORS | 0 WARNINGS | 3 ITEMS |
| SiteNavigationElement | 0 ERRORS | 0 WARNINGS | 1 ITEM |

## 総合結果

- **合計**: 7 ITEMS 検出
- **エラー**: 2件（WebPageスキーマ）
- **警告**: 0件

## 詳細

WebPageスキーマに2件のエラーがありますが、これらは通常、推奨フィールドの欠落によるものです。主要な構造化データ（Organization、LocalBusiness、BreadcrumbList、ItemList、SiteNavigationElement）は正常に検出されています。

## エラー詳細

### WebPage スキーマ (2 ERRORS)

1. **hasCredential エラー**: `GovernmentPermit is not a known valid target type for the hasCredential property.`
   - 原因: hasCredential プロパティに GovernmentPermit タイプを使用しているが、Schema.org の仕様では有効なターゲットタイプではない
   - 影響: 軽微（構造化データ自体は認識される）

2. **addressCountry エラー**: Country タイプの使用に関する問題
   - 原因: addressCountry に Country オブジェクトを使用しているが、文字列（国コード）が推奨される

## 正常に検出された構造化データ

- **Organization**: Tengcle Group（親組織）
  - subOrganization: Tengcle Limited (HK), Tengcle株式会社 (JP), Tengcle Development LLC (US)
- **LocalBusiness / ProfessionalService**: 3拠点の事業所情報
- **BreadcrumbList**: パンくずリスト
- **ItemList**: 地域リスト
- **SiteNavigationElement**: ナビゲーション要素

## 推奨対応

1. hasCredential を hasOfferCatalog 内の Offer に移動するか、削除を検討
2. addressCountry を文字列（"HK", "JP", "US"）に変更
3. Google Search Consoleでの再インデックスをリクエスト

## 総合評価

構造化データは全体的に正しく実装されています。2件のエラーは軽微なもので、検索エンジンによる構造化データの認識には大きな影響はありません。
