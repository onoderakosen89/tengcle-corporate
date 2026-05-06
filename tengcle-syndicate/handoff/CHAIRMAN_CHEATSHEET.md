# Chairman 用チートシート

## 1. Slack での Manus 招待
- `#task-board` チャンネルで `/invite @manus` を実行
- `#manus-co` チャンネルで `/invite @manus` を実行

## 2. Cloud Computer Web ターミナルでの設定
1. Cloud Computer Web ターミナルを開く
2. `/home/ubuntu/_ts_shared/.env.slack` ファイルを編集し、以下の環境変数を設定する:
   - `SLACK_BOT_TOKEN`
   - `GEMINI_API_KEY`
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
3. 動作確認のため、以下のコマンドを実行する:
   `python3 board_watcher.py --dry-run`

## 3. API キーのローテーション (推奨)
- Manus Web の Settings → API Keys から新しい API キーを発行
- 古いキーを削除
- 新しいキーを `~/.secrets/` と Cloud Computer の両方で更新
