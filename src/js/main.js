document.addEventListener('DOMContentLoaded', function(){
	
	//	change primary background

	const primaryBtn = document.querySelectorAll(".primary-btn")
	const primaryBg = document.querySelector(".primary-bg")
	console.log(primaryBtn)
	primaryBtn.forEach(function(elem, i) {
		elem.addEventListener("mouseover", function() {
			if ( !( this.classList.contains("current") ) ) {
				primaryBtn.forEach(function(el, j) {
					el.classList.remove("current")
				})
				this.classList.add("current")
				primaryBg.src = "images/" + this.dataset.bg + ".webp"
			}
		})
	})

	//	mobile menu

	const headerNav = document.querySelector(".header-nav")
	const headerBurger = document.querySelector(".header-burger")
	const overlay = document.querySelector(".overlay")

	if ( window.innerWidth <= 768 ) {
		headerBurger.addEventListener("click", () => {
			headerNav.classList.toggle("open-menu")
			overlay.classList.toggle("open-menu")
		})
		overlay.addEventListener("click", () => {
			headerNav.classList.toggle("open-menu")
			overlay.classList.toggle("open-menu")
		})
	}

	
	/*
	const siteHeader = document.querySelector(".site-header")
	const siteMenu = document.querySelector(".site-menu")
	const toggleMenu = document.querySelector(".toggle-menu")
	toggleMenu.addEventListener("click", () => {
		siteHeader.classList.toggle("open-menu")
		siteMenu.classList.toggle("open-menu")
	})

	//	form submit
	const profileSave = document.querySelector(".profile-save")
	const profileSubmit = document.querySelector(".submit")
	profileSave.addEventListener("click", () => profileSubmit.click())

	//	tovars-slider
	const tovarsSliderExists = document.querySelector(".tovars-slider")
	if ( tovarsSliderExists ) {
		const tovarsSlider = new Swiper('.tovars-slider', {
			slidesPerView: "auto",
			slidesPerGroup: 1,
			loop: true,
			rewind: true,
			breakpoints: {
				320: {
					spaceBetween: 8
				},
				768: {
					spaceBetween: 32
				}
			}
		});
	}

	//	wishlist

	let tovarsInBasket = 0

	const wishlistCount = document.querySelector(".wishlist-count")
	const addToWishlist = document.querySelectorAll(".add-to-wishlist")
	addToWishlist.forEach(function(item, i) {
		item.addEventListener("click", function() {
			if ( this.classList.contains("added") ) {
				this.classList.remove("added")
				tovarsInBasket--
			}	else {
				this.classList.add("added")
				tovarsInBasket++
			}
			wishlistCount.innerText = tovarsInBasket
		});
	});
	*/
})