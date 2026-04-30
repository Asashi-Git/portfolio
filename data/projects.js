/* ═══════════════════════════════════════════════
   SAMUEL DECARNELLE — PORTFOLIO
   data/projects.js
   ───────────────────────────────────────────────
   TO ADD A NEW PROJECT:
   Copy one object block below, paste it at the
   end of the array (before the final ] ), and
   fill in your data. Nothing else needs to change.
   ═══════════════════════════════════════════════ */

const PROJECTS = [
    {
        id: "homelab",
        name: "Enterprise HomeLab",
        status: "active",
        featured: true,
        tags: ["proxmox", "networking", "linux", "defensive", "offensive"],
        summary: "53-asset enterprise-grade infrastructure. 5-node Proxmox cluster, 7 pfSense firewalls, Zero Trust architecture, full SOC stack. Built as a collaborative red team training environment.",
        description: "Architecture segmentée multi-zones (Management, SOC, DMZ, Production, Pre-Production, Cybersecurity). Haute disponibilité via pfSense HA pairs avec VIP VRRP. Stack SOC complète : Wazuh, Suricata, Shuffle, Zabbix, OpenCTI. Lab offensif incluant DVWA, OWASP Juice Shop, Metasploitable.",
        link: {
            label: "[view documentation]",
            href: "https://github.com/Asashi-Git/HomeLab"
        }
    },
    {
        id: "brume-linux",
        name: "Linux Engineering — Brume-s",
        status: "completed",
        featured: false,
        tags: ["linux", "networking", "scripting"],
        summary: "Freelance Linux engineering mission. Deployment and hardening of Arch Linux servers with Linux-Hardened kernel. Secure web server configuration, reverse proxy setup, and Bash automation scripts.",
        description: "Deployed two Arch Linux servers using the Linux-Hardened kernel for maximum system security. Configured a secure web server environment with industry-standard encryption protocols. Implemented a reverse proxy for traffic management and infrastructure isolation. Developed Bash scripts to automate Linux update cycles and reduce configuration drift.",
        link: {
            label: "[view website]",
            href: "https://brume-s.com/"
        }
    },
    {
        id: "kpmg-powershell",
        name: "Asset Lifecycle Automation — KPMG",
        status: "completed",
        featured: true,
        tags: ["scripting", "devops", "windows"],
        summary: "PowerShell automation tool leveraging MDE exports and external APIs to classify 25000+ enterprise assets as Supported, EOL, Near-EOL, or EOS. Built during a DevOps internship at KPMG.",
        description: "Developed during a 3-month DevOps internship at KPMG (May–August 2025). Automated asset lifecycle classification using Microsoft Defender for Endpoint exports and external API calls. Also contributed to Active Directory auditing, identifying KPMG France perimeter users in collaboration with the DevOps team.",
        link: {
            label: "[view website]",
            href: "https://kpmg.com/fr/fr.html"
        }
    },
    {
        id: "ctf-ipssi",
        name: "CTF Event Design — IPSSI Recruitment",
        status: "completed",
        featured: true,
        tags: ["offensive", "ctf", "proxmox", "linux"],
        summary: "Designed and deployed a full Capture The Flag event for IPSSI student recruitment. 10 progressive levels plus one hidden challenge. Virtualized on Proxmox with 4 hardened Linux instances.",
        description: "Complete ownership of a CTF event from challenge design to infrastructure deployment. 10 challenges covering web, network, forensics, and offensive security disciplines. Infrastructure deployed on Proxmox with high-availability guarantees for event continuity. Freelance contract, April–May 2025.",
        link: null
    },
    {
        id: "arch-hardening",
        name: "Arch Linux Hardening Scripts",
        status: "completed",
        featured: true,
        tags: ["linux", "scripting", "defensive"],
        summary: "Bash automation scripts for Arch Linux service hardening. Covers SSH configuration, key management, PAM policies, and strict error handling with cleanup traps.",
        description: "Documented hardening methodology for Arch Linux environments including SSH daemon configuration, public key authentication enforcement, PAM policy tuning, and automated security checks. Scripts designed for reproducibility across production and pre-production environments.",
        link: {
            label: "[view on github]",
            href: "https://github.com/Asashi-Git/scripts/tree/main/hardened-ArchLinux"
        }
    },
    {
        id: "arch-install",
        name: "Encrypted Arch Linux Installation Script",
        status: "completed",
        featured: true,
        tags: ["linux", "scripting", "defensive"],
        summary: "Fully automated, interactive Bash script for installing Arch Linux with LUKS2 full-disk encryption, LVM partitioning, and security hardening. Covers everything from disk layout to bootloader configuration.",
        description: "End-to-end Arch Linux installation script driven entirely by interactive prompts. Implements LUKS2 encryption on the root partition, LVM volume group management with configurable partition sizes for root, var, usr, data, home, and swap. Enforces hardened mount options (nosuid, nodev, noexec) per partition. Handles keyboard layout selection, locale, timezone, hostname, user creation, sudo policy, and GRUB bootloader configuration with encrypted device UUID injection. Supports optional desktop environment installation (GNOME, KDE, Xfce, MATE, i3). Designed for reproducibility and operator safety with confirmation prompts at every destructive step.",
        link: {
            label: "[view on github]",
            href: "https://github.com/Asashi-Git/scripts/blob/main/encrypted-ArchLinux/encrypted-arch-install.sh"
        }
    },
    {
        id: "ctf-writeups",
        name: "CTF Writeups",
        status: "planned",
        featured: false,
        tags: ["offensive", "ctf"],
        summary: "Documented solutions and methodology notes from Capture The Flag competitions. Covering enumeration, exploitation, and post-exploitation phases.",
        description: "Coming soon. Will document challenge solutions from TryHackMe, HackTheBox, and external CTF events with full methodology, tool usage, and lessons learned.",
        link: {
            label: "[tryhackme profile]",
            href: "https://tryhackme.com/p/Asashii"
        }
    }
];

const CERTIFICATIONS = [
    {
        id:     "ccna1",
        label:  "CCNA 1 — Introduction to Networks",
        issuer: "Cisco Networking Academy",
        year:   "2025",
        status: "obtained"
    },
    {
        id:     "ccna2",
        label:  "CCNA 2 — Switching, Routing and Wireless Essentials",
        issuer: "Cisco Networking Academy",
        year:   "2025",
        status: "obtained"
    },
    {
        id:     "tryhackme-presecurity",
        label:  "TryHackMe — Pre-Security Path",
        issuer: "TryHackMe",
        year:   "2025",
        status: "obtained",
        link:   "https://tryhackme.com/p/Asashii"
    },
    {
        id:     "ceh",
        label:  "CEH — Certified Ethical Hacker",
        issuer: "EC-Council",
        year:   "2026 — target",
        status: "planned"
    },
    {
        id:     "oscp",
        label:  "OSCP — Offensive Security Certified Professional",
        issuer: "Offensive Security",
        year:   "2027 — target",
        status: "planned"
    }
];

