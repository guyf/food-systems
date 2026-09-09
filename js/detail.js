/* detail.js — when a plant is chosen the top of the scene splits in two:
 * left "Today", right "Opportunity". No cards, no boxes — a title and text.
 * Reacts to  area:select / area:clear / scene:enter / mode:change.
 * Emits  area:clear  (the "back to the field" control). */
(function (FS) {
  "use strict";

  var host, mode = "explore", isOpen = false, hideTimer = 0;

  function groupLabel(groupId) {
    var g = (FS.groups || []).find(function (x) { return x.id === groupId; });
    return g ? g.label : "";
  }

  function side(kind, block) {
    var isToday = kind === "today";
    var sec = FS.h("section", { "class": "fs-side fs-side--" + (isToday ? "today" : "opp") });
    sec.appendChild(FS.h("h3", { "class": "fs-side-title", text: isToday ? "Today" : "Opportunity" }));
    if (block && block.headline) {
      sec.appendChild(FS.h("p", { "class": "fs-side-lead", text: block.headline }));
    }
    ((block && block.points) || []).forEach(function (pt) {
      var para = FS.h("p", { "class": "fs-para" }, pt.text);
      if (pt.stat) {
        para.appendChild(document.createTextNode(" "));
        para.appendChild(FS.h("span", { "class": "fs-figure",
          text: pt.stat.value + " " + pt.stat.unit }));
      }
      sec.appendChild(para);
    });
    return sec;
  }

  function sourcesList(sources) {
    if (!sources || !sources.length) return null;
    var ul = FS.h("ul", { "class": "fs-sources" });
    sources.forEach(function (s) {
      var inner = s.url
        ? FS.h("a", { href: s.url, target: "_blank", rel: "noopener", text: s.cite })
        : document.createTextNode(s.cite);
      ul.appendChild(FS.h("li", {}, inner));
    });
    return FS.h("div", { "class": "fs-sources-wrap" }, FS.h("h4", { text: "Sources" }), ul);
  }

  function view(area, opts) {
    var emph = opts.compare === "harm" ? "emph-today"
             : opts.compare === "opportunity" ? "emph-opp" : "";
    var wrap = FS.h("article", { "class": "fs-detail-inner " + emph });

    wrap.appendChild(FS.h("button", {
      "class": "fs-detail-back", type: "button", "data-close": "true",
      text: "‹ Back to the field"
    }));

    wrap.appendChild(FS.h("div", { "class": "fs-detail-head" },
      FS.h("p", { "class": "fs-eyebrow", text: groupLabel(area.group) }),
      FS.h("h2", { "class": "fs-detail-title", text: area.label }),
      area.summary ? FS.h("p", { "class": "fs-detail-summary", text: area.summary }) : null
    ));

    wrap.appendChild(FS.h("div", { "class": "fs-split" },
      side("today", area.harm),
      side("opp", area.opportunity)
    ));

    if (area.shift) {
      wrap.appendChild(FS.h("p", { "class": "fs-shift" },
        FS.h("span", { "class": "fs-shift-tag", text: "The shift" }), area.shift));
    }

    var src = sourcesList(area.sources);
    if (src) wrap.appendChild(src);

    return wrap;
  }

  function open(id, opts) {
    opts = opts || {};
    var area = (FS.areas || []).find(function (a) { return a.id === id; });
    if (!area) return;

    clearTimeout(hideTimer);
    host.textContent = "";
    host.appendChild(view(area, opts));
    host.hidden = false;
    host.scrollTop = 0;
    isOpen = true;
    document.body.classList.add("detail-open");

    FS.nextFrame(function () {
      host.classList.add("is-open");
      if (!opts.quiet && mode !== "movie") {
        var btn = host.querySelector("[data-close]");
        if (btn) btn.focus();
      }
    });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    host.classList.remove("is-open");
    document.body.classList.remove("detail-open");
    clearTimeout(hideTimer);
    hideTimer = FS.delay(360, function () { if (!isOpen) host.hidden = true; });
  }

  function init() {
    host = FS.$("#detail");
    if (!host) return;

    host.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) {
        FS.bus.emit("area:clear", { source: "detail" });
      }
    });

    FS.bus.on("area:select", function (d) { open(d.id, {}); });
    FS.bus.on("area:clear", function () { close(); });

    FS.bus.on("mode:change", function (d) {
      mode = d.mode;
      if (mode !== "movie") close();
    });

    FS.bus.on("scene:enter", function (d) {
      var s = d.scene;
      if (s.areaId) open(s.areaId, { compare: s.compare || null, quiet: true });
      else close();
    });
  }

  FS.Detail = { init: init };
})(window.FS);
