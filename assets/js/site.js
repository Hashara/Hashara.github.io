/* Hashara Kumarasinghe — site behaviour. No dependencies. */

const root = document.documentElement;

/* --------------------------------------------------------------------------
   Theme toggle
   The initial theme is applied by an inline bootstrap in <head> so there is
   no flash; this only wires up the button.
   -------------------------------------------------------------------------- */

const toggle = document.getElementById("theme-toggle");

const resolvedTheme = () =>
	root.dataset.theme ||
	(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const labelToggle = () => {
	if (!toggle) return;
	toggle.setAttribute(
		"aria-label",
		resolvedTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme"
	);
};

if (toggle) {
	labelToggle();
	toggle.addEventListener("click", () => {
		const next = resolvedTheme() === "dark" ? "light" : "dark";
		root.dataset.theme = next;
		try {
			localStorage.setItem("theme", next);
		} catch {
			/* private mode — the choice just won't persist */
		}
		labelToggle();
	});
	matchMedia("(prefers-color-scheme: dark)").addEventListener("change", labelToggle);
}

/* --------------------------------------------------------------------------
   Scroll-spy — marks the nav link for the section currently in view
   -------------------------------------------------------------------------- */

const navLinks = new Map();
document.querySelectorAll(".nav a[href^='#']").forEach((a) => {
	navLinks.set(a.getAttribute("href").slice(1), a);
});

const sections = [...navLinks.keys()]
	.map((id) => document.getElementById(id))
	.filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
	const visible = new Set();

	const paint = () => {
		// Topmost visible section wins, so the marker moves predictably.
		let current = null;
		for (const section of sections) {
			if (visible.has(section.id)) {
				current = section.id;
				break;
			}
		}
		for (const [id, link] of navLinks) {
			if (id === current) link.setAttribute("aria-current", "true");
			else link.removeAttribute("aria-current");
		}
	};

	const spy = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) visible.add(entry.target.id);
				else visible.delete(entry.target.id);
			}
			paint();
		},
		{ rootMargin: "-30% 0px -60% 0px" }
	);

	sections.forEach((section) => spy.observe(section));
}

/* --------------------------------------------------------------------------
   Masthead hairline once the page has scrolled
   -------------------------------------------------------------------------- */

const masthead = document.getElementById("masthead");

if (masthead && "IntersectionObserver" in window) {
	const sentinel = document.createElement("div");
	sentinel.setAttribute("aria-hidden", "true");
	sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px";
	document.body.prepend(sentinel);

	new IntersectionObserver(
		([entry]) => {
			masthead.dataset.stuck = String(!entry.isIntersecting);
		},
		{ threshold: 0 }
	).observe(sentinel);
}

/* --------------------------------------------------------------------------
   Project dialogs — <dialog> plus shareable hashes (#p-fyp opens that project)
   -------------------------------------------------------------------------- */

const dialogs = new Map();
document.querySelectorAll("dialog.detail").forEach((d) => dialogs.set(d.id, d));

if (dialogs.size) {
	let pushedFor = null; // dialog id whose hash we pushed onto history
	let syncing = false; // guards the close -> popstate -> close loop

	const openDialog = (id, { push = true } = {}) => {
		const dialog = dialogs.get(id);
		if (!dialog || dialog.open) return;

		for (const other of dialogs.values()) if (other.open) other.close();

		dialog.showModal();

		// `autofocus` is not honoured when showModal() runs during initial module
		// execution, which is exactly the deep-link path (/#p-fyp, and every one
		// of the eight redirect stubs). Without this, focus lands on the dialog
		// itself — which deliberately has no focus ring — so a keyboard user
		// sees no indicator anywhere on the page.
		dialog.querySelector(".dialog-close")?.focus();

		if (push) {
			history.pushState({ dialog: id }, "", `#${id}`);
			pushedFor = id;
		}
	};

	const closeOpen = () => {
		for (const dialog of dialogs.values()) if (dialog.open) dialog.close();
	};

	for (const [id, dialog] of dialogs) {
		// Close button
		dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());

		// Backdrop click — the dialog element itself only receives the event
		// when the click lands outside .dialog-inner.
		//
		// A `click` target is the common ancestor of mousedown and mouseup, so
		// drag-selecting text and releasing past the dialog edge would otherwise
		// register as a backdrop click and close it, discarding the selection.
		// Require the press to have STARTED on the backdrop too.
		let pressedBackdrop = false;

		dialog.addEventListener("mousedown", (event) => {
			pressedBackdrop = event.target === dialog;
		});

		dialog.addEventListener("click", (event) => {
			if (event.target === dialog && pressedBackdrop) dialog.close();
			pressedBackdrop = false;
		});

		// Covers the close button, Esc and backdrop in one place.
		dialog.addEventListener("close", () => {
			if (syncing) return;
			if (pushedFor === id && location.hash === `#${id}`) {
				pushedFor = null;
				history.back();
			} else if (location.hash === `#${id}`) {
				history.replaceState(null, "", location.pathname + location.search);
			}
		});
	}

	document.querySelectorAll("[data-dialog]").forEach((button) => {
		button.addEventListener("click", () => openDialog(button.dataset.dialog));
	});

	const syncFromHash = () => {
		const id = location.hash.slice(1);
		syncing = true;
		if (dialogs.has(id)) openDialog(id, { push: false });
		else closeOpen();
		syncing = false;
	};

	window.addEventListener("popstate", syncFromHash);

	// Deep link: /#p-fyp opens that project straight away.
	if (dialogs.has(location.hash.slice(1))) {
		openDialog(location.hash.slice(1), { push: false });
	}
}

/* --------------------------------------------------------------------------
   Footer year
   -------------------------------------------------------------------------- */

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
