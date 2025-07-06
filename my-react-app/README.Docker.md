

このプロジェクトは Docker を使用して開発およびプロダクション環境で実行できます。



## 使用方法

### プロダクション環境

#### 1. Docker イメージをビルド
```bash
docker build -t alain-chat-frontend .
```

#### 2. コンテナを実行
```bash
docker run -p 80:80 alain-chat-frontend
```

#### 3. Docker Compose を使用（推奨）
```bash
docker-compose up app-prod
```

アプリケーションは http://localhost でアクセスできます。

### 開発環境

#### 1. 開発用コンテナを起動
```bash
docker-compose up app-dev
```

#### 2. または直接開発用 Dockerfile を使用
```bash
docker build -f Dockerfile.dev -t alain-chat-frontend-dev .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules alain-chat-frontend-dev
```

開発サーバーは http://localhost:5173 でアクセスできます。





