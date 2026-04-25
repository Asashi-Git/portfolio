/* ═══════════════════════════════════════════════
   SAMUEL DECARNELLE — PORTFOLIO
   js/terminal.js
   ───────────────────────────────────────────────
   Interactive virtual terminal.
   The filesystem is built automatically from:
     - data/projects.js   → /projects/
     - data/terminal.js   → /certifications/ /skills/ /contact/
   To add content, update those data files only.
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ════════════════════════════════════════════
       SECTION 1 — STATIC CONTENT DATA
    ════════════════════════════════════════════ */

    const CONTACT_FILES = {
        "email.txt": {
            content: "samueldecarnelle@gmail.com",
            redirect: "mailto:samueldecarnelle@gmail.com",
            redirectLabel: "Opening your mail client..."
        },
        "github.txt": {
            content: "https://github.com/Asashi-Git",
            redirect: "https://github.com/Asashi-Git",
            redirectLabel: "Redirecting to GitHub..."
        },
        "tryhackme.txt": {
            content: "https://tryhackme.com/p/Asashii",
            redirect: "https://tryhackme.com/p/Asashii",
            redirectLabel: "Redirecting to TryHackMe..."
        },
        "linkedin.txt": {
            content: "https://linkedin.com/in/samuel-decarnelle",
            redirect: "https://linkedin.com/in/samuel-decarnelle",
            redirectLabel: "Redirecting to LinkedIn..."
        }
    };

    const SKILLS_FILES = {
        "systems.txt":    `Linux (Arch, Debian, Ubuntu)\nWindows Server 2022 / 2025\nProxmox · VMware · QEMU · KVM · Docker\nPfSense · Zabbix · Wazuh · Graylog · Suricata · Shuffle`,
        "networking.txt": `VLANs · OSPFv2 · VRRP\nCisco Packet Tracer · GNS3\nZero Trust Architecture\nNetwork segmentation (Management, DMZ, Production, Pre-Production)`,
        "offensive.txt":  `DVWA · OWASP Juice Shop · Metasploitable\nVulnerability assessment\nCTF — Web · Network · Forensics\nPenetration testing methodology`,
        "scripting.txt":  `Bash · Python · PowerShell\nC · PHP · HTML · CSS · JavaScript\nAPI consumption · MDE integration`
    };

    const ROOT_FILES = {
        "role.txt": {
            content: "Cybersecurity Student — Penetration Testing"
        },
        "mission.txt": {
            content: "Building enterprise-grade infrastructure to understand,\ntest, and break systems — legally, methodically, and thoroughly."
        }
    };

    /* ════════════════════════════════════════════
       SECTION 2 — VIRTUAL FILESYSTEM BUILDER
    ════════════════════════════════════════════ */

    function buildFilesystem() {
        const fs = {
            "/": {
                type: "dir",
                children: ["projects", "skills", "certifications", "contact",
                           "role.txt", "mission.txt"]
            }
        };

        Object.entries(ROOT_FILES).forEach(([name, data]) => {
            fs["/" + name] = {
                type:          "file",
                content:       data.content,
                redirect:      data.redirect      || null,
                redirectLabel: data.redirectLabel || null
            };
        });

        fs["/projects"] = {
            type:     "dir",
            children: PROJECTS.map(p => p.id + ".txt")
        };

        PROJECTS.forEach(project => {
            const lines = [
                "NAME     : " + project.name,
                "STATUS   : " + project.status,
                "TAGS     : " + project.tags.join(", "),
                "",
                project.summary,
                "",
                project.description
            ].join("\n");

            fs["/projects/" + project.id + ".txt"] = {
                type:          "file",
                content:       lines,
                redirect:      project.link ? project.link.href  : null,
                redirectLabel: project.link ? "Opening project link — " + project.link.label : null
            };
        });

        fs["/skills"] = {
            type:     "dir",
            children: Object.keys(SKILLS_FILES)
        };

        Object.entries(SKILLS_FILES).forEach(([name, content]) => {
            fs["/skills/" + name] = {
                type:     "file",
                content:  content,
                redirect: null
            };
        });

        fs["/certifications"] = {
            type:     "dir",
            children: CERTIFICATIONS.map(c => c.id + ".txt")
        };

        CERTIFICATIONS.forEach(cert => {
            const lines = [
                "LABEL    : " + cert.label,
                "ISSUER   : " + cert.issuer,
                "YEAR     : " + cert.year,
                "STATUS   : " + cert.status
            ].join("\n");

            fs["/certifications/" + cert.id + ".txt"] = {
                type:          "file",
                content:       lines,
                redirect:      cert.link || null,
                redirectLabel: cert.link ? "Redirecting to certification profile..." : null
            };
        });

        fs["/contact"] = {
            type:     "dir",
            children: Object.keys(CONTACT_FILES)
        };

        Object.entries(CONTACT_FILES).forEach(([name, data]) => {
            fs["/contact/" + name] = {
                type:          "file",
                content:       data.content,
                redirect:      data.redirect,
                redirectLabel: data.redirectLabel
            };
        });

        return fs;
    }

    /* ════════════════════════════════════════════
       SECTION 3 — TERMINAL STATE
    ════════════════════════════════════════════ */

    let FS          = {};
    let cwd         = "/";
    let inputLocked = false;

    const HOSTNAME = "samuel@portfolio";

    function getPromptString() {
        const display = cwd === "/" ? "~" : cwd.replace(/^\//, "~·");
        return `<span class="t-prompt">${HOSTNAME}:${display} $</span> `;
    }

    /* ════════════════════════════════════════════
       SECTION 4 — DOM REFERENCES
    ════════════════════════════════════════════ */

    const terminalBody  = document.getElementById('hero-terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalEl    = document.getElementById('hero-terminal');
    const inputWrapper  = document.getElementById('terminal-input-line');

    if (!terminalBody || !terminalInput || !inputWrapper) {
        console.error('Terminal: one or more required DOM elements are missing.');
        console.log('hero-terminal-body :', terminalBody);
        console.log('terminal-input     :', terminalInput);
        console.log('terminal-input-line:', inputWrapper);
        return;
    }

    /* ════════════════════════════════════════════
       SECTION 5 — WIDTH LOCK
    ════════════════════════════════════════════ */

    function lockTerminalWidth() {
        if (!terminalEl) return;
        terminalEl.style.width    = "";
        terminalEl.style.minWidth = "";
        terminalEl.style.maxWidth = "";
        const resolvedWidth = terminalEl.getBoundingClientRect().width;
        if (resolvedWidth > 0) {
            terminalEl.style.width    = resolvedWidth + "px";
            terminalEl.style.minWidth = resolvedWidth + "px";
            terminalEl.style.maxWidth = resolvedWidth + "px";
        }
    }

    window.addEventListener('load', lockTerminalWidth);
    window.addEventListener('resize', lockTerminalWidth);

    /* ════════════════════════════════════════════
       SECTION 6 — OUTPUT HELPERS
    ════════════════════════════════════════════ */

    function print(html, cssClass = "t-output") {
        const line = document.createElement('p');
        line.className = cssClass;
        line.innerHTML = html;
        terminalBody.insertBefore(line, inputWrapper);
        scrollTerminal();
    }

    function printText(text, cssClass = "t-output") {
        text.split("\n").forEach(lineStr => {
            const p = document.createElement('p');
            p.className = cssClass;
            p.textContent = lineStr || "\u00A0";
            terminalBody.insertBefore(p, inputWrapper);
        });
        scrollTerminal();
    }

    function printCommand(cmd) {
        const line = document.createElement('p');
        line.className = "t-line";
        line.innerHTML = getPromptString()
            + `<span class="t-cmd-echo">${escapeHtml(cmd)}</span>`;
        terminalBody.insertBefore(line, inputWrapper);
    }

    function printError(msg) {
        print(`<span style="color:var(--red);">${escapeHtml(msg)}</span>`);
    }

    function printSuccess(msg) {
        print(`<span style="color:var(--green);">${escapeHtml(msg)}</span>`);
    }

    function scrollTerminal() {
        if (terminalEl) terminalEl.scrollTop = terminalEl.scrollHeight;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    /* ════════════════════════════════════════════
       SECTION 7 — PATH RESOLUTION
    ════════════════════════════════════════════ */

    function resolvePath(target) {
        if (!target || target === "~") return "/";
        if (target.startsWith("/")) return normalizePath(target);
        const base = cwd === "/" ? "" : cwd;
        return normalizePath(base + "/" + target);
    }

    function normalizePath(path) {
        const parts  = path.split("/").filter(Boolean);
        const result = [];
        parts.forEach(part => {
            if (part === "..") { result.pop(); }
            else if (part !== ".") { result.push(part); }
        });
        return "/" + result.join("/");
    }

    /* ════════════════════════════════════════════
       SECTION 8 — COMMAND IMPLEMENTATIONS
    ════════════════════════════════════════════ */

    const COMMANDS = {

        whoami() {
            print("Samuel Decarnelle");
        },

        ls(args) {
            const target = args[0] ? resolvePath(args[0]) : cwd;
            const node   = FS[target];

            if (!node) {
                printError(`ls: cannot access '${args[0]}': No such file or directory`);
                return;
            }
            if (node.type === "file") {
                print(escapeHtml(target.split("/").pop()));
                return;
            }

            const items = node.children.map(name => {
            const childPath = target === "/" ? "/" + name : target + "/" + name;
            const childNode = FS[childPath];
            const isDir     = childNode && childNode.type === "dir";
            return isDir
            ? `<span style="color:var(--blue);font-weight:600;">${escapeHtml(name)}/</span>`
            : `<span style="color:var(--text-bright);">${escapeHtml(name)}</span>`;
            });

            print(items.join("&nbsp;&nbsp;&nbsp;"));
        },
 

        cd(args) {
            const target = resolvePath(args[0]);
            const node   = FS[target];

            if (!node) {
                printError(`cd: no such file or directory: ${args[0]}`);
                return;
            }
            if (node.type !== "dir") {
                printError(`cd: not a directory: ${args[0]}`);
                return;
            }

            cwd = target;
            document.getElementById('terminal-prompt').innerHTML =
                getPromptString();
        },

        cat(args) {
            if (!args[0]) {
                printError("cat: missing operand");
                return;
            }

            const target = resolvePath(args[0]);
            const node   = FS[target];

            if (!node) {
                printError(`cat: ${args[0]}: No such file or directory`);
                return;
            }
            if (node.type === "dir") {
                printError(`cat: ${args[0]}: Is a directory`);
                return;
            }

            printText(node.content);

            if (node.redirect) {
                printSuccess(node.redirectLabel || "Opening link...");
                inputLocked = true;
                setTimeout(function () {
                    window.open(node.redirect, "_blank");
                    inputLocked = false;
                }, 1200);
            }
        },

        pwd() {
            print(cwd);
        },

        clear() {
            while (terminalBody.firstChild !== inputWrapper) {
                terminalBody.removeChild(terminalBody.firstChild);
            }
        },

        help() {
            const lines = [
                "<span style='color:var(--green);'>Available commands:</span>",
                "",
                "  <span style='color:var(--blue);'>ls</span>      [path]   — list directory contents",
                "  <span style='color:var(--blue);'>cd</span>      [path]   — change directory",
                "  <span style='color:var(--blue);'>cat</span>     [file]   — read a file",
                "  <span style='color:var(--blue);'>pwd</span>              — print working directory",
                "  <span style='color:var(--blue);'>clear</span>            — clear the terminal",
                "  <span style='color:var(--blue);'>whoami</span>           — identify current user",
                "  <span style='color:var(--blue);'>help</span>             — show this message",
                "",
                "  Paths: use <span style='color:var(--yellow);'>ls</span> to explore, <span style='color:var(--yellow);'>cd /projects</span> to navigate."
            ];
            lines.forEach(l => print(l));
        }
    };

    /* ════════════════════════════════════════════
       SECTION 9 — INPUT HANDLER
    ════════════════════════════════════════════ */

    const cmdHistory = [];
    let   historyIdx = -1;

    function parseAndExecute(raw) {
        const trimmed = raw.trim();
        if (!trimmed) return;

        cmdHistory.unshift(trimmed);
        historyIdx = -1;

        printCommand(trimmed);

        const parts = trimmed.split(/\s+/);
        const cmd   = parts[0].toLowerCase();
        const args  = parts.slice(1);

        if (COMMANDS[cmd]) {
            COMMANDS[cmd](args);
        } else {
            printError(`command not found: ${cmd} — type 'help' for available commands`);
        }
    }

    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === "Enter") {
            if (inputLocked) return;
            const raw = terminalInput.value;
            parseAndExecute(raw);
            terminalInput.value = "";

        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIdx < cmdHistory.length - 1) {
                historyIdx++;
                terminalInput.value = cmdHistory[historyIdx];
            }

        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIdx > 0) {
                historyIdx--;
                terminalInput.value = cmdHistory[historyIdx];
            } else {
                historyIdx = -1;
                terminalInput.value = "";
            }
        }
    });

    if (terminalEl) {
        terminalEl.addEventListener('click', function () {
            terminalInput.focus();
        });
    }

    /* ════════════════════════════════════════════
       SECTION 10 — BOOT SEQUENCE
    ════════════════════════════════════════════ */

    function printBootSequence() {
        const bootLines = [
            { html: getPromptString() + "whoami",          delay: 0,    type: "command" },
            { html: "Samuel Decarnelle",                   delay: 400,  type: "output"  },
            { html: getPromptString() + "cat role.txt",    delay: 900,  type: "command" },
            { html: "Cybersecurity Student — Penetration Testing",
                                                           delay: 1300, type: "output"  },
            { html: getPromptString() + "cat mission.txt", delay: 1800, type: "command" },
            { html: "Building enterprise-grade infrastructure to understand,",
                                                           delay: 2200, type: "output"  },
            { html: "test, and break systems — legally, methodically, and thoroughly.",
                                                           delay: 2400, type: "output"  }
        ];

        bootLines.forEach(function (entry) {
            setTimeout(function () {
                const p = document.createElement('p');
                p.className = entry.type === "command" ? "t-line" : "t-output";
                p.innerHTML = entry.html;
                terminalBody.insertBefore(p, inputWrapper);
                scrollTerminal();
            }, entry.delay);
        });
    }

    /* ════════════════════════════════════════════
       SECTION 11 — INIT (HERO TERMINAL)
    ════════════════════════════════════════════ */

    FS = buildFilesystem();
    printBootSequence();
    setTimeout(function () { terminalInput.focus(); }, 2600);

    /* ════════════════════════════════════════════
       SECTION 12 — CERTIFICATIONS TERMINAL
       This is a completely separate, read-only
       terminal display. It has no input, no
       commands, and no shared state with the hero
       terminal above. It simply reads the
       CERTIFICATIONS array from data/projects.js
       and renders each entry as static lines into
       #cert-body, mimicking a terminal cat output.
    ════════════════════════════════════════════ */

    function renderCertificationsTerminal() {
        const certBody = document.getElementById('cert-body');
        if (!certBody || typeof CERTIFICATIONS === 'undefined') return;

        /* ── Opening command line ── */
        const cmdLine = document.createElement('p');
        cmdLine.className = "t-line";
        cmdLine.innerHTML =
            `<span class="t-prompt">samuel@portfolio:~/certifications $</span> ` +
            `<span class="t-cmd-echo">ls -la</span>`;
        certBody.appendChild(cmdLine);

        /* ── Blank spacer after command ── */
        const spacerTop = document.createElement('p');
        spacerTop.className = "t-output";
        spacerTop.innerHTML = "&nbsp;";
        certBody.appendChild(spacerTop);

        /* ── One line per certification ── */
        CERTIFICATIONS.forEach(function (cert) {
            const p = document.createElement('p');
            p.className = "t-output";

            const obtained = cert.status === "obtained";
            const bracket  = obtained
                ? `<span style="color:var(--green);">[+]</span>`
                : `<span style="color:var(--text-muted);">[ ]</span>`;

            const label   = `<span style="color:var(--text-bright);">${cert.label}</span>`;
            const issuer  = `<span style="color:var(--text-muted);">— ${cert.issuer}</span>`;
            const year    = `<span style="color:var(--accent);">|  ${cert.year}</span>`;

            p.innerHTML = `${bracket} ${label} ${issuer} &nbsp; ${year}`;
            certBody.appendChild(p);
        });

        /* ── Blank spacer before prompt ── */
        const spacerBottom = document.createElement('p');
        spacerBottom.className = "t-output";
        spacerBottom.innerHTML = "&nbsp;";
        certBody.appendChild(spacerBottom);

        /* ── Closing blinking prompt ── */
        const closingPrompt = document.createElement('p');
        closingPrompt.className = "t-line";
        closingPrompt.innerHTML =
            `<span class="t-prompt">samuel@portfolio:~/certifications $</span> ` +
            `<span class="cursor-blink">_</span>`;
        certBody.appendChild(closingPrompt);
    }
 

    renderCertificationsTerminal();

});

