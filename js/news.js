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
        text: "Won the T-Shirt Design Competition hosted by the APS Division of Statistical and Nonlinear Physics (DSNP).",
        detail: "Won the T-Shirt Design Competition organized by the Division of Statistical and Nonlinear Physics (DSNP) of the American Physical Society (APS).",
        link: "https://engage.aps.org/dsnp/resources/tee-competition",
        linkText: "View competition"
    }
];
