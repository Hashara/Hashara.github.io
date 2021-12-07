/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Hack: Enable IE flexbox workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Forms.

		// Hack: Activate non-input submits.
			$('form').on('click', '.submit', function(event) {

				// Stop propagation, default.
					event.stopPropagation();
					event.preventDefault();

				// Submit form.
					$(this).parents('form').submit();

			});

	// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebar_a = $sidebar.find('a');

			$sidebar_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$sidebar_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '-20vh',
							bottom: '-20vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($sidebar_a.filter('.active-locked').length == 0) {

										$sidebar_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
					if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
					&&	$sidebar.length > 0)
						return $sidebar.height();

				return 0;

			}
		});

	// Spotlights.
		$('.spotlights > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			})
			.each(function() {

				var	$this = $(this),
					$image = $this.find('.image'),
					$img = $image.find('img'),
					x;

				// Assign image.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set background position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide <img>.
					$img.hide();

			});

	// Features.
		$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {

					// Deactivate section.
						$(this).addClass('inactive');

				},
				enter: function() {

					// Activate section.
						$(this).removeClass('inactive');

				}
			});

})(jQuery);

const pumpItUpModal = document.getElementById("pumpItUp");
const fypModal = document.getElementById("fyp");
const dsModal = document.getElementById("ds");
const ncmsModal = document.getElementById("ncms");
const obbsModal = document.getElementById("obbs");


// Get the button that opens the modal
const pumpItUpBtn = document.getElementById("pumpItUpBtn");
const fypBtn = document.getElementById("fypBtn");
const dsBtn = document.getElementById("dsBtn");
const ncmsBtn = document.getElementById("ncmsBtn");
const obbsBtn = document.getElementById("obbsBtn");

// Get the <span> element that closes the modal
const pumpItUpSpan = document.getElementsByClassName("close")[0];
const fypSpan = document.getElementsByClassName("close")[1];
const dsSpan = document.getElementsByClassName("close")[2];
const ncmsSpan = document.getElementsByClassName("close")[3];
const obbsSpan = document.getElementsByClassName("close")[4];

// When the user clicks on the button, open the modal
pumpItUpBtn.onclick = function() {
	pumpItUpModal.style.display = "block";
}
fypBtn.onclick = function() {
	fypModal.style.display = "block";
}
dsBtn.onclick = function() {
	dsModal.style.display = "block";
}
ncmsBtn.onclick = function() {
	ncmsModal.style.display = "block";
}
obbsBtn.onclick = function() {
	obbsModal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
pumpItUpSpan.onclick = function() {
	pumpItUpModal.style.display = "none";
}
fypSpan.onclick = function() {
	fypModal.style.display = "none";
}
dsSpan.onclick = function() {
	dsModal.style.display = "none";
}
ncmsSpan.onclick = function() {
	ncmsModal.style.display = "none";
}
obbsSpan.onclick = function() {
	obbsModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target === pumpItUpModal) {
		pumpItUpModal.style.display = "none";
	}
	else if (event.target === fypModal) {
		fypModal.style.display = "none";
	}
	else if (event.target === dsModal) {
		dsModal.style.display = "none";
	}
	else if (event.target === ncmsModal) {
		ncmsModal.style.display = "none";
	}
	else if (event.target === obbsModal) {
		obbsModal.style.display = "none";
	}
}

