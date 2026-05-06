# Manus Agent ハンドオフ資料（Tengcle Syndicate / Manus Co.）

作成: 2026-05-06 / 担当: 🟠 Manus Co.（タスクチャット側）
宛先: 👑 Chairman / 🟠 Tengcle Manus Agent（Manus アプリの IM Agent 本体）
目的: 現状のタスクチャットで蓄積した運用ルール・プロフィール・成果・課題を Manus Agents 中心運用へ引き継ぐ。

---

## 1. 運用方針（決定事項）

Tengcle Syndicate は **Manus Agent 中心 + Slack Integration** の構成へ全面移行する。Chairman は Manus アプリの IM Agent main task または Slack の `@manus` から指示を投下し、必要に応じて Agent が `agent_subtask` を内部分散して処理する。タスクチャット（本セッション）は深掘りや初期セットアップ用途として温存する。

Webhook は当面 Slack MCP（`slack_send_message` / `slack_read_channel` / `slack_read_thread`）で代用し、**リアルタイム反応が必要になったタイミングで Manus API の Webhook 機能を実装** する方針。

---

## 2. Tengcle Syndicate ミッション要約

最終目標は **BBBD（Build Before Buy Down — 資産基盤を守り世代を超えて継続）**、直近 KPI は **グループ年利益 1 億円**。収益ストリーム候補は (1) AI コンテンツ事業（動画・SNS、広告収益・フォロワー資産）、(2) 既存事業（YIH、NJ 不動産、日本不動産）の収益最大化、(3) 中間価格帯 AI サービス（ホテル AI コンサル、中国語圏参入支援）。各社の役割は次のとおり。

| 会社 | カラー | 主な役割 |
|---|---|---|
| Claude Code Co. | 🟣 | Vault / Obsidian 管理、戦略立案、意思決定整理、3 社オーケストレーション |
| Codex Co. | 🟢 | Cursor 上のコード操作、ローカル実装、自動化、Windows タスク連携 |
| Manus Co. | 🟠 | 市場リサーチ、競合調査、外部 Web/API 実行、長時間自律タスク、コンテンツ素材生成、Slack ハブ運用 |
| 役員会 | 🟡 | Board Watcher 経由で全社監視、`#board-room` レポート |
| Chairman | 👑 | 戦略決定、最終承認、緊急判断 |

---

## 3. Chairman プロフィール（Agent の Project `instruction` に必須）

28 歳 / INTJ / 夜型。Managing Director（YIH ヤンゴン）/ 株式会社 Tengcle 100% 株主。意思決定は速く、情報が揃ったら即断。**自動化・仕組み化を強く好み、手動作業を嫌う**。攻め志向、ミニマリスト。**件数や手間が増えるほど詰まる**ので、Manus は先回りして「面倒なものを多く一気に片付ける」ことに価値を出す。

文体は英語ビジネスでフォーマル＋温かみ・結論先行・感謝/承認を自然に入れる。日本語カジュアルは短く口語的・指示的（例:「〇〇しておいて」）。SNS は個人ファースト・煽らない・観察者スタンス。

報告は **結論先行・短文・数字付き**。長い説明は不要。最後に「次に何が必要か」を 1 行添える。Chairman の好み・スタイルが分からないときは、推測せず Slack `#task-board` で `【確認】Chairman の〇〇についての好みを教えて` と Claude Co. に問い合わせ、Vault（PERSONALITY.md）から回答してもらう。

Manus が守るべき対人パターン: 即レス圧をかけない / 細かい確認を求めすぎない / 主導権を尊重する（勝手に決めない）/ 質問は的を絞る・一度に多く聞かない。**Cloud Computer 解禁済み**のため、長時間タスクや踏み込んだ質問は許容される。

---

## 4. Slack 運用ルール（Agent も同様に従う）

`#task-board` と `#manus-co` を読むときは **必ずスレッド本体まで含めて読む**（`slack_read_channel` で `Thread: N replies` がある投稿は `slack_read_thread` で本文+全返信を取得）。タスク着手前と完了報告前の合計 2 回必ず実行。

投稿時は **会社名の直前に必ず会社カラー絵文字を付与**：🟠 Manus Co. / 🟣 Claude Co. / 🟢 Codex Co. / 🟡 役員会 / 👑 Chairman。MCP / Webhook いずれの経路でも適用する。

報告フォーマット:
```
【完了】タスク名
【依頼先】🟠 Manus Co.
【成果物】数字・URL・ファイル名で具体化
【次の依頼先】なし / 🟣 Claude Co.（理由）/ 🟢 Codex Co.（理由）
```

進行中ログ（#manus-co）は `【作業中】タスク名 / 進捗 / 次` の 3 行構成。

Cloud Computer オーバーレイ:
1. Cloud Computer（永続 VM ＋長時間自律サンドボックス）を使う
2. 完了まで時間がかかってよい
3. 進捗は 30〜60 分ごと、または重要中間成果ごとに `#manus-co` へ投稿

Webhook ローテーション課題: `#manus-co` 用 Incoming Webhook は 404 失効中（Codex Co. 指摘）。再発行後は `$SLACK_WEBHOOK_MANUS` 環境変数経由で利用すること（平文 URL を Markdown / Git にコミット禁止）。

---

## 5. 現在 ON の MCP（Manus Agent から即利用可）

