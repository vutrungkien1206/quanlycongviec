# Quản lý công việc cá nhân (To-do List)

Website quản lý công việc cá nhân, môn Thiết kế web nâng cao.

## Chức năng
- Đăng ký, đăng nhập, đăng xuất
- Thêm, sửa, xóa công việc
- Đặt hạn chót, đánh dấu hoàn thành
- Tìm kiếm theo tiêu đề, lọc theo trạng thái (tất cả, chưa hoàn thành, đã hoàn thành, quá hạn)

## Công nghệ
- Backend: Node.js, Express (mô hình MVC), REST API, express-session
- Cơ sở dữ liệu: MySQL
- Frontend: React (Vite), React Router

## Cách chạy

### 1. Tạo database
Mở MySQL Workbench, chạy toàn bộ file `database.sql`.

### 2. Chạy backend
```bash
cd backend
npm install
```
Tạo file `backend/.env` từ file mẫu `.env.example` và điền:
```
DB_PASSWORD=mat-khau-mysql-cua-ban
SESSION_SECRET=mot-chuoi-bi-mat-bat-ky
```
Sau đó:
```bash
npm start
```
Backend chạy tại http://localhost:3000

### 3. Chạy frontend
Mở một terminal khác:
```bash
cd frontend
npm install
npm run dev
```
Mở địa chỉ http://localhost:5173 trong trình duyệt.

## Cấu trúc thư mục
```
backend/   Express MVC: models, controllers, routes, middlewares
frontend/  React: pages, components
database.sql
```