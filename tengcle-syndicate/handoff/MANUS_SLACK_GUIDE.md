# Manus Slack 運用ガイド（Tengcle Syndicate / 🟠 Manus Co.）

更新: 2026-05-06 / 担当: 🟠 Manus Co.（Tengcle Manus Agent）
対象: 👑 Chairman / 🟠 Tengcle Manus Agent / 🟣 Claude Co. / 🟢 Codex Co. / 🟡 役員会
保管場所: GitHub `onoderakosen89/tengcle-corporate` の `tengcle-syndicate/handoff/`

本ガイドは、Manus アプリの IM Agent（Tengcle Manus）と Slack Workspace `tengclehq.slack.com` を運用するうえで必要な手順・ルール・チャンネル ID・MCP 接続状態・APIキー取り扱いを 1 ファイルに集約したものである。最新の判断（2026-05-06）に基づき、過去の `MANUS_SLACK_GUIDE.md` を全面改訂した。

---

## 1. Slack Integration 接続手順（Chairman 操作分）

OAuth 同意は Manus API では代行できないため、Chairman ご自身の操作が必要となる。所要時間は約 3 分。

1. Manus Web（[https://manus.im/](https://manus.im/)）にログインし、左下のアバター → **Settings → Integrations** を開く。
2. **Slack** カードの右側 **Connect** をクリックし、ブラウザの新しいタブで `tengclehq.slack.com` ワークスペースを選択して **Allow** を押す。
3. Slack に戻り、**`#task-board` と `#manus-co` のそれぞれで `/invite @manus` を実行**して Tengcle Manus Bot をチャンネルに参加させる。これにより `@manus` メンションがそのままタスクとして起動するようになる。
4. テストとして `#manus-co` で `@manus ping` と打ち、`pong` 相当の応答が返れば接続成功とみなす。

---

## 2. LINE Integration 接続手順（Chairman 操作分）

1. Manus Web → **Settings → Integrations → LINE** カードの **Connect** をクリックし、表示される LINE Login の同意画面で「許可する」を選択。
2. LINE Official Account 側に Manus Bot が友だち追加されたことを確認し、グループ内利用が必要な場合は対象グループに招待する（Bot 名表示は LINE Developers Console で設定）。
3. LINE は Messaging API のメッセージ枠が月次でリセットされるため、Tengcle Syndicate では「Chairman 直 LINE は緊急通知のみ」「日常運用は Slack 主」とする方針を堅持する。

---

## 3. 投稿ルール

### 3.1 カラー絵文字（必須）

会社名の直前に必ず会社カラー絵文字を 1 つ付与する。Slack 表示と Vault 保存の両方で本ルールを適用する。

| 主体 | 絵文字 | 表記例 |
|---|---|---|
| Manus Co. | 🟠 | 🟠 Manus Co. |
| Claude Co. | 🟣 | 🟣 Claude Co. |
| Codex Co. | 🟢 | 🟢 Codex Co. |
| 役員会 | 🟡 | 🟡 役員会 |
| Chairman | 👑 | 👑 Chairman |

### 3.2 報告フォーマット

完了報告は 4 行構成、進行中ログは 3 行構成で統一する。長文ブロックは可、ただし冒頭 4 行（または 3 行）の構造は崩さない。

```
【完了】タスク名
【依頼先】🟠 Manus Co.
【成果物】数字・URL・ファイル名で具体化
【次の依頼先】なし / 🟣 Claude Co.（理由）/ 🟢 Codex Co.（理由）
```

```
【作業中】タスク名
進捗:
・〜まで完了
次:
・〜を実行
```

### 3.3 進行中ログ（#manus-co）

長時間タスクや Cloud Computer ジョブでは、`#manus-co` に **30〜60 分ごと、または重要な中間成果ごとに** 進行中ログを投稿する。Chairman が逐一見ない前提で、後追いで Vault が文脈を再構成できるよう数字と TS を残す。

### 3.4 スレッド読取ルール

`#task-board` と `#manus-co` を読むときは、必ず **タスク着手前と完了報告前の合計 2 回**、`slack_read_channel` で取得し、`Thread: N replies` のついた投稿は `slack_read_thread`（パラメータは `channel_id` と `message_ts`）で本文 + 全返信まで取得する。スレッドを読まずに投稿することは禁止。

### 3.5 Cloud Computer オーバーレイ

(1) Cloud Computer（永続 VM ＋長時間自律サンドボックス）で実行する。(2) 完了まで時間がかかってよい、中途退出より質を優先する。(3) 進捗は 30〜60 分ごとまたは重要中間成果ごとに `#manus-co` へ投稿する。

---

## 4. チャンネル ID 早見表

| チャンネル | ID | 用途 |
|---|---|---|
| `#task-board` | `C0B1VR3KX2Q` | 横断タスク発火・完了報告・Chairman 判断待ち集約 |
| `#manus-co` | `C0B1VR19RV2` | 🟠 Manus Co. の進行中ログ・中間成果通知 |
| `#claude-co` | （別途） | 🟣 Claude Co. のローカル進行ログ |
| `#codex-co` | （別途） | 🟢 Codex Co. のローカル進行ログ |
| `#board-room` | （別途） | 🟡 役員会 Board Watcher レポート |

---

## 5. Webhook 運用方針

`#manus-co` 用 Incoming Webhook は 404 失効中（Codex Co. による指摘）。再発行までは Slack MCP（`slack_send_message` / `slack_read_channel` / `slack_read_thread`）を一次経路として運用する。再発行後は次の手順で切り替える。

1. 新しい Webhook URL を **環境変数 `$SLACK_WEBHOOK_MANUS`** に投入し、`~/.env`（chmod 600）にも追記する。
2. 平文 Webhook URL は **Markdown / Git にコミット禁止**。本ガイドや関連スクリプトは必ず `$SLACK_WEBHOOK_MANUS` を参照する書き方に統一する。
3. リアルタイム反応が必要になった時点で `webhook.create`（Manus API v2）を実装し、`task.completed` イベントを `#manus-co` に流す Bot を立てる。それまでは Slack MCP で十分とする。

---

## 6. MCP 接続状態（2026-05-06 時点）

| MCP | 状態 | 備考 |
|---|---|---|
| Slack | ON（即利用可） | チャンネル監視・投稿・Canvas 操作の主経路 |
| LINE | ON（即利用可） | Chairman 直 LINE は緊急通知のみ |
| GitHub | ON（即利用可） | `onoderakosen89/tengcle-corporate` ほかの操作 |
| My Browser | ON（即利用可） | ログイン保持の Web 操作。X 収集等で利用 |
| Google Drive | 常時 ON 承認済み | Tengcle Syndicate のどこかで ON ならコスト無駄なし |
| Notion | 常時 ON 承認済み | データソース運用、enhanced-markdown-spec を遵守 |
| Google Calendar | 常時 ON 承認済み | スケジュール照会・登録 |
| Instagram / Creator Marketplace | 実必要時 ON | コンテンツ事業立ち上げ時に有効化 |
| OpenAI / Gemini / Perplexity | 動的優先度 | リサーチ結果に応じて選択 |

接続可能な MCP は全 83 種で、詳細は `MANUS_MCP_CATALOG.md` を参照（カテゴリ別: Communication / SNS / Storage・Documents / Calendar・PM / CRM / 決済・経理 / DB・インフラ / 分析・監視 / AI 生成 / 自動化 / フォーム / 会議 AI / サブスク・広告 / コード支援）。

---

## 7. APIキー・シークレットの取り扱い

Manus API キー（`MANUS_API_KEY`）、Slack Webhook URL（`$SLACK_WEBHOOK_MANUS`）、その他 Connector の API キーは **チャット本文・ドキュメント本文・Git コミットに平文で出さない**。次の運用を徹底する。

1. シークレットの実体は `~/.secrets/<name>`（chmod 600）と `~/.env`（chmod 600）にのみ置き、参照は環境変数経由。
2. 表示が必要な場面では先頭 8 文字 + `***` でマスクする（例: `${MANUS_API_KEY:0:8}***`）。
3. 漏洩・誤コミットが疑われる場合は **即時ローテート**（Manus Settings → API Keys → Revoke ＋再発行、Slack は Workspace Owner に Webhook 再発行依頼）。
4. リポジトリへのコミット前に必ず `git diff --cached` でシークレットの混入有無を目視確認する。

---

## 8. Manus API 接続情報（補足）

セットアップ時に確認した実機の接続情報は次のとおり（キー本体は記載しない）。

| 項目 | 値 |
|---|---|
| Base URL | `https://api.manus.im/v2` |
| 認証ヘッダ | `x-manus-api-key: ${MANUS_API_KEY}` |
| 主要エンドポイント | `GET /agent.list`, `GET /agent.detail?agent_id=...`, `POST /agent.update`, `POST /project.create`, `GET /project.list` |
| 利用不可（404）| `POST /project.delete`, `POST /project.update`, `GET /project.detail`（2026-05-06 時点。Manus 側で未実装の可能性） |

`Authorization: Bearer ...` 形式は `unauthenticated` を返したため、本 API キーでは **`x-manus-api-key` ヘッダのみ有効**。

---

## 9. 関連ドキュメント

- `MANUS_AGENT_HANDOFF.md` — 本セットアップの一次資料（運用方針・ミッション・Chairman プロフィール・Slack ルール・MCP・Skills・完了案件サマリ）
- `manus_project_instruction.yaml` — `project.create` の `instruction` に注入した本体（identity / mission / chairman_profile / slack_rules / mcp_status / skills / subtask_strategy / forbidden）
- `MANUS_OPS_RULES.md` — 業務運用ルール（カラー・スレッド読取・報告フォーマット・セキュリティ・Cloud Computer オーバーレイ）
- `CHAIRMAN_PROFILE.md` — Chairman の思考・対人・文体・好み
- `MANUS_MCP_CATALOG.md` — 接続可能 MCP 全 83 件の詳細
- `MANUS_SKILLS_AND_API.md` — Skills 9 種＋コア機能＋ Manus API カタログ

---

## 10. 次のアクション 1 行

Chairman は `#task-board` と `#manus-co` で `/invite @manus` を実行してください（OAuth は完了済み、招待のみ未実施）。
