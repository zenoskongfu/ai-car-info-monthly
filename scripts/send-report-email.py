#!/usr/bin/env python3
import os
import smtplib
import ssl
from email.message import EmailMessage


def env(name: str, default: str = "") -> str:
    value = os.environ.get(name)
    if value is None or not value.strip():
        return default
    return value.strip()


def required_config_present() -> bool:
    required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "REPORT_NOTIFY_TO"]
    missing = [name for name in required if not env(name)]
    if missing:
        print(f"Email notification skipped; missing env vars: {', '.join(missing)}")
        return False
    return True


def build_message() -> EmailMessage:
    report_month = env("REPORT_MONTH", "unknown")
    repository = env("GITHUB_REPOSITORY", "unknown/repository")
    github_server = env("GITHUB_SERVER_URL", "https://github.com")
    run_id = env("GITHUB_RUN_ID")
    branch_name = env("BRANCH_NAME")
    pr_url = env("PR_URL")

    repo_url = f"{github_server}/{repository}"
    report_url = f"{repo_url}/tree/{branch_name}/docs/monthly/{report_month}" if branch_name else repo_url
    run_url = f"{repo_url}/actions/runs/{run_id}" if run_id else repo_url

    body_lines = [
        f"{report_month} 国内智驾芯片与车型月报已生成。",
        "",
        f"月报目录：{report_url}",
    ]
    if pr_url:
        body_lines.append(f"Pull Request：{pr_url}")
    body_lines.extend(
        [
            f"GitHub Actions：{run_url}",
            "",
            "本次月报包含：",
            "- 月报总览：index.md",
            "- 芯片篇：chips.md",
            "- 装载车型篇：vehicles.md",
            "",
            "这封邮件由 GitHub Actions 自动发送。",
        ]
    )

    message = EmailMessage()
    message["Subject"] = f"国内智驾芯片与车型月报已生成：{report_month}"
    message["From"] = env("SMTP_FROM", env("SMTP_USER"))
    message["To"] = env("REPORT_NOTIFY_TO")
    message.set_content("\n".join(body_lines))
    return message


def send_email(message: EmailMessage) -> None:
    host = env("SMTP_HOST")
    port = int(env("SMTP_PORT", "465"))
    user = env("SMTP_USER")
    password = env("SMTP_PASSWORD")
    secure = env("SMTP_SECURE", "true").lower() not in {"0", "false", "no"}

    if secure:
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(host, port, context=context, timeout=30) as server:
            server.login(user, password)
            server.send_message(message)
    else:
        with smtplib.SMTP(host, port, timeout=30) as server:
            server.ehlo()
            server.starttls(context=ssl.create_default_context())
            server.login(user, password)
            server.send_message(message)


def main() -> None:
    if not required_config_present():
        return
    send_email(build_message())
    print(f"Email notification sent to {env('REPORT_NOTIFY_TO')}")


if __name__ == "__main__":
    main()