`Slack` / `LINE` / `GitHub` / `My Browser`。Google Drive は MCP 未有効化のままだが、Google Workspace Integration（`gws` CLI）でアクセス可能。Chairman 承認: **Google Drive / Notion / Google Calendar は常時 ON でよい**（Tengcle Syndicate のどこかで ON ならコスト無駄なし）。Instagram / Creator Marketplace は実必要時に有効化、リサーチ AI（OpenAI / Gemini / Perplexity）はリサーチ結果から動的に優先度を更新。

接続可能な MCP は全 83 種で、カテゴリ別に Communication / SNS / Storage・Documents / Calendar・PM / CRM / 決済・経理 / DB・インフラ / 分析・監視 / AI 生成 / 自動化 / フォーム / 会議 AI / サブスク・広告 / コード支援 をカバーする。詳細は `MANUS_MCP_CATALOG.md`。

---

## 6. プリインストール Skills 9 種

`stock-analysis`（企業・株式調査）、`similarweb-analytics`（Web トラフィック分析）、`video-generator`（5 段階 AI 動画ワークフロー）、`music-prompter`（9 次元プロンプト音楽生成）、`gws-best-practices`（Google Workspace 操作）、`manus-api`（外部から Manus を呼ぶ Bot 構築指針）、`persistent-computing`（永続 VM・Bot 常駐）、`meta-ads-analyzer`（Meta 広告分析）、`skill-creator`（Skill 追加）。

加えてコア機能として、計画／対話、並列処理（最大 2,000 サブタスク）、cron / interval スケジュール、シェル・ファイル操作、ブラウザ自動化、7 種の検索 API（info / image / news / research / data / tool / api）、画像・動画・音楽・スライド生成、WebDev 初期化（web-static / web-db-user / mobile-app）、ポート公開、GitHub gh CLI、Google Workspace gws CLI、永続 VM など。詳細は `MANUS_SKILLS_AND_API.md`。

---

## 7. 完了済み案件のサマリ

| 完了タスク | TS（#task-board） | 主な成果物 |
|---|---|---|
| Manus Co. Slack 接続 + 参加報告 | 1778001202.267929 | MANUS_SLACK_GUIDE.md、Slack MCP 監視・取得体制確立 |
| 入力先マトリクス会議の起案 | 1778001928.638199 | A〜F の入力先 6 区分、Codex 見解（Claude=曖昧整理 / Codex=ローカル実装 / Manus=外部実行）反映 |
| MCP カタログ全 83 件共有 | 1778002114.881549 | MANUS_MCP_CATALOG.md、P0〜P3 推奨、Chairman 承認 3 件 |
| Skills + API カタログ共有 | 1778002402.686399 | MANUS_SKILLS_AND_API.md（3 層整理）|
| Chairman プロフィール取り込み | 1778003904.441069 | CHAIRMAN_PROFILE.md、MANUS_OPS_RULES.md |
| カラー付与＋スレッド読取ルール導入 | 1778004435.291379 | syndicate_format.colorize、slack_inbox.py（inbox / thread）|
| Drive ファイル名整理調査 Phase 1 | 1778005770.537649 | drive_inventory.jsonl 2,055 件、drive_summary.json、drive_archive_top20.md |

---

## 8. 進行中・要対応

- **Drive 整理 Phase 2**: Top20 の archive 移動承認待ち（特に Takeout zip 4 本で約 1.0 GB 即削除可）。承認後、review 1,758 件を MIME 別ヒューリスティクスで再分類。
- **Webhook ローテーション**: Codex Co. 担当。新 URL を `$SLACK_WEBHOOK_MANUS` に投入し、`MANUS_SLACK_GUIDE.md` を平文 URL なしの形に修正済み。
- **MCP 即時 ON**: Google Drive / Notion / Google Calendar の MCP 有効化（gws CLI 経由ではなく MCP として明示的に有効化したい場合）。

---

## 9. 移行ステップ（Chairman 操作が必要な箇所）

1. **Manus アプリで IM Agent を「Tengcle Manus」にリネーム**：`agent.update` で nickname と description を設定。description 冒頭にこのファイル `MANUS_AGENT_HANDOFF.md` の §1〜§4 のサマリを貼る。
2. **Project を 1 つ作成**して `instruction` に §3 Chairman プロフィール ＋ §4 Slack 運用ルールを貼り付け、Tengcle Syndicate 関連の `task.create` で `project_id` を必ず指定する。
3. **Slack Integration を有効化**：Manus Settings → Integrations → Slack → Connect を Chairman ご自身で実行（OAuth 同意のため API 代行不可）。連携後、Slack で `@manus` メンションすれば Agent main task または新規 task が自動起動。
4. （任意）**Webhook**：`webhook.create` で `task.completed` イベントを `#manus-co` に流す Bot を立てる。リアルタイム要件が出たタイミングで実装。

---

## 10. 添付ファイル一覧（参照用）

- `MANUS_OPS_RULES.md` — 業務運用ルール（カラー・スレッド読取・報告フォーマット・セキュリティ・Cloud Computer オーバーレイ）
- `CHAIRMAN_PROFILE.md` — Chairman の思考・対人・文体・好み
- `MANUS_MCP_CATALOG.md` — 接続可能 MCP 全 83 件の詳細
- `MANUS_SKILLS_AND_API.md` — Skills 9 種＋コア機能＋ Manus API カタログ
- `mcp_catalog.json` — MCP 一覧の機械可読版
- `drive_inventory.jsonl` / `drive_summary.json` / `drive_archive_top20.md` — Drive Phase 1 成果物
- `slack_inbox.py` / `syndicate_format.py` / `post_to_taskboard.py` / `post_manus_via_mcp.py` — 運用スクリプト群
