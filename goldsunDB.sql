-- Tạo database nếu chưa tồn tại
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'goldsunDB')
BEGIN
    CREATE DATABASE [goldsunDB];
END;
GO

USE [goldsunDB];
GO

-- Xóa bảng nếu đã tồn tại
IF OBJECT_ID('dbo.[user]', 'U') IS NOT NULL
DROP TABLE dbo.[user];
GO

-- Tạo bảng user
CREATE TABLE [dbo].[user] (
    id_user CHAR(36) NOT NULL,
    email VARCHAR(100) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    avatar VARCHAR(255) NULL,
    [time] DATETIME NULL DEFAULT GETDATE(),
    CONSTRAINT PK_user PRIMARY KEY (id_user),
    CONSTRAINT UQ_user_email UNIQUE (email)
);
GO

-- Insert dữ liệu mẫu
INSERT INTO [dbo].[user] ([id_user], [email], [pass], [avatar], [time]) VALUES 
(N'14d115d1-e6b1-460d-81a3-54758990a477', N'TUNG', N'1', N'/images/avatar/1749882258283_ccc.png', GETDATE()),
(N'2051EA3F-0052-4783-942B-39449A248CB6', N'user1@example.com', N'123456', N'https://i.pravatar.cc/150?img=1', GETDATE()),
(N'd1c9dd9f-aa5d-4558-836c-6f2c87994968', N'cong', N'1', N'/images/avatar/1749881136434_denys-nevozhai-g5-5pRzVPZw-unsplash.jpg', GETDATE());
GO

-- Xóa stored procedures cũ nếu tồn tại
IF OBJECT_ID('sp_get_all_users', 'P') IS NOT NULL
    DROP PROCEDURE sp_get_all_users;
IF OBJECT_ID('sp_login', 'P') IS NOT NULL
    DROP PROCEDURE sp_login;
IF OBJECT_ID('sp_register', 'P') IS NOT NULL
    DROP PROCEDURE sp_register;
GO

-- Thủ tục: lấy toàn bộ người dùng
CREATE PROCEDURE [dbo].[sp_get_all_users]
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id_user, email, pass, avatar, time FROM [user];
END;
GO

-- Thủ tục: đăng nhập
CREATE PROCEDURE [dbo].[sp_login]
    @email VARCHAR(255),
    @pass VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP 1 * FROM [user]
    WHERE email = @email AND pass = @pass;
END;
GO

-- Thủ tục: đăng ký
CREATE PROCEDURE [dbo].[sp_register]
    @id_user CHAR(36),
    @email VARCHAR(100),
    @pass VARCHAR(100),
    @avatar VARCHAR(255),
    @time DATETIME
AS
BEGIN
    IF EXISTS (SELECT 1 FROM [user] WHERE email = @email)
    BEGIN
        RAISERROR('Email đã tồn tại', 16, 1);
        RETURN;
    END

    INSERT INTO [user] (id_user, email, pass, avatar, time)
    VALUES (@id_user, @email, @pass, @avatar, @time);
END;
GO
