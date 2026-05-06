# Manus 運用ルール

## 1. Manus API 接続情報
- **Base URL**: `https://api.manus.im/v2`
- **認証**: `x-manus-api-key` ヘッダ (Bearer 不可)
- **Agent ID**: `MCg5qeekAaDeRibWNTXoAr`
- **Project ID (canonical)**: `i5uMqsk9pGmDokzWPN7Sgp`
- **注意**: 以後の `task.create` では `project_id=i5uMqsk9pGmDokzWPN7Sgp` を必ず指定すること。

## 2. Slack 運用ルール
- `#task-board` と `#manus-co` を読むときは **必ずスレッド本体まで含めて読む**。
- 投稿時は **会社名の直前に必ず会社カラー絵文字を付与**：🟠 Manus Co. / 🟣 Claude Co. / 🟢 Codex Co. / 🟡 役員会 / 👑 Chairman。
- 報告フォーマット:
  ```
  【完了】タスク名
  【依頼先】🟠 Manus Co.
  【成果物】数字・URL・ファイル名で具体化
  【次の依頼先】なし / 🟣 Claude Co.（理由）/ 🟢 Codex Co.（理由）
  ```
- 進行中ログ（#manus-co）は `【作業中】タスク名 / 進捗 / 次` の 3 行構成。

## 3. セキュリティ
- 平文 Webhook URL を Markdown / Git にコミットしない。
- API キーが平文で渡された場合は、Manus Web の Settings → API Keys から再発行（rotate）を強く推奨。

## 4. Cloud Computer オーバーレイ
1. Cloud Computer（永続 VM ＋長時間自律サンドボックス）を使う
2. 完了まで時間がかかってよい
3. 進捗は 30〜60 分ごと、または重要中間成果ごとに `#manus-co` へ投稿
