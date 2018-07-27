/* ****** Art Work Carousel ****** */
window.addEventListener('load', () => {
    var
        carousels = document.querySelectorAll('.carousel')
    ;

    for (var i = 0; i < carousels.length; i++) {
        carousel(carousels[i]);
    }
});

function carousel(root) {
    var
        figure = root.querySelector('figure'),
        nav = root.querySelector('nav'),
        images = figure.children,
        n = images.length,
        gap = root.dataset.gap || 0,
        bfc = 'bfc' in root.dataset,
        
        theta =  2 * Math.PI / n,
        currImage = 0
    ;
    
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
    window.addEventListener('resize', () => { 
        setupCarousel(n, parseFloat(getComputedStyle(images[0]).width)) 
    });

    setupNavigation();

    function setupCarousel(n, s) {
        var 
            apothem = s / (2 * Math.tan(Math.PI / n))
        ;
        
        figure.style.transformOrigin = `50% 50% ${- apothem}px`;

        for (var i = 0; i < n; i++)
            images[i].style.padding = `${gap}px`;
        for (i = 1; i < n; i++) {
            images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
            images[i].style.transform = `rotateY(${i * theta}rad)`;
        }
        if (bfc)
            for (i = 0; i < n; i++)
                 images[i].style.backfaceVisibility = 'hidden';
        
        rotateCarousel(currImage);
    }

    function setupNavigation() {
        nav.addEventListener('click', onClick, true);
        
        function onClick(e) {
            e.stopPropagation();
            
            var t = e.target;
            if (t.tagName.toUpperCase() != 'BUTTON')
                return;
            
            if (t.classList.contains('turn')) {
                currImage++;
            }
            else {
                currImage--;
            }
            
            rotateCarousel(currImage);
        }
            
    }

    function rotateCarousel(imageIndex) {
        figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    }
    
}

/* ****** AJAX edu-btn ****** */
function loadEdu() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);    /******go to server when in ready state******/
    }
  };
  xhttp.open("GET", "myweb.xml", true);
  xhttp.send();
}

function myFunction(xml) {      /*****server request*********/
  var i;
  var xmlDoc = xml.responseXML;

  var table="<tr>  <th><center><h4><b>Qualification<b></h4></center></th>  <th><center><h4><b>Institution</b></h4></center></th>  <th><center><h4><b>Place<b></h4></center></th></tr>";

  var x = xmlDoc.getElementsByTagName("INSTITUTION");
  for (i = 0; i <x.length; i++) {   //iterate through xml document to get the data
    table += "<tr><td>" +

    x[i].getElementsByTagName("DEGREE")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("NAME")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("PLACE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("institute_demo").innerHTML = table;
}

/* ******Footer Like Unlike Button****** */

var like_click= 0;
function likeFunction(x) {
    like_click = like_click +1;
    document.getElementById("like-clicks").innerHTML = like_click;
}

var unlike_click= 0;
function unlikeFunction(y) {
    unlike_click = unlike_click -1;
    document.getElementById("unlike-clicks").innerHTML = unlike_click;
}