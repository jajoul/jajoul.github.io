import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CI9cmfXL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Measured against the 768×432 reference. Page 02 is this pile. */
var CANON = [
	{
		id: "sheet",
		x: 186,
		y: 326,
		w: 246,
		h: 46,
		r: -.6,
		z: 1
	},
	{
		id: "contact",
		x: 224,
		y: 24,
		w: 456,
		h: 304,
		r: 2.2,
		z: 2
	},
	{
		id: "poster",
		x: 200,
		y: 82,
		w: 272,
		h: 268,
		r: -.35,
		z: 3
	},
	{
		id: "card",
		x: 574,
		y: 66,
		w: 164,
		h: 80,
		r: 7.2,
		z: 4
	},
	{
		id: "polaroid",
		x: 92,
		y: 214,
		w: 154,
		h: 174,
		r: -8.2,
		z: 5
	},
	{
		id: "ticket",
		x: 386,
		y: 294,
		w: 352,
		h: 100,
		r: -1.7,
		z: 6
	}
];
var DEFAULT_PROFILE = {
	name: "Nord & Stack",
	discipline: "Django & Python",
	place: "Full-stack",
	email: "hello@nordandstack.studio",
	github: "https://github.com/nordandstack",
	linkedin: "https://www.linkedin.com/in/nordandstack",
	polaroidCaption: "install week, may '24",
	posterKicker: "Ledgerline · Django REST",
	posterDate: "07/12",
	sheetPlace: "Build, May 2024",
	sheetStock: "Ilford HP5",
	sheetNote: "→ 12 for the poster, crop tight",
	ticketWhen: "07.11 · 19:00",
	ticketVenue: "Hall B",
	ticketSeat: "Row 4 · 12",
	years: "Selected work 2021—2026"
};
var DEFAULT_FRAMES = [
	{
		src: "/prints/flowers.jpg",
		pos: "50% 28%",
		n: "08",
		f: "f/4"
	},
	{
		src: "/prints/flowers.jpg",
		pos: "62% 70%",
		n: "11",
		f: "f/8"
	},
	{
		src: "/prints/coast.jpg",
		pos: "58% 42%",
		n: "12",
		f: "f/11",
		ring: true
	},
	{
		src: "/prints/flowers.jpg",
		pos: "30% 48%",
		n: "14",
		f: "f/5.6"
	},
	{
		src: "/prints/field.jpg",
		pos: "50% 40%",
		n: "15",
		f: "f/8"
	},
	{
		src: "/prints/coast.jpg",
		pos: "40% 72%",
		n: "18",
		f: "f/16"
	}
];
var DEFAULT_PROJECTS = [
	{
		id: "ledgerline",
		number: "01",
		title: "Ledgerline",
		year: "2024",
		stack: "Django · DRF · Postgres · Celery",
		summary: "Billing for small studios. Usage goes in, invoices come out, and Stripe webhooks stay idempotent.",
		outcome: "14k invoices reconciled without a second billing product."
	},
	{
		id: "harbor",
		number: "02",
		title: "Harbor Queue",
		year: "2023",
		stack: "Django · HTMX · Postgres",
		summary: "A dock board for a cold store. Floor and office watch the same trucks, with different permissions.",
		outcome: "Intake fell from about 18 minutes to under 6."
	},
	{
		id: "fieldnote",
		number: "03",
		title: "Fieldnote",
		year: "2024",
		stack: "Django · Postgres · object storage",
		summary: "A press CMS. Editors preview an issue and publish it without opening a ticket.",
		outcome: "One full issue cycle ran with no engineering in the loop."
	},
	{
		id: "atelier",
		number: "04",
		title: "Atelier Gate",
		year: "2025",
		stack: "Django · Postgres",
		summary: "Client-portal login. Organizations, invitations, and sessions that rotate when a role changes.",
		outcome: "Six client teams, one login, no shared passwords."
	},
	{
		id: "kiln",
		number: "05",
		title: "Kiln",
		year: "2022",
		stack: "Django · Celery · Redis",
		summary: "A desk over the worker fleet. Retries, dead letters, and a night view that stays quiet unless a job is actually stuck.",
		outcome: "Failed jobs live in one place instead of three logs."
	},
	{
		id: "saltbox",
		number: "06",
		title: "Saltbox",
		year: "2021",
		stack: "Django · HTMX · Postgres",
		summary: "A storefront in the same app as the warehouse count. The cart is HTMX. Inventory is Postgres.",
		outcome: "One deploy and one database. No headless split."
	}
];
var STORAGE_KEY = "nord-stack-desk-v1";
function monogram(name) {
	const raw = name.trim();
	if (!raw) return "N&S";
	if (raw.includes("&")) {
		const [a, b] = raw.split("&").map((part) => part.trim());
		return `${a.replace(/[^A-Za-z]/g, "")[0] ?? "N"}&${(b ?? "").replace(/[^A-Za-z]/g, "")[0] ?? "S"}`.toUpperCase();
	}
	return (raw.split(/\s+/).filter(Boolean).map((bit) => bit.replace(/[^A-Za-z]/g, "")[0] ?? "").join("").slice(0, 3) || "NS").toUpperCase();
}
function padPage(page) {
	return String(page).padStart(2, "0");
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function layoutFor(page) {
	if (page === 2) return CANON.map((piece) => ({ ...piece }));
	const rnd = mulberry32(page * 9973 + 11);
	const order = CANON.map((piece) => ({ ...piece })).map((piece, index) => ({
		piece,
		index,
		n: rnd()
	}));
	order.sort((a, b) => a.n - b.n);
	return order.map((entry, z) => {
		return {
			...entry.piece,
			x: Math.round(96 + rnd() * 430),
			y: Math.round(18 + rnd() * 230),
			r: Math.round((rnd() - .5) * 18 * 10) / 10,
			z: z + 1
		};
	});
}
function loadDesk() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return null;
		return {
			profile: {
				...DEFAULT_PROFILE,
				...parsed.profile ?? {}
			},
			projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects.map((project, index) => ({
				...DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length],
				...project
			})) : DEFAULT_PROJECTS,
			layout: Array.isArray(parsed.layout) ? sanitizeLayout(parsed.layout) : null,
			frames: Array.isArray(parsed.frames) ? parsed.frames.map(String) : [],
			polaroid: typeof parsed.polaroid === "string" ? parsed.polaroid : null
		};
	} catch {
		return null;
	}
}
function sanitizeLayout(value) {
	const ids = [
		"sheet",
		"contact",
		"poster",
		"card",
		"polaroid",
		"ticket"
	];
	const next = CANON.map((piece) => ({ ...piece }));
	let seen = 0;
	for (const item of value) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		if (!row.id || !ids.includes(row.id)) continue;
		const target = next.find((piece) => piece.id === row.id);
		if (!target) continue;
		if (typeof row.x === "number") target.x = row.x;
		if (typeof row.y === "number") target.y = row.y;
		if (typeof row.r === "number") target.r = row.r;
		if (typeof row.z === "number") target.z = row.z;
		seen += 1;
	}
	return seen > 0 ? next : null;
}
function saveDesk(data) {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function clearDesk() {
	window.localStorage.removeItem(STORAGE_KEY);
}
async function fileToDataUrl(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, 1100 / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, Math.round(bitmap.width * scale));
	canvas.height = Math.max(1, Math.round(bitmap.height * scale));
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not read that image.");
	ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", .72);
}
function hrefFor(value) {
	const trimmed = value.trim();
	if (!trimmed) return "#";
	if (trimmed.startsWith("mailto:") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
	if (trimmed.includes("@") && !trimmed.includes("/")) return `mailto:${trimmed}`;
	return `https://${trimmed.replace(/^\/\//, "")}`;
}
function labelFor(value) {
	return value.trim().replace(/^https?:\/\//, "").replace(/^mailto:/, "").replace(/\/$/, "");
}
function PosterFace({ profile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "face paper poster-face",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "poster-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "numero",
					children: ["N", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "deg",
						children: "°"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "reg",
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "numeral",
				"aria-hidden": "true",
				children: "7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "poster-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: profile.posterKicker }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "poster-date",
					children: profile.posterDate
				})]
			})
		]
	});
}
function ContactFace({ profile, frames, mark }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "face paper contact-face",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "contact-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [mark, " · Contact sheet 03"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: profile.sheetPlace }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: profile.sheetStock })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "frames",
				children: frames.map((frame) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "film",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "film-img",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: frame.src,
							alt: "",
							style: { objectPosition: frame.pos }
						}), frame.ring ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ring",
							"aria-hidden": "true"
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: frame.n }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: frame.f })] })]
				}, frame.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sheet-note",
				children: profile.sheetNote
			})
		]
	});
}
function CardFace({ profile }) {
	const mark = monogram(profile.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "face card-face",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "card-mark",
			children: mark
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-lines",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.discipline }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [profile.place, " studio"] })
			]
		})]
	});
}
function PolaroidFace({ profile, src }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "face polaroid-face",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "polaroid-img",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "Black and white lake between mountains, install week."
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "polaroid-cap",
			children: profile.polaroidCaption
		})]
	});
}
function TicketFace({ profile }) {
	const mark = monogram(profile.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "face ticket-face",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stub",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mark })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ticket-main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "admit",
					children: "Admit one"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ticket-meta",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Opening night" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile.ticketWhen })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Venue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile.ticketVenue })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile.ticketSeat })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "barcode",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "serial",
					children: "0 8 7 1 1 2 4 1 0"
				})]
			})
		]
	});
}
function SheetFace() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "face paper sheet-face",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Roll 03 / 07 — Roll 7 install, document the hall before doors." })
	});
}
function Barcode() {
	const bits = [
		2,
		1,
		3,
		1,
		2,
		1,
		1,
		4,
		1,
		2,
		3,
		1,
		1,
		2,
		1,
		3,
		2,
		1,
		4,
		1,
		2,
		1,
		1,
		3
	];
	let x = 0;
	const width = bits.reduce((sum, bit) => sum + bit, 0);
	const rects = bits.map((bit, index) => {
		const rect = index % 2 === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x,
			y: "0",
			width: bit,
			height: "48"
		}, index) : null;
		x += bit;
		return rect;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: "barcode-svg",
		viewBox: `0 0 ${width} 48`,
		role: "img",
		"aria-label": "",
		children: rects
	});
}
function WorkPanel({ projects }) {
	const [mode, setMode] = (0, import_react.useState)("slideshow");
	const [index, setIndex] = (0, import_react.useState)(0);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const safe = projects.length > 0 ? projects : DEFAULT_PROJECTS;
	const current = safe[index % safe.length] ?? safe[0];
	const opened = openId ? safe.find((project) => project.id === openId) : null;
	if (!current) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel-sheet",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "empty",
			children: "No systems on the wall yet. Add one from the desk."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "work-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "work-bar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "work-kicker",
				children: [
					"Work · ",
					String(safe.length).padStart(2, "0"),
					" systems"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "modes",
				role: "group",
				"aria-label": "Work view",
				children: [
					["slideshow", "Slideshow"],
					["feed", "Feed"],
					["grid", "Grid"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-pressed": mode === id,
					onClick: () => {
						setMode(id);
						setOpenId(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dot",
						"aria-hidden": "true"
					}), label]
				}, id))
			})]
		}), opened ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseSheet, {
			project: opened,
			onBack: () => setOpenId(null)
		}) : mode === "slideshow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "slide",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseBody, { project: current }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "slide-nav",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex((value) => (value - 1 + safe.length) % safe.length),
						children: "Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						current.number,
						" / ",
						String(safe.length).padStart(2, "0")
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIndex((value) => (value + 1) % safe.length),
						children: "Next"
					})
				]
			})]
		}) : mode === "feed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "feed",
			children: safe.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "feed-row",
				onClick: () => setOpenId(project.id),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "feed-no",
						children: project.number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: project.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: project.summary })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "feed-year",
						children: project.year
					})
				]
			}) }, project.id))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "work-grid",
			children: safe.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "work-cell",
				onClick: () => setOpenId(project.id),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cell-no",
						children: project.number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cell-title",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cell-stack",
						children: project.stack
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "cell-year",
						children: project.year
					})
				]
			}) }, project.id))
		})]
	});
}
function CaseSheet({ project, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "slide case-open",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "back",
			onClick: onBack,
			children: "All work"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseBody, { project })]
	});
}
function CaseBody({ project }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "case",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "case-no",
				children: project.number
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: project.title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "case-year",
				children: project.year
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "case-summary",
				children: project.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "case-stack",
				children: project.stack
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "case-outcome",
				children: project.outcome
			})
		]
	});
}
function StudioPanel({ profile, onDesk }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel-sheet prose",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "The system and the screen." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Full-stack Django and Python. I design the model, the API, and the interface, then ship them as one thing — not a frontend waiting on a backend ticket." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The index is the studio wall: a plate, a contact sheet, a ticket from a launch night. Drag a piece to move it. Scroll to browse the pile. Work holds the systems behind the prints." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "stack-line",
				children: "Django · Python · Postgres · Django REST · HTMX · Celery · Redis · Docker"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "quiet",
				children: "Sample studies are standing in until you replace them. Your name, links, and photos stay in this browser."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-link",
				onClick: onDesk,
				children: "Open the desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "quiet pages-note",
				children: "GitHub Pages: this studio has no server. Push the repo and run the Pages workflow — it publishes a static snapshot at the site root. Put your real name on the prints before you do."
			})
		]
	});
}
function ContactPanel({ profile }) {
	const mark = monogram(profile.name);
	const links = [
		{
			label: "Email",
			value: profile.email,
			href: hrefFor(profile.email)
		},
		{
			label: "GitHub",
			value: labelFor(profile.github),
			href: hrefFor(profile.github)
		},
		{
			label: "LinkedIn",
			value: labelFor(profile.linkedin),
			href: hrefFor(profile.linkedin)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "contact-layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "face card-face card-large",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "card-mark",
					children: mark
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-lines",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.discipline }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [profile.place, " studio"] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "link-list",
				children: links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: link.href,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: link.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: link.value })]
				}) }, link.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "quiet",
				children: "No form. A static card, so the page can live on GitHub Pages."
			})
		]
	});
}
function DeskPanel({ profile, projects, onProfile, onProjects, onPolaroid, onFrame, onResetLayout, onClose }) {
	const [error, setError] = (0, import_react.useState)(null);
	async function take(file, apply) {
		if (!file) return;
		try {
			setError(null);
			apply(await fileToDataUrl(file));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not read that image.");
		}
	}
	function patchProject(id, patch) {
		onProjects(projects.map((project) => project.id === id ? {
			...project,
			...patch
		} : project));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "desk",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "work-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "work-kicker",
					children: "Desk · this browser only"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-link",
					onClick: onClose,
					children: "Back to the wall"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "quiet",
				children: "Rename the studio, swap the photographs, and edit the six studies. Nothing here is sent to a server."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "form-error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desk-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Studio name",
						value: profile.name,
						onChange: (name) => onProfile({
							...profile,
							name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Discipline",
						value: profile.discipline,
						onChange: (discipline) => onProfile({
							...profile,
							discipline
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Place line",
						value: profile.place,
						onChange: (place) => onProfile({
							...profile,
							place
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						value: profile.email,
						onChange: (email) => onProfile({
							...profile,
							email
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "GitHub URL",
						value: profile.github,
						onChange: (github) => onProfile({
							...profile,
							github
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "LinkedIn URL",
						value: profile.linkedin,
						onChange: (linkedin) => onProfile({
							...profile,
							linkedin
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Polaroid caption",
						value: profile.polaroidCaption,
						onChange: (polaroidCaption) => onProfile({
							...profile,
							polaroidCaption
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plate line",
						value: profile.posterKicker,
						onChange: (posterKicker) => onProfile({
							...profile,
							posterKicker
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Plate date",
						value: profile.posterDate,
						onChange: (posterDate) => onProfile({
							...profile,
							posterDate
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Footer",
						value: profile.years,
						onChange: (years) => onProfile({
							...profile,
							years
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "upload-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
						label: "Replace polaroid",
						onFile: (file) => void take(file, (src) => onPolaroid(src))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-link",
						onClick: () => onPolaroid(null),
						children: "Use the lake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-link",
						onClick: onResetLayout,
						children: "Reset the pile"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "frame-uploads",
				children: [DEFAULT_FRAMES.map((frame, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
					label: `Frame ${frame.n}`,
					onFile: (file) => void take(file, (src) => onFrame(index, src))
				}, frame.n)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-link",
					onClick: () => DEFAULT_FRAMES.forEach((_, index) => onFrame(index, null)),
					children: "Restore contact sheet"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "project-editor",
				children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
						project.number,
						" ",
						project.title || "Untitled"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						value: project.title,
						onChange: (title) => patchProject(project.id, { title })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Year",
						value: project.year,
						onChange: (year) => patchProject(project.id, { year })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stack",
						value: project.stack,
						onChange: (stack) => patchProject(project.id, { stack })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Summary",
						value: project.summary,
						onChange: (summary) => patchProject(project.id, { summary })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Outcome",
						value: project.outcome,
						onChange: (outcome) => patchProject(project.id, { outcome })
					})
				] }, project.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "upload-row",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-link",
					onClick: () => {
						clearDesk();
						onProfile(DEFAULT_PROFILE);
						onProjects(DEFAULT_PROJECTS.map((project) => ({ ...project })));
						onPolaroid(null);
						DEFAULT_FRAMES.forEach((_, index) => onFrame(index, null));
						onResetLayout();
					},
					children: "Restore the sample studio"
				})
			})
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (event) => onChange(event.target.value)
		})]
	});
}
function Area({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 3,
			value,
			onChange: (event) => onChange(event.target.value)
		})]
	});
}
function Upload({ label, onFile }) {
	const ref = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "text-link",
		onClick: () => ref.current?.click(),
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: "file-input",
		type: "file",
		accept: "image/*",
		onChange: (event) => {
			onFile(event.target.files?.[0]);
			event.target.value = "";
		}
	})] });
}
var NAV = [
	{
		id: "index",
		label: "Index"
	},
	{
		id: "work",
		label: "Work"
	},
	{
		id: "studio",
		label: "Studio"
	},
	{
		id: "contact",
		label: "Contact"
	}
];
var PIECE_COPY = {
	poster: "Plate seven",
	contact: "Contact sheet",
	card: "Studio card",
	polaroid: "Install week photograph",
	ticket: "Admit one ticket",
	sheet: "Install slip"
};
function readView() {
	const hash = window.location.hash.replace("#", "");
	if (hash === "work" || hash === "studio" || hash === "contact" || hash === "desk") return hash;
	return "index";
}
function wideScreen() {
	return window.matchMedia("(min-width: 768px)").matches;
}
function StudioApp() {
	const slotRef = (0, import_react.useRef)(null);
	const frameRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	const [view, setView] = (0, import_react.useState)("index");
	const [page, setPage] = (0, import_react.useState)(2);
	const [layout, setLayout] = (0, import_react.useState)(() => CANON.map((piece) => ({ ...piece })));
	const [dirty, setDirty] = (0, import_react.useState)(false);
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(DEFAULT_PROFILE);
	const [projects, setProjects] = (0, import_react.useState)(DEFAULT_PROJECTS);
	const [polaroid, setPolaroid] = (0, import_react.useState)(null);
	const [frameOverrides, setFrameOverrides] = (0, import_react.useState)(() => DEFAULT_FRAMES.map(() => null));
	const [ready, setReady] = (0, import_react.useState)(false);
	const scaleRef = (0, import_react.useRef)(1);
	scaleRef.current = scale;
	(0, import_react.useEffect)(() => {
		const saved = loadDesk();
		if (saved) {
			setProfile(saved.profile);
			setProjects(saved.projects);
			if (saved.layout) {
				setLayout(saved.layout);
				setDirty(true);
			}
			setPolaroid(saved.polaroid);
			setFrameOverrides(DEFAULT_FRAMES.map((_, index) => saved.frames[index] ?? null));
		}
		setView(readView());
		setReady(true);
		const onHash = () => setView(readView());
		window.addEventListener("hashchange", onHash);
		return () => window.removeEventListener("hashchange", onHash);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveDesk({
			profile,
			projects,
			layout: dirty ? layout : null,
			frames: frameOverrides.map((src) => src ?? ""),
			polaroid
		});
	}, [
		ready,
		profile,
		projects,
		layout,
		dirty,
		frameOverrides,
		polaroid
	]);
	(0, import_react.useEffect)(() => {
		const slot = slotRef.current;
		if (!slot) return;
		const apply = () => {
			if (!wideScreen()) {
				setScale(1);
				return;
			}
			const rect = slot.getBoundingClientRect();
			const next = Math.min(rect.width / 768, rect.height / 432);
			setScale(Number.isFinite(next) && next > 0 ? next : 1);
		};
		apply();
		const observer = new ResizeObserver(apply);
		observer.observe(slot);
		window.addEventListener("resize", apply);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", apply);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const frame = frameRef.current;
		if (!frame) return;
		let locked = false;
		const onWheel = (event) => {
			if (!wideScreen() || view !== "index" || dirty || locked) return;
			if (Math.abs(event.deltaY) < 8) return;
			event.preventDefault();
			locked = true;
			const dir = event.deltaY > 0 ? 1 : -1;
			setPage((current) => {
				const next = (current - 1 + dir + 14) % 14 + 1;
				setLayout(layoutFor(next));
				return next;
			});
			window.setTimeout(() => {
				locked = false;
			}, 480);
		};
		frame.addEventListener("wheel", onWheel, { passive: false });
		return () => frame.removeEventListener("wheel", onWheel);
	}, [view, dirty]);
	function go(next) {
		setView(next);
		const hash = next === "index" ? "" : `#${next}`;
		const url = `${window.location.pathname}${window.location.search}${hash}`;
		window.history.replaceState(null, "", url);
	}
	function bringToFront(id) {
		setLayout((current) => {
			const max = Math.max(...current.map((piece) => piece.z));
			return current.map((piece) => piece.id === id ? {
				...piece,
				z: max + 1
			} : piece);
		});
	}
	function nudge(id, dx, dy) {
		setDirty(true);
		setLayout((current) => current.map((piece) => piece.id === id ? {
			...piece,
			x: piece.x + dx,
			y: piece.y + dy
		} : piece));
	}
	function onPointerDown(event, id) {
		if (!wideScreen() || event.button !== 0) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		const piece = layout.find((item) => item.id === id);
		if (!piece) return;
		dragRef.current = {
			id,
			px: event.clientX,
			py: event.clientY,
			ox: piece.x,
			oy: piece.y,
			moved: false
		};
		setDragging(id);
		bringToFront(id);
	}
	function onPointerMove(event) {
		const drag = dragRef.current;
		if (!drag || drag.id !== event.currentTarget.dataset.piece) return;
		const dx = (event.clientX - drag.px) / scaleRef.current;
		const dy = (event.clientY - drag.py) / scaleRef.current;
		if (!drag.moved && Math.hypot(dx, dy) < 3) return;
		drag.moved = true;
		setDirty(true);
		setLayout((current) => current.map((piece) => piece.id === drag.id ? {
			...piece,
			x: drag.ox + dx,
			y: drag.oy + dy
		} : piece));
	}
	function onPointerUp(event) {
		if (dragRef.current?.id === event.currentTarget.dataset.piece) {
			dragRef.current = null;
			setDragging(null);
		}
	}
	function onKeyDown(event, id) {
		if (!wideScreen()) return;
		const step = event.shiftKey ? 24 : 8;
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			nudge(id, -step, 0);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			nudge(id, step, 0);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			nudge(id, 0, -step);
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			nudge(id, 0, step);
		} else if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			bringToFront(id);
		}
	}
	function shuffle() {
		setDirty(true);
		setLayout((current) => {
			const sprinkled = current.map((piece) => ({
				...piece,
				x: Math.round(90 + Math.random() * 440),
				y: Math.round(16 + Math.random() * 240),
				r: Math.round((Math.random() - .5) * 20 * 10) / 10,
				roll: Math.random()
			}));
			sprinkled.sort((a, b) => a.roll - b.roll);
			return sprinkled.map((piece, index) => ({
				id: piece.id,
				x: piece.x,
				y: piece.y,
				w: piece.w,
				h: piece.h,
				r: piece.r,
				z: index + 1
			}));
		});
	}
	function resetPile() {
		setDirty(false);
		setPage(2);
		setLayout(CANON.map((piece) => ({ ...piece })));
	}
	const frames = DEFAULT_FRAMES.map((frame, index) => ({
		...frame,
		src: frameOverrides[index] || frame.src
	}));
	const mark = monogram(profile.name);
	const polaroidSrc = polaroid || "/prints/lake.jpg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "sr",
			children: [
				profile.name,
				", ",
				profile.discipline
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "frame-slot",
			ref: slotRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "frame-sizer",
				style: {
					width: `calc(768px * ${scale})`,
					height: `calc(432px * ${scale})`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "frame",
					ref: frameRef,
					"data-view": view,
					style: { transform: `scale(${scale})` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "rail",
							"aria-label": "Studio",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "brand",
									children: profile.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "brand-sub",
									children: [
										profile.discipline,
										",",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										profile.place
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rail-nav",
									children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "nav-btn",
										"aria-current": view === item.id ? "page" : void 0,
										onClick: () => go(item.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "dot",
											"aria-hidden": "true"
										}), item.label]
									}, item.id))
								})
							]
						}),
						layout.map((piece) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `piece piece-${piece.id}${dragging === piece.id ? " is-drag" : ""}`,
							"data-piece": piece.id,
							role: "group",
							tabIndex: 0,
							"aria-label": `${PIECE_COPY[piece.id]}. Drag to move, or press Enter to bring it forward.`,
							style: {
								"--x": `${piece.x}px`,
								"--y": `${piece.y}px`,
								"--w": `${piece.w}px`,
								"--h": `${piece.h}px`,
								"--r": `${piece.r}deg`,
								zIndex: piece.z
							},
							onPointerDown: (event) => onPointerDown(event, piece.id),
							onPointerMove,
							onPointerUp,
							onKeyDown: (event) => onKeyDown(event, piece.id),
							children: [
								piece.id === "poster" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterFace, { profile }) : null,
								piece.id === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactFace, {
									profile,
									frames,
									mark
								}) : null,
								piece.id === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, { profile }) : null,
								piece.id === "polaroid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolaroidFace, {
									profile,
									src: polaroidSrc
								}) : null,
								piece.id === "ticket" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketFace, { profile }) : null,
								piece.id === "sheet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFace, {}) : null
							]
						}, piece.id)),
						view !== "index" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel",
							children: [
								view === "work" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkPanel, { projects }) : null,
								view === "studio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioPanel, {
									profile,
									onDesk: () => go("desk")
								}) : null,
								view === "contact" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactPanel, { profile }) : null,
								view === "desk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskPanel, {
									profile,
									projects,
									onProfile: setProfile,
									onProjects: setProjects,
									onPolaroid: setPolaroid,
									onFrame: (index, src) => setFrameOverrides((current) => current.map((item, itemIndex) => itemIndex === index ? src : item)),
									onResetLayout: resetPile,
									onClose: () => go("index")
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "meta-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "page-no",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: padPage(page) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "slash",
										children: [" / ", padPage(14)]
									})]
								}),
								dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "hint-btn",
									onClick: resetPile,
									children: "Reset the pile"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "scroll-hint",
									children: "Scroll to browse ↓"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "copy",
									children: ["© ", (/* @__PURE__ */ new Date()).getFullYear()]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta-right",
							children: profile.years
						}),
						view === "index" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tools",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: shuffle,
								children: "Shuffle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: resetPile,
								children: "Reset"
							})]
						}) : null
					]
				})
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, {});
}
//#endregion
export { Home as component };
