# 会計アプリ

## 使用技術

- frontend: TypeScript/React/Next.js/Tailwind CSS/MUI
- backend(api): PHP/Laravel
- infra: Docker/Docker Compose

## 環境構築

```sh
make init
```

以下の状態になれば OK

### api(Laravel)

- `api`ディレクトリ内に Laravel がインストールされている
- `localhost:80`にアクセスすると Laravel のウェルカムページが表示される

### frontend(Next.js)

- `front`ディレクトリ内に Next.js がインストールされる
- `localhost:3000`にアクセスするとログイン画面が表示される

## GUI ツールで DB に接続

- Sequel Ace
- Table Plus

等の GUI ツールで DB(MySQL)に接続。（以下接続情報）

ホスト: 127.0.0.1
ユーザー: sample
パスワード: sample
データベース: next_laravel

## Next.js の開発用サーバーの起動・停止

- 起動: `make dev`
- 停止: `control + c`
