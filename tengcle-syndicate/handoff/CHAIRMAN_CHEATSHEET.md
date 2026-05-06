# CHAIRMAN_CHEATSHEET.md — Chairman 操作手順書
更新: 2026-05-06 / 担当: 🟠 Manus Co.（Tengcle Manus Agent）
対象: 👑 Chairman

本ドキュメントは、Tengcle Syndicate の Manus Agent 統合を完成させるために Chairman が実行すべき **残り 2 アクション** と、セキュリティ対応の手順を 1 ファイルに集約したものである。

---

## ステータスサマリ（2026-05-06 時点）

| 項目 | 状態 | 担当 |
|---|---|---|
| `agent.update`（nickname = Tengcle Manus） | ✅ 完了 | 🟠 Manus Co. |
| `project.create`（id = `i5uMqsk9pGmDokzWPN7Sgp`） | ✅ 完了 | 🟠 Manus Co. |
| GitHub commit `1aaec24`（handoff bundle） | ✅ 完了 | 🟠 Manus Co. |
| Slack `/invite @manus`（#task-board / #manus-co） | ✅ 完了（Bot 参加確認済み） | 👑 Chairman |
| Cloud Computer `.env.slack` 書き込み | ⏳ 要対応 | 👑 Chairman |
| MANUS_API_KEY rotate | ⚠️ 強く推奨 | 👑 Chairman |
| `$SLACK_WEBHOOK_MANUS` rotate | 🔄 継続中 | 🟢 Codex Co. |
| 重複 project 削除（hvQHvMyQBXdnjUgSm3EEvM / dHUXUWrARjXsZSZZggyRSk） | ⏳ 要対応 | 🟣 Claude Co. |

---

## Action 1（完了済み）: Slack `/invite @manus`

`#task-board` と `#manus-co` の両チャンネルで `/invite @manus` を実行し、Manus Bot の参加が確認された（2026-05-06 15:11 JST）。

---

## Action 2（要対応）: Cloud Computer `.env.slack` 書き込み

**所要時間: 約 5 分**

### 手順

1. Manus Web（[https://manus.im/](https://manus.im/)）にログインし、**Cloud Computer** を開く。
2. Web ターミナルを起動する。
3. 以下のコマンドで `.env.slack` ファイルを作成・編集する：

```bash
mkdir -p /home/ubuntu/_ts_shared
nano /home/ubuntu/_ts_shared/.env.slack
```

4. 以下の内容を貼り付ける（各値を実際のキーに置き換える）：

```
SLACK_BOT_TOKEN=xoxb-XXXXXXXXXXXXXXXX
GEMINI_API_KEY=AIzaXXXXXXXXXXXXXXXX
OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXX
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXX
```

5. `Ctrl+O` で保存 → `Ctrl+X` で終了。

6. ファイルのパーミッションを制限する：

```bash
chmod 600 /home/ubuntu/_ts_shared/.env.slack
```

7. `board_watcher.py` でドライランを実行して確認する：

```bash
cd /home/ubuntu
python3 board_watcher.py --dry-run
```

正常に動作すれば `[DRY-RUN] OK` または同等のメッセージが表示される。

---

## セキュリティ対応（強く推奨）: MANUS_API_KEY rotate

**背景**: Slack チャット上で `MANUS_API_KEY` が平文で共有されたため、漏洩リスクがある。

### 手順

1. Manus Web（[https://manus.im/](https://manus.im/)）にログインする。
2. 左下のアバター → **Settings → API Keys** を開く。
3. 既存のキーを **Revoke（取り消し）** する。
4. **New API Key** をクリックして新しいキーを発行する。
5. 新しいキーを以下の 2 箇所に更新する：
   - `~/.secrets/` 内の該当ファイル
   - Cloud Computer の `.env.slack`（または該当する環境変数ファイル）

---

## Manus API 接続情報（確定版）

| 項目 | 値 |
|---|---|
| Base URL | `https://api.manus.im/v2` |
| 認証ヘッダ | `x-manus-api-key: <YOUR_KEY>`（Bearer 不可） |
| Agent ID | `MCg5qeekAaDeRibWNTXoAr` |
| Project ID（canonical） | `i5uMqsk9pGmDokzWPN7Sgp` |

**重要**: 以後の `task.create` は必ず `project_id=i5uMqsk9pGmDokzWPN7Sgp` を指定すること。これにより Chairman プロフィールと Slack 運用ルールが全タスクに自動注入される。

### サンプルリクエスト（task.create）

```bash
curl -X POST https://api.manus.im/v2/task.create \
  -H "x-manus-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "MCg5qeekAaDeRibWNTXoAr",
    "project_id": "i5uMqsk9pGmDokzWPN7Sgp",
    "prompt": "タスク内容をここに記述"
  }'
```

---

## 次のアクション一覧

| 優先度 | アクション | 担当 | 期限 |
|---|---|---|---|
| 🔴 高 | `.env.slack` 書き込み + `board_watcher.py --dry-run` 確認 | 👑 Chairman | 即時 |
| 🔴 高 | MANUS_API_KEY rotate | 👑 Chairman | 即時 |
| 🟡 中 | 重複 project 削除（Manus Web UI） | 🟣 Claude Co. | 今日中 |
| 🟡 中 | `$SLACK_WEBHOOK_MANUS` rotate | 🟢 Codex Co. | 今日中 |

---

## 参照ファイル

| ファイル | 内容 |
|---|---|
| `MANUS_AGENT_HANDOFF.md` | 運用方針・ミッション・Chairman プロフィール・Slack ルール |
| `MANUS_SLACK_GUIDE.md` | Slack/LINE 接続手順・投稿ルール・Webhook 運用 |
| `manus_project_instruction.yaml` | project.create instruction 本体 |
