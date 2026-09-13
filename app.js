/**
 * Personalized Price Disclosure Card — paste merchant + UI disclosure chip + view date
 * → FTC proposed 3-part checklist score + days until Sep 25 2026 comment deadline.
 * Brand: Personalized Price Disclosure Card only. User-pasted chips; no merchant scrape.
 * Never invents a “true” price or alleges a named merchant violated Section 5.
 * Proposed policy literacy only — not a final rule. Not legal advice.
 */
(function () {
  "use strict";

  const FTC_PDF =
    "https://www.ftc.gov/system/files/ftc_gov/pdf/p034101-ftc-enforcement-policy-statement-re-personalized-pricing-proposed-for-public-comment.pdf";
  const FTC_PRESS =
    "https://www.ftc.gov/news-events/news/press-releases/2026/09/ftc-extends-public-comment-proposed-policy-statement-regarding-personalized-pricing";
  const FTC_LIBRARY =
    "https://www.ftc.gov/legal-library/browse/federal-trade-commissions-proposed-enforcement-policy-statement-regarding-personalized-pricing";
  const REGS = "https://www.regulations.gov/";
  const FTC_REPORT = "https://reportfraud.ftc.gov/";

  const DEADLINE_ISO = "2026-09-25";
  const WINDOW_OPEN_ISO = "2026-08-19";
  const DEADLINE_LABEL = "Sep 25 2026";
  const POLICY_LABEL = "Proposed · not final";

  const CITE_ONE_LINER =
    "FTC Aug 19 2026 proposed Enforcement Policy Statement: where consumers reasonably expect non-personalized prices, businesses should clearly and conspicuously disclose (1) that the price is personalized, (2) the basis for personalization, and (3) the types of data used; failure “likely to constitute” a Section 5 unfair/deceptive practice; “specially selected” alone called likely misleading. Sep 3 2026 press: comment deadline Sept. 25, 2026. Proposed — not a final rule. FTC does not claim authority to ban personalized pricing outright. Comment path: ftc.gov / regulations.gov. Scams: ReportFraud.ftc.gov. Not legal advice. We never invent your “true” price or allege a named merchant violated Section 5.";

  const TRIAD = [
    {
      id: "personalized",
      label: "Disclose that the price is personalized",
    },
    {
      id: "basis",
      label: "Disclose the basis for personalization",
    },
    {
      id: "data",
      label: "Disclose the types of data used",
    },
  ];

  /** Teaching seeds — labeled UI shapes. Not live merchant scrapes. */
  const SEEDS = [
    {
      id: "hotel-special",
      label: "Hotel · specially selected · 0/3",
      sub: "Teaching · “specially selected” alone · incomplete strip",
      merchant: "hotel",
      disclosure: "specially_selected",
      viewDate: "2026-09-13",
      noteLabel: "Hotel · specially selected teaching seed",
    },
    {
      id: "food-none",
      label: "Food delivery · no disclosure · 0/3",
      sub: "Teaching · zero disclosure chips",
      merchant: "food_delivery",
      disclosure: "none",
      viewDate: "2026-09-13",
      noteLabel: "Food delivery · no disclosure teaching seed",
    },
    {
      id: "rideshare-1",
      label: "Rideshare · personalized · 1/3",
      sub: "Teaching · said personalized · missing basis + data types",
      merchant: "rideshare",
      disclosure: "personalized_no_basis",
      viewDate: "2026-09-13",
      noteLabel: "Rideshare · personalized-only teaching seed",
    },
    {
      id: "retail-full",
      label: "Retail · full triad · 3/3",
      sub: "Teaching · personalized + basis + data types",
      merchant: "retail",
      disclosure: "full",
      viewDate: "2026-09-13",
      noteLabel: "Retail · full triad teaching seed",
    },
    {
      id: "grocery-cliff",
      label: "Grocery · unsure · comment cliff",
      sub: "Teaching · unsure chip · Sep 25 due-today",
      merchant: "grocery_delivery",
      disclosure: "unsure",
      viewDate: "2026-09-25",
      noteLabel: "Grocery · comment-deadline teaching seed",
    },
  ];

  const $ = (id) => document.getElementById(id);

  function parseISODate(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const parts = s.split("-").map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (
      d.getFullYear() !== parts[0] ||
      d.getMonth() !== parts[1] - 1 ||
      d.getDate() !== parts[2]
    ) {
      return null;
    }
    return d;
  }

  function fmtDate(d) {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function isoFromDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayISO() {
    return isoFromDate(new Date());
  }

  /**
   * Whole calendar days from view date (local) to Sep 25 2026.
   * Sep 13 → 12; Sep 25 → 0 (due today); Sep 26 → -1 (closed).
   */
  function daysUntilDeadline(viewDate) {
    const deadline = parseISODate(DEADLINE_ISO);
    const a = Date.UTC(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      viewDate.getDate()
    );
    const b = Date.UTC(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate()
    );
    return Math.round((b - a) / 86400000);
  }

  function windowSpanDays() {
    const open = parseISODate(WINDOW_OPEN_ISO);
    const close = parseISODate(DEADLINE_ISO);
    const a = Date.UTC(open.getFullYear(), open.getMonth(), open.getDate());
    const b = Date.UTC(close.getFullYear(), close.getMonth(), close.getDate());
    return Math.round((b - a) / 86400000);
  }

  function windowMeta(daysLeft) {
    if (daysLeft > 0) {
      return {
        phase: "open",
        headline:
          daysLeft === 1
            ? "1 day until comments close"
            : daysLeft + " days until comments close",
        daysLabel:
          daysLeft === 1 ? "1 day left" : daysLeft + " days left",
        ringLabel: String(daysLeft),
        deadlineSub: "Public comments due " + DEADLINE_LABEL,
      };
    }
    if (daysLeft === 0) {
      return {
        phase: "due_today",
        headline: "Comments due TODAY — Sep 25 2026",
        daysLabel: "DUE TODAY",
        ringLabel: "DUE",
        deadlineSub: "Comment deadline " + DEADLINE_LABEL,
      };
    }
    return {
      phase: "closed",
      headline: "Comment window closed — proposed-policy literacy",
      daysLabel: "CLOSED",
      ringLabel: "CLOSED",
      deadlineSub: "Deadline was " + DEADLINE_LABEL,
    };
  }

  function merchantMeta(flag) {
    const map = {
      hotel: "Hotel",
      food_delivery: "Food delivery",
      grocery_delivery: "Grocery delivery",
      rideshare: "Rideshare",
      retail: "Retail",
      other: "Other / unspecified",
    };
    return map[flag] || map.other;
  }

  /**
   * Checklist completeness from user disclosure chip vs hardcoded FTC triad.
   * Never invents a Section 5 allegation about a named merchant.
   */
  function disclosureMeta(flag) {
    if (flag === "none") {
      return {
        score: 0,
        scoreLabel: "0/3",
        short: "No disclosure",
        pill: "0/3 disclosure",
        sub: "No personalization disclosure recalled",
        cls: "danger",
        speciallySelected: false,
        checks: [false, false, false],
        checkMode: "bool",
        decoder:
          "You marked no disclosure. Against the FTC’s proposed triad this card scores 0/3 — literacy only. We do not invent that any merchant violated Section 5, and we never invent your “true” price.",
      };
    }
    if (flag === "specially_selected") {
      return {
        score: 0,
        scoreLabel: "0/3",
        short: "“Specially selected” only",
        pill: "0/3 · specially selected ≠ enough",
        sub: "FTC: “specially selected” alone likely misleading",
        cls: "danger",
        speciallySelected: true,
        checks: [false, false, false],
        checkMode: "bool",
        decoder:
          "You marked “specially selected” alone. The FTC’s proposed statement calls that phrasing alone likely misleading — incomplete vs the three-part checklist. Score 0/3. This is proposed-policy literacy, not a finding that a named merchant violated Section 5.",
      };
    }
    if (flag === "personalized_no_basis") {
      return {
        score: 1,
        scoreLabel: "1/3",
        short: "Personalized · no basis/data",
        pill: "1/3 disclosure",
        sub: "Said personalized · missing basis + data types",
        cls: "warn",
        speciallySelected: false,
        checks: [true, false, false],
        checkMode: "bool",
        decoder:
          "You marked that the UI said the price was personalized but without basis or data-type disclosure. Against the proposed triad that is 1/3. We do not invent the missing basis or data types, and we do not allege a Section 5 violation.",
      };
    }
    if (flag === "full") {
      return {
        score: 3,
        scoreLabel: "3/3",
        short: "Full triad",
        pill: "3/3 disclosure",
        sub: "Personalized + basis + data types (your chip)",
        cls: "ok",
        speciallySelected: false,
        checks: [true, true, true],
        checkMode: "bool",
        decoder:
          "You marked a full three-part disclosure (personalized · basis · data types). Score 3/3 vs the proposed checklist. This card still does not verify the merchant’s live UI, invent a “true” price, or predict enforcement.",
      };
    }
    // unsure
    return {
      score: null,
      scoreLabel: "?/3",
      short: "Unsure",
      pill: "?/3 · unsure",
      sub: "Didn’t notice · we will not invent a score",
      cls: "unsure",
      speciallySelected: false,
      checks: ["unsure", "unsure", "unsure"],
      checkMode: "unsure",
      decoder:
        "You marked unsure / didn’t notice. We will not invent which triad elements were on the screen. The Sep 25 comment clock and proposed-policy checklist still apply as public literacy.",
    };
  }

  function actionMeta(win, disc) {
    if (win.phase === "open" || win.phase === "due_today") {
      return (
        "Calm next step: read the FTC Aug 19 proposed statement (PDF) and the Sep 3 press release; submit a public comment via ftc.gov / regulations.gov before " +
        DEADLINE_LABEL +
        ". For scams (not pricing-policy comments), use ReportFraud.ftc.gov. Not legal advice. We never invent a Section 5 claim about a named merchant."
      );
    }
    return (
      "Calm next step: comment window closed after " +
      DEADLINE_LABEL +
      ". Keep the proposed triad as literacy (personalized · basis · data types). Watch ftc.gov for any final statement. ReportFraud.ftc.gov for scams. Not legal advice."
    );
  }

  function readInputs() {
    return {
      merchant: $("merchant").value || "other",
      disclosure: $("disclosure").value || "unsure",
      viewDate: ($("viewDate").value || "").trim(),
      noteLabel: ($("noteLabel").value || "").trim(),
    };
  }

  function applyInputs(p) {
    $("merchant").value = p.merchant || "other";
    $("disclosure").value = p.disclosure || "unsure";
    $("viewDate").value = p.viewDate || "";
    $("noteLabel").value = p.noteLabel || "";
  }

  function validate(input) {
    const d = parseISODate(input.viewDate);
    if (!d) {
      return "Pick a view date (the day you’re looking) — the Sep 25 countdown needs it. We will not invent days left.";
    }
    return null;
  }

  function compute(input) {
    const viewDate = parseISODate(input.viewDate);
    const daysLeft = daysUntilDeadline(viewDate);
    const win = windowMeta(daysLeft);
    const disc = disclosureMeta(input.disclosure);
    const merchant = merchantMeta(input.merchant);
    const span = windowSpanDays();
    let pct = 0;
    if (win.phase === "closed") {
      pct = 100;
    } else if (win.phase === "due_today") {
      pct = 100;
    } else {
      pct = Math.max(2, Math.min(100, Math.round((daysLeft / span) * 100)));
    }
    return {
      viewDate: viewDate,
      daysLeft: daysLeft,
      win: win,
      disc: disc,
      merchant: merchant,
      pct: pct,
      span: span,
      action: actionMeta(win, disc),
    };
  }

  function encodeHash(input) {
    const parts = [
      input.merchant || "other",
      input.disclosure || "unsure",
      input.viewDate || "",
      input.noteLabel || "",
    ];
    const raw = parts.join("|");
    try {
      return "#p=" + btoa(unescape(encodeURIComponent(raw)));
    } catch (e) {
      return "#p=" + encodeURIComponent(raw);
    }
  }

  function decodeHash() {
    const raw = location.hash || "";
    if (!raw.startsWith("#p=")) return null;
    try {
      let decoded;
      try {
        decoded = decodeURIComponent(escape(atob(raw.slice(3))));
      } catch (e) {
        decoded = decodeURIComponent(raw.slice(3));
      }
      const parts = decoded.split("|");
      if (parts.length < 3 || !parts[2]) return null;
      return {
        merchant: parts[0] || "other",
        disclosure: parts[1] || "unsure",
        viewDate: parts[2] || "",
        noteLabel: parts[3] || "",
      };
    } catch (e) {
      return null;
    }
  }

  function renderChips() {
    const box = $("seedChips");
    box.innerHTML = "";
    SEEDS.forEach((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "seed-chip";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        s.label + '<span class="chip-sub">' + s.sub + "</span>";
      btn.addEventListener("click", () => {
        applyInputs(s);
        $("status").textContent = "Loaded seed: " + s.label;
        renderCard();
      });
      box.appendChild(btn);
    });
  }

  function renderSources() {
    $("sourceLinks").innerHTML =
      'Cites: <a href="' +
      FTC_PDF +
      '" target="_blank" rel="noopener noreferrer">FTC Aug 19 2026 PDF</a>' +
      '<a href="' +
      FTC_PRESS +
      '" target="_blank" rel="noopener noreferrer">FTC Sep 3 2026 press</a>' +
      '<a href="' +
      FTC_LIBRARY +
      '" target="_blank" rel="noopener noreferrer">FTC legal library</a>' +
      '<a href="' +
      REGS +
      '" target="_blank" rel="noopener noreferrer">regulations.gov</a>' +
      '<a href="' +
      FTC_REPORT +
      '" target="_blank" rel="noopener noreferrer">ReportFraud.ftc.gov</a>';
  }

  function checkLabel(i, state) {
    const base = TRIAD[i].label;
    if (state === "unsure") {
      return "❓ " + base + " — unsure (not invented)";
    }
    if (state === true) {
      return "✓ " + base;
    }
    return "✗ " + base + " — not disclosed (your chip)";
  }

  function renderCard() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("cardSection").hidden = true;
      $("status").textContent = err;
      return;
    }

    const c = compute(input);
    $("cardSection").hidden = false;
    $("shareBox").hidden = false;
    $("status").textContent = "Card ready — copy, share, or export PNG.";

    const metaBits = [];
    metaBits.push(c.merchant);
    metaBits.push(c.disc.short);
    if (input.noteLabel) metaBits.push(input.noteLabel);
    $("cardMeta").textContent = metaBits.join(" · ");

    $("dlHeadline").textContent = c.win.headline;
    $("statusPill").textContent = c.disc.pill;
    $("statusPill").className = "verdict-k " + c.disc.cls;
    $("statusSub").textContent = c.disc.sub + " · proposed · not final";

    $("scoreDisp").textContent = c.disc.scoreLabel;
    $("scoreDisp").className = "hero-value " + c.disc.cls;
    $("daysDisp").textContent = c.win.daysLabel;
    $("deadlineLine").textContent = c.win.deadlineSub;

    $("daysRingDisp").textContent = c.win.ringLabel;
    $("daysRing").style.setProperty("--pct", String(c.pct));
    if (c.win.phase === "closed") {
      $("daysRing").className = "fee-ring empty";
    } else if (
      c.win.phase === "due_today" ||
      (c.daysLeft > 0 && c.daysLeft <= 7)
    ) {
      $("daysRing").className = "fee-ring danger";
    } else if (c.disc.cls === "ok") {
      $("daysRing").className = "fee-ring ok";
    } else {
      $("daysRing").className = "fee-ring";
    }

    const windowEl = $("windowLine");
    if (c.win.phase === "closed") {
      windowEl.className = "hero-sub flat";
      windowEl.textContent =
        "Comment window closed · proposed-policy literacy only";
    } else if (c.win.phase === "due_today") {
      windowEl.className = "hero-sub danger";
      windowEl.textContent = "Last day for public comments · Sep 25 2026";
    } else {
      windowEl.className =
        c.daysLeft <= 7 ? "hero-sub danger" : "hero-sub warn";
      windowEl.textContent =
        c.daysLeft +
        " of " +
        c.span +
        " days remain in the Aug 19 proposal → Sep 25 comment window";
    }

    const flag = $("actionFlag");
    if (c.disc.speciallySelected) {
      flag.textContent =
        "SPECIALLY SELECTED ≠ ENOUGH · proposed FTC triad incomplete · 0/3 · proposed · not a final rule";
      flag.className = "look-enroll-flag danger";
    } else if (c.disc.score === 3) {
      flag.textContent =
        "FULL TRIAD (YOUR CHIP) · 3/3 · proposed policy literacy · not a final rule · not a Section 5 finding";
      flag.className = "look-enroll-flag ok";
    } else if (c.disc.score === null) {
      flag.textContent =
        "UNSURE · we will not invent checklist marks · Sep 25 clock still applies · proposed · not final";
      flag.className = "look-enroll-flag unsure";
    } else if (c.disc.score === 0) {
      flag.textContent =
        "0/3 DISCLOSURE · proposed triad incomplete · not a Section 5 allegation · proposed · not final";
      flag.className = "look-enroll-flag danger";
    } else {
      flag.textContent =
        c.disc.scoreLabel +
        " DISCLOSURE · proposed triad incomplete · not a Section 5 allegation · proposed · not final";
      flag.className = "look-enroll-flag warn";
    }

    for (let i = 0; i < 3; i++) {
      $("check" + (i + 1)).textContent = checkLabel(i, c.disc.checks[i]);
    }

    $("rMerchant").textContent = c.merchant;
    $("rDisclosure").textContent = c.disc.short;
    $("rDeadline").textContent = DEADLINE_LABEL;
    $("rPolicy").textContent = POLICY_LABEL;

    $("decoderLine").textContent = c.disc.decoder;
    $("actionLine").textContent = c.action;
    $("citeLine").textContent = CITE_ONE_LINER;

    const hash = encodeHash(input);
    if (location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
    $("shareUrl").value = location.href.split("#")[0] + hash;
  }

  function clearAll() {
    applyInputs({
      merchant: "hotel",
      disclosure: "unsure",
      viewDate: todayISO(),
      noteLabel: "",
    });
    $("cardSection").hidden = true;
    $("shareBox").hidden = true;
    $("status").textContent = "Cleared.";
    history.replaceState(null, "", location.pathname + location.search);
  }

  function summaryText() {
    const input = readInputs();
    const err = validate(input);
    if (err) return err;
    const c = compute(input);
    const lines = [
      "Personalized Price Disclosure Card",
      "Merchant: " + c.merchant,
      "UI said: " + c.disc.short,
      "Score vs proposed triad: " + c.disc.scoreLabel,
      "Countdown: " + c.win.daysLabel + " · " + c.win.deadlineSub,
      "Policy status: " + POLICY_LABEL,
      "",
      "Proposed checklist:",
      checkLabel(0, c.disc.checks[0]),
      checkLabel(1, c.disc.checks[1]),
      checkLabel(2, c.disc.checks[2]),
      "",
      c.disc.decoder,
      c.action,
      "",
      CITE_ONE_LINER,
      "Not legal advice. Proposed — not a final rule. Never invents a “true” price or a Section 5 allegation.",
    ];
    return lines.filter((x) => x != null).join("\n");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summaryText());
      $("status").textContent = "Summary copied.";
    } catch (e) {
      $("status").textContent = "Copy failed — select share URL instead.";
    }
  }

  async function shareLink() {
    renderCard();
    const url = $("shareUrl").value;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Personalized Price Disclosure Card",
          text: "Does this checkout clear the FTC’s proposed 3-part personalized pricing checklist? Comments due Sep 25 2026.",
          url: url,
        });
        $("status").textContent = "Share sheet opened.";
      } else {
        await navigator.clipboard.writeText(url);
        $("status").textContent = "Share link copied.";
      }
    } catch (e) {
      $("status").textContent = "Share cancelled or unavailable.";
    }
  }

  async function copyShare() {
    try {
      await navigator.clipboard.writeText($("shareUrl").value);
      $("status").textContent = "Share URL copied.";
    } catch (e) {
      $("status").textContent = "Copy failed.";
    }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = String(text || "").split(/\s+/);
    let line = "";
    let yy = y;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, yy);
        line = words[i];
        yy += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, yy);
      yy += lineHeight;
    }
    return yy;
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function exportPng() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("status").textContent = err;
      return;
    }
    const c = compute(input);
    const canvas = $("pngCanvas");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "rgba(126,184,232,0.14)");
    g.addColorStop(0.55, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(240,180,41,0.10)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#121820";
    roundRect(ctx, 36, 36, W - 72, H - 72, 18);
    ctx.fill();
    ctx.strokeStyle = "#2e3a48";
    ctx.lineWidth = 2;
    ctx.stroke();

    let y = 78;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "700 14px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("PERSONALIZED PRICE DISCLOSURE CARD", 64, y);

    y += 28;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 13px IBM Plex Mono, monospace";
    ctx.fillText(
      c.merchant +
        " · " +
        c.disc.scoreLabel +
        " · " +
        fmtDate(c.viewDate) +
        " · Sep 25 comments",
      64,
      y
    );

    y += 52;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "700 40px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText(c.disc.scoreLabel + "  ·  " + c.win.daysLabel, 64, y);

    const chipX = W - 300;
    const chipY = 96;
    const chipFill =
      c.disc.cls === "ok"
        ? "rgba(62,207,142,0.14)"
        : c.disc.cls === "danger"
          ? "rgba(240,113,120,0.12)"
          : c.disc.cls === "warn"
            ? "rgba(240,180,41,0.12)"
            : "rgba(139,154,171,0.12)";
    const chipStroke =
      c.disc.cls === "ok"
        ? "#3ecf8e"
        : c.disc.cls === "danger"
          ? "#f07178"
          : c.disc.cls === "warn"
            ? "#f0b429"
            : "#8b9aab";
    ctx.fillStyle = chipFill;
    roundRect(ctx, chipX, chipY, 220, 56, 12);
    ctx.fill();
    ctx.strokeStyle = chipStroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = chipStroke;
    ctx.font = "700 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText(c.disc.pill.slice(0, 28), chipX + 14, chipY + 24);
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 11px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("Proposed · not a final rule", chipX + 14, chipY + 44);

    y += 36;
    if (c.disc.speciallySelected) {
      ctx.fillStyle = "rgba(240,113,120,0.12)";
      roundRect(ctx, 64, y - 18, W - 128, 40, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(240,113,120,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#f07178";
      ctx.font = "700 13px IBM Plex Sans, system-ui, sans-serif";
      ctx.fillText(
        "SPECIALLY SELECTED ≠ ENOUGH  ·  incomplete vs proposed triad",
        78,
        y + 8
      );
      y += 44;
    }

    y += 18;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "700 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("PROPOSED DISCLOSURE CHECKLIST (FTC AUG 19 2026)", 64, y);
    y += 28;
    ctx.font = "500 15px IBM Plex Sans, system-ui, sans-serif";
    for (let i = 0; i < 3; i++) {
      const st = c.disc.checks[i];
      ctx.fillStyle =
        st === true ? "#3ecf8e" : st === "unsure" ? "#8b9aab" : "#f07178";
      y = wrapText(ctx, checkLabel(i, st), 64, y, W - 128, 22);
      y += 8;
    }

    y += 16;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "400 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.disc.decoder, 64, y, W - 128, 20);
    y += 12;
    ctx.fillStyle = "#8b9aab";
    y = wrapText(ctx, c.action, 64, y, W - 128, 18);
    y += 14;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "400 12px IBM Plex Mono, monospace";
    y = wrapText(
      ctx,
      "Cite: FTC Aug 19 PDF · Sep 3 press (Sep 25 deadline) · regulations.gov · ReportFraud.ftc.gov",
      64,
      y,
      W - 128,
      16
    );

    ctx.fillStyle = "#f0b429";
    ctx.font = "700 13px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText(
      "PROPOSED POLICY — comments due Sep 25 2026 · NOT A FINAL RULE",
      64,
      H - 88
    );
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 12px IBM Plex Mono, monospace";
    ctx.fillText(
      "Not legal advice · no scrape · no “true” price · no Section 5 allegation invented",
      64,
      H - 56
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        $("status").textContent = "PNG export failed.";
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download =
        "personalized-price-disclosure-" +
        input.viewDate +
        "-" +
        (input.disclosure || "unsure") +
        ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      $("status").textContent = "PNG downloaded.";
    });
  }

  function bind() {
    if (!$("viewDate").value) $("viewDate").value = todayISO();
    renderChips();
    renderSources();

    $("cardBtn").addEventListener("click", renderCard);
    $("clearBtn").addEventListener("click", clearAll);
    $("copySummary").addEventListener("click", copySummary);
    $("shareBtn").addEventListener("click", shareLink);
    $("copyShare").addEventListener("click", copyShare);
    $("pngBtn").addEventListener("click", exportPng);

    window.addEventListener("hashchange", () => {
      const p = decodeHash();
      if (p) {
        applyInputs(p);
        renderCard();
      }
    });

    const fromHash = decodeHash();
    if (fromHash) {
      applyInputs(fromHash);
      renderCard();
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind);
    } else {
      bind();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      daysUntilDeadline: daysUntilDeadline,
      windowMeta: windowMeta,
      disclosureMeta: disclosureMeta,
      merchantMeta: merchantMeta,
      parseISODate: parseISODate,
      DEADLINE_ISO: DEADLINE_ISO,
      SEEDS: SEEDS,
      TRIAD: TRIAD,
    };
  }
})();
