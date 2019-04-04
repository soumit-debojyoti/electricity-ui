USE [Electricity]
GO
/****** Object:  Table [dbo].[users]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP TABLE [dbo].[users]
GO
/****** Object:  Table [dbo].[user_token_mapper]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP TABLE [dbo].[user_token_mapper]
GO
/****** Object:  Table [dbo].[role]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP TABLE [dbo].[role]
GO
/****** Object:  Table [dbo].[employee_role]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP TABLE [dbo].[employee_role]
GO
/****** Object:  Table [dbo].[employee]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP TABLE [dbo].[employee]
GO
/****** Object:  StoredProcedure [dbo].[validate_token]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[validate_token]
GO
/****** Object:  StoredProcedure [dbo].[qualify_referer_user]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[qualify_referer_user]
GO
/****** Object:  StoredProcedure [dbo].[get_users]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[get_users]
GO
/****** Object:  StoredProcedure [dbo].[get_roles]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[get_roles]
GO
/****** Object:  StoredProcedure [dbo].[get_referer_token]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[get_referer_token]
GO
/****** Object:  StoredProcedure [dbo].[get_employees]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[get_employees]
GO
/****** Object:  StoredProcedure [dbo].[get_employee_role]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[get_employee_role]
GO
/****** Object:  StoredProcedure [dbo].[find_users]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP PROCEDURE [dbo].[find_users]
GO
USE [master]
GO
/****** Object:  Database [Electricity]    Script Date: 3/16/2019 11:23:35 PM ******/
DROP DATABASE [Electricity]
GO
/****** Object:  Database [Electricity]    Script Date: 3/16/2019 11:23:35 PM ******/
CREATE DATABASE [Electricity]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Electricity', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Electricity.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Electricity_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\Electricity_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Electricity] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Electricity].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Electricity] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Electricity] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Electricity] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Electricity] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Electricity] SET ARITHABORT OFF 
GO
ALTER DATABASE [Electricity] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Electricity] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [Electricity] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Electricity] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Electricity] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Electricity] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Electricity] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Electricity] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Electricity] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Electricity] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Electricity] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Electricity] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Electricity] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Electricity] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Electricity] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Electricity] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Electricity] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Electricity] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Electricity] SET RECOVERY FULL 
GO
ALTER DATABASE [Electricity] SET  MULTI_USER 
GO
ALTER DATABASE [Electricity] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Electricity] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Electricity] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Electricity] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Electricity', N'ON'
GO
USE [Electricity]
GO
/****** Object:  StoredProcedure [dbo].[find_users]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[find_users] 
@user_name varchar(50),
@password nvarchar(50)	
AS
BEGIN
	select count(*) 
	from dbo.[users] as u 
	where 
	u.user_name=@user_name 
	AND 
	u.[password]=@password 
END

GO
/****** Object:  StoredProcedure [dbo].[get_employee_role]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create PROCEDURE [dbo].[get_employee_role] 
	
AS
BEGIN
	select * from dbo.employee_role
END

GO
/****** Object:  StoredProcedure [dbo].[get_employees]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_employees] 
	
AS
BEGIN
	select * from dbo.employee
END

GO
/****** Object:  StoredProcedure [dbo].[get_referer_token]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_referer_token] 
@user_name varchar(50)
AS
BEGIN
	
     DECLARE @USERTOKEN NVARCHAR(MAX)
	 select @USERTOKEN = security_stamp from dbo.[users] as u
	 where 
	u.user_name=@user_name 

	DECLARE @RAND_NUM NVARCHAR(100)
	SELECT @RAND_NUM=convert(numeric(12,0),rand() * 899999999999) + 100000000000;

	insert into
    [dbo].[user_token_mapper]
	values 
	(@USERTOKEN,@RAND_NUM,GETDATE(),10,0,NULL)
	SELECT @RAND_NUM AS TOKEN
END

GO
/****** Object:  StoredProcedure [dbo].[get_roles]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_roles] 
	
AS
BEGIN
	select * from dbo.role
END

GO
/****** Object:  StoredProcedure [dbo].[get_users]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[get_users] 
	
AS
BEGIN
	select u.user_id,u.user_name,u.email,u.security_stamp,u.role_id, r.role_name as [role_name] from dbo.[users] as u,dbo.role as r where u.role_id=r.role_id
END

GO
/****** Object:  StoredProcedure [dbo].[qualify_referer_user]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[qualify_referer_user] 
@user_name varchar(50)
AS
BEGIN
	select count(*) 
	from dbo.[users] as u,dbo.[role] as r
	where 
	u.user_name=@user_name 
	AND
	u.role_id=r.role_id
	AND 
	r.role_name<>'user'

END

GO
/****** Object:  StoredProcedure [dbo].[validate_token]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[validate_token] 
@token nvarchar(max),
@bit BIT OUTPUT
AS
BEGIN
     declare @expiredate datetime
	declare @datecreate datetime
	declare @expiredays int
     select @datecreate=created_date,@expiredays=expiration_days from 
    [dbo].[user_token_mapper]
where
security_number=@token
and
is_used=0

SELECT @expiredate= DATEADD(day, @expiredays, @datecreate);
print @expiredate
if(@expiredate>=GETDATE())
BEGIN
SET @bit=1
END
else
begin
set @bit=0
end


END

GO
/****** Object:  Table [dbo].[employee]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee](
	[id] [int] NOT NULL,
	[name] [nchar](10) NOT NULL,
	[address] [nchar](1000) NULL,
 CONSTRAINT [PK_employee] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[employee_role]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[employee_role](
	[employee_id] [int] NOT NULL,
	[role_id] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[role]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role](
	[role_id] [int] NOT NULL,
	[role_name] [nchar](10) NOT NULL,
 CONSTRAINT [PK_role] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_token_mapper]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[user_token_mapper](
	[user_token_key] [nvarchar](max) NULL,
	[security_number] [nvarchar](max) NULL,
	[created_date] [datetime] NULL,
	[expiration_days] [int] NULL,
	[is_used] [char](1) NULL,
	[refered_user_token] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[users]    Script Date: 3/16/2019 11:23:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] NOT NULL,
	[user_name] [nvarchar](50) NOT NULL,
	[role_id] [int] NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[security_stamp] [nvarchar](max) NOT NULL,
	[password] [nvarchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[employee] ([id], [name], [address]) VALUES (1, N'Soumit    ', N'Barrackpore                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ')
INSERT [dbo].[employee] ([id], [name], [address]) VALUES (2, N'Pramit    ', N'Palta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ')
INSERT [dbo].[employee_role] ([employee_id], [role_id]) VALUES (1, 1)
INSERT [dbo].[employee_role] ([employee_id], [role_id]) VALUES (2, 2)
INSERT [dbo].[role] ([role_id], [role_name]) VALUES (1, N'admin     ')
INSERT [dbo].[role] ([role_id], [role_name]) VALUES (2, N'employee  ')
INSERT [dbo].[role] ([role_id], [role_name]) VALUES (3, N'user      ')
INSERT [dbo].[user_token_mapper] ([user_token_key], [security_number], [created_date], [expiration_days], [is_used], [refered_user_token]) VALUES (N'7AE67B5E-4C7B-4892-8F7E-554834FDC208', N'870163445677', CAST(0x0000AA1201787F77 AS DateTime), 10, N'0', NULL)
INSERT [dbo].[users] ([user_id], [user_name], [role_id], [email], [security_stamp], [password]) VALUES (1, N'soumit.nag', 1, N'nag.soumit@gmail.com', N'7AE67B5E-4C7B-4892-8F7E-554834FDC208', N'P@ssw0rd')
INSERT [dbo].[users] ([user_id], [user_name], [role_id], [email], [security_stamp], [password]) VALUES (2, N'pramit.das', 2, N'das.pramit@hotmail.com', N'F2213FF8-1F0D-4002-9032-A21C2602E2CA', N'P@ssw0rd')
INSERT [dbo].[users] ([user_id], [user_name], [role_id], [email], [security_stamp], [password]) VALUES (3, N'krishna.nag', 2, N'nag.krishna', N'A4443C87-4C55-4A84-9607-1B54A06E7BDB', N'P@ssw0rd')
INSERT [dbo].[users] ([user_id], [user_name], [role_id], [email], [security_stamp], [password]) VALUES (4, N'sarit.nag', 2, N'nag.sait', N'0D4DC12A-C93A-4D68-8F90-7AB171FEA7BB', N'P@ssw0rd')
USE [master]
GO
ALTER DATABASE [Electricity] SET  READ_WRITE 
GO
