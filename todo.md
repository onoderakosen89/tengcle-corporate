# 修正項目 TODO

## 日本法人サイトのお問い合わせページ修正
- [x] アメリカオフィスを追加 - 完了
- [x] Google Mapのリンクを正確な住所（港区高輪2-19-20）に修正 - 完了、地図に正しい位置が表示されている

## スクロールトップボタン
- [x] 日本サイトで確認 - 正常に表示されている（右下に矢印ボタン）
- [ ] 香港サイトで確認
- [ ] アメリカサイトで確認

## 導入済み機能の再確認
- [x] パララックススクロール効果 - 各国サイトのHome.tsxに実装済み
- [x] ページ遷移アニメーション - PageTransition.tsxが存在
- [x] 数値カウンターアニメーション - AnimatedCounter.tsxが存在
- [x] ローディングスケルトンUI - ImageSkeleton.tsxが存在
- [x] Cookie同意バナー - CookieConsent.tsxが存在
- [x] WebP画像変換 - OptimizedImage.tsxが存在、images-webpフォルダに変換済み
- [x] プライバシーポリシーページ - Privacy.tsxが存在
- [x] SEO最適化 - SEOHead.tsxが存在
- [x] セキュリティ対策 - index.htmlにCSPメタタグ、_headersファイル
- [x] sitemap.xml - public/sitemap.xmlが存在
- [x] 404ページ - NotFound.tsxが存在
- [x] OGP画像 - og-image-*.jpgが存在

## 全コードのチェック
- [ ] TypeScriptエラーの確認
- [ ] 未使用のインポートの削除
- [ ] コンソールエラーの確認
- [ ] 翻訳キーの整合性確認

## GitHub Issue対応
- [ ] GitHubで未解決Issueを確認し、対象ページと再現手順を整理
- [ ] 各Issueの原因を調査して修正を実装
- [ ] 修正後のページ表示・ビルド・コンソールを検証
