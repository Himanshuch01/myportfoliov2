import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Himanshuch01";

function buildHeaders(token: string): Record<string, string> {
  const base: Record<string, string> = {
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+json",
  };
  if (token) base["Authorization"] = `Bearer ${token}`;
  return base;
}

async function ghFetch(path: string, token: string) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: buildHeaders(token),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} → ${path}`);
  return res.json();
}

async function ghGraphQL(query: string, variables: Record<string, unknown>, token: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...buildHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  return res.json();
}

export async function GET() {
  // Read & trim inside the handler so env is definitely loaded
  const token = (process.env.GITHUB_TOKEN || "").trim();
  const username = (process.env.GITHUB_USERNAME || GITHUB_USERNAME).trim();

  console.log(`[GitHub API] token set: ${!!token}, username: ${username}`);

  try {
    // 1. User profile
    const user = await ghFetch(`/users/${username}`, token);

    // 2. Top repos sorted by stars
    const repos: any[] = await ghFetch(
      `/users/${username}/repos?sort=stars&direction=desc&per_page=20&type=owner`,
      token,
    );

    // 3. Top 4 non-fork repos
    const featured = repos
      .filter((r: any) => !r.fork)
      .slice(0, 4)
      .map((r: any) => ({
        name: r.name,
        description: r.description || "No description provided.",
        language: r.language || "Unknown",
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        updatedAt: r.pushed_at,
      }));

    // 4. Contribution calendar via GraphQL (requires token)
    let contributionWeeks: any[] = [];
    let totalContributions = 0;

    if (token) {
      try {
        const { data: gqlData } = await ghGraphQL(`
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `, { login: username }, token);

        const cal = gqlData?.user?.contributionsCollection?.contributionCalendar;
        contributionWeeks = cal?.weeks ?? [];
        totalContributions = cal?.totalContributions ?? 0;
      } catch (gqlErr: any) {
        console.warn("[GitHub API] GraphQL failed:", gqlErr.message);
      }
    }

    // 5. Recent push events
    const events: any[] = await ghFetch(
      `/users/${username}/events/public?per_page=30`,
      token,
    );

    const activityMap: Record<string, { commits: number; pushedAt: string }> = {};
    for (const ev of events) {
      if (ev.type !== "PushEvent") continue;
      const name = ev.repo.name.split("/")[1];
      activityMap[name] ??= { commits: 0, pushedAt: ev.created_at };
      activityMap[name].commits += ev.payload?.commits?.length ?? 0;
      if (ev.created_at > activityMap[name].pushedAt)
        activityMap[name].pushedAt = ev.created_at;
    }
    const recentActivity = Object.entries(activityMap)
      .sort(([, a], [, b]) => b.pushedAt.localeCompare(a.pushedAt))
      .slice(0, 5)
      .map(([repo, v]) => ({ repo, commits: v.commits, pushedAt: v.pushedAt }));

    // 6. Language breakdown
    const LANG_COLORS: Record<string, string> = {
      JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
      "C++": "#f34b7d", Java: "#b07219", PHP: "#4F5D95",
      HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
    };
    const langCounts: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
    const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const languageBreakdown = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
        color: LANG_COLORS[name] || "#6366f1",
      }));

    return NextResponse.json({
      stats: {
        totalRepos: user.public_repos,
        followers: user.followers,
        totalContributions,
        starsEarned: repos.reduce((s: number, r: any) => s + r.stargazers_count, 0),
      },
      featured,
      recentActivity,
      languageBreakdown,
      contributionWeeks,
    });
  } catch (err: any) {
    console.error("[GitHub API] Fatal:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
