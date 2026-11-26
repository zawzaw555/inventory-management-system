# 在庫管理システム

商品情報を登録・閲覧・編集・削除できる在庫管理Webアプリです。

## 使用技術

- フロントエンド：React、TypeScript、Vite
- バックエンド：Java、Spring Boot、MyBatis
- データベース：MySQL、Flyway
- 実行環境：Docker Compose

## 起動方法

Docker Desktop を起動してから、以下のコマンドを実行します。

```bash
git clone https://github.com/zawzaw555/inventory-management-system.git
cd リポジトリ名
cp .env.example .env
docker compose up --build -d
```

起動後、ブラウザで http://localhost:5173 を開きます。

## 停止方法

```bash
docker compose down
```