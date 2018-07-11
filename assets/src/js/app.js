// MODEL

var model = {
	currentCat: null,
	cats: [{
		catName: 'Bixano',
		catCount: '0',
		srcImg: 'assets/img/cat.jpeg',
	},{
		catName: 'Xaninho',
		catCount: '0',
		srcImg: 'assets/img/cat_picture2.jpeg',
	},{
		catName: 'Pandora',
		catCount: '0',
		srcImg: 'assets/img/cat_picture5.jpeg',
	},{
		catName: 'Isis',
		catCount: '0',
		srcImg: 'assets/img/cat2.jpg',
	},{
		catName: 'Fofinha',
		catCount: '0',
		srcImg: 'assets/img/cat_picture3.jpeg',
	}]
};

// CONTROLLER

var octopus = {
	init: function () {
		model.currentCat = model.cats[0];

		listCatsView.init();
		catView.init();
	},

	getCurrentCat: function () {
		return model.currentCat;
	},

	setCurrentCat: function (cat) {
		model.currentCat = cat;
	},

	getCats: function () {
		return model.cats;
	},

	incrementCounter: function () {
		model.currentCat.catCount++;
		catView.render();
	},

	changes: function (name, catUrl, counter) {
		model.currentCat.catName = name;
		model.currentCat.srcImg = catUrl;
		model.currentCat.catCount = counter;

		catView.render();
		listCatsView.render();
	}

};

// VIEWS

var listCatsView = {
	init: function() {
	    // store the DOM element for easy access later
	    this.catListElem = document.getElementById('list-cats');

	    // render this view (update the DOM elements with the right values)
	    this.render();
	},

	render: function () {
		var cat, elem, i;
		// get the cats we'll be rendering from the octopus
		var cats = octopus.getCats();

		// empty the cat list
		this.catListElem.innerHTML = '';

		for (i = 0; i < cats.length; i++) {
			elem = document.createElement('li');
			cat = cats[i];
			elem.textContent = cat.catName;

			elem.addEventListener('click', (function (catCopy) {
				return function () {
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));

			this.catListElem.appendChild(elem);
		}

	}

};

var catView = {
	init: function () {
		// store the DOM element for easy access later
		this.catNameElem = document.getElementById('cat-name');
		this.catImgElem = document.getElementById('cat-img');
		this.catQtdElem = document.getElementById('qtd-clicks');
		this.buttonAdmin = document.getElementById('admin-btn');
		this.buttonSave = document.getElementById('save-btn');

		// on click, increment the current cat's counter
		this.catImgElem.addEventListener('click', function(){
		    octopus.incrementCounter();
		});

		// Open/close - Admin controls
		$("#admin-btn").click(function() {
			$('.admin-controls').toggleClass('open');
		});

		// Call Changes function
		this.buttonSave.addEventListener('click', function(){
			var newName = $('#name-control').val();
			var catUrl = $('#url-control').val();
			var counter = $('#counter-control').val();
		    return octopus.changes(newName, catUrl, counter);
		});

		// Cancel button
		$("#cancel-btn").click(function() {
			$('.admin-controls').removeClass('open');
		});

		// render this view (update the DOM elements with the right values)
		this.render();
	},

	render: function () {
		var currentCat = octopus.getCurrentCat();

		this.catNameElem.textContent = currentCat.catName;
		this.catImgElem.src = currentCat.srcImg;
		this.catQtdElem.textContent = currentCat.catCount;

		// Insert current values in the form
		$('#name-control').val(currentCat.catName);
		$('#url-control').val(currentCat.srcImg);
		$('#counter-control').val(currentCat.catCount);
	},
};

octopus.init();