# Tengcle Syndicate ハンドオフ資料

このディレクトリは Tengcle Syndicate の Manus Agent 中心運用に関するハンドオフ資料一式を格納する。設立: 2026-05-06。

| ファイル | 用途 |
|---|---|
| `handoff/MANUS_AGENT_HANDOFF.md` | Manus Agent への引き継ぎ本体（運用方針・ミッション・Chairman プロフィール・Slack ルール・MCP・Skills・完了案件サマリ） |
| `handoff/manus_project_instruction.yaml` | `project.create` の `instruction` に注入した本体（identity / mission / chairman_profile / slack_rules / mcp_status / skills / subtask_strategy / forbidden） |
| `handoff/MANUS_SLACK_GUIDE.md` | Slack/LINE Integration 接続手順、投稿ルール、チャンネル ID、Webhook 運用、MCP 接続状態、APIキー取り扱い、Manus API 接続情報 |

シークレット（MANUS_API_KEY、Slack Webhook URL 等）は本ディレクトリにコミット禁止。`~/.secrets/<name>`（chmod 600）と `~/.env`（chmod 600）でのみ管理する。
