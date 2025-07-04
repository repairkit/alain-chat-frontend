alain-chat-frontend

alain-chat 用のフロントエンドプロジェクト
基本的なことはalain-chatのREADME.mdに書きました

技術
React vite

起動方法
alain-chat のsever.pyを起動してから行ってください
ポート80で動作します。

1.Docker イメージをビルド
docker build -t alain-chat-frontend .

2.コンテナを実行
docker run -p 80:80 alain-chat-frontend

3.Docker Compose を使用
docker-compose up app-prod