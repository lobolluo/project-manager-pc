# {{项目名}}

> {{一句话描述}}

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装

```bash
# 克隆项目
git clone {{仓库地址}}
cd {{项目名}}

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env

# 启动开发服务
pnpm dev
```

### 常用命令

```bash
pnpm dev          # 开发
pnpm build        # 构建
pnpm test         # 测试
pnpm lint         # 代码检查
```

## 项目结构

```
{{项目名}}/
├── src/           # 源代码
├── docs/          # 文档
├── tests/         # 测试
└── scripts/       # 脚本
```

## 标准文档

| 文档 | 用途 | 更新时机 |
|------|------|----------|
| [VERSION.md](VERSION.md) | 版本进度 | 功能完成/变更时 |
| [PRD.md](PRD.md) | 产品需求 | 新增/修改功能时 |
| [CHANGELOG.md](CHANGELOG.md) | 技术变更记录 | 每次功能完成时 |
| [API.md](API.md) | 接口文档 | 接口变更时 |
| [BACKLOG.md](BACKLOG.md) | 需求池 | 收集到新建议时 |
| [ROADMAP.md](ROADMAP.md) | 开发规划 | 阶段调整时 |

## 技术栈

| 分类 | 选择 |
|------|------|
| 框架 | ... |
| 语言 | TypeScript |
| 包管理 | pnpm |

## 许可证

{{许可证类型}}
