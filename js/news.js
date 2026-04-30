// Single source of truth for news items.
// Add new items at the TOP of the array.
// `date`     — short label shown on cards (e.g. "Apr 2026")
// `sortKey`  — YYYY-MM, used only if you want to re-sort programmatically
// `text`     — one-line summary used on the homepage
// `detail`   — fuller description used on the News & Media page (optional; falls back to `text`)
// `link`     — optional URL
// `linkText` — optional anchor text for the link (defaults to "Learn more")
const newsItems = [
    {
        date: "Apr 2026",
        sortKey: "2026-04",
        text: "Placeholder news item #1 — most recent.",
        detail: "Placeholder news item #1 — most recent. Replace this with the full description of the news item, including context, venue, collaborators, or links as appropriate.",
        link: null,
        linkText: null
    },
    {
        date: "Mar 2026",
        sortKey: "2026-03",
        text: "Placeholder news item #2.",
        detail: "Placeholder news item #2. Replace this with the full description.",
        link: null,
        linkText: null
    },
    {
        date: "Feb 2026",
        sortKey: "2026-02",
        text: "Placeholder news item #3.",
        detail: "Placeholder news item #3. Replace this with the full description.",
        link: null,
        linkText: null
    },
    {
        date: "Jan 2026",
        sortKey: "2026-01",
        text: "Placeholder news item #4.",
        detail: "Placeholder news item #4. Replace this with the full description.",
        link: null,
        linkText: null
    },
    {
        date: "Dec 2025",
        sortKey: "2025-12",
        text: "Placeholder news item #5.",
        detail: "Placeholder news item #5. Replace this with the full description.",
        link: null,
        linkText: null
    },
    {
        date: "Nov 2025",
        sortKey: "2025-11",
        text: "Placeholder news item #6 — appears only on the News & Media page, not on the homepage.",
        detail: "Placeholder news item #6. This one is intentionally beyond the homepage's 5-item cap so we can verify that the homepage truncation works correctly while the archive shows everything.",
        link: null,
        linkText: null
    }
];
