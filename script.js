const fileInput =document.querySelector(".file-input"),
filterOptions=document.querySelectorAll(".filter button"),
previewImg =document.querySelector(".preglednik-slike img"),
filterName =document.querySelector(".filter-info .ime"),
filterValue =document.querySelector(".filter-info .vrijednost"),
filterSlider =document.querySelector(".slider input"),
rotateOptions=document.querySelectorAll(".rotate button"),
resetFilterBtn =document.querySelector(".reset-filter"),
saveImgBtn =document.querySelector(".sacuvaj-sliku"),
chooseImgBtn =document.querySelector(".izaberi-sliku");

let brightness=100, saturation =100; inversion=0, grayscale=0, blurs=0, opacity=100; 
let rotate=0, flipHorizontal=1, flipVertical=1;

const loadImage=() => {
    let file=fileInput.files[0];   
    if(!file) return;        
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener("load", () =>{
        document.querySelector(".container").classList.remove("disable");
    });
}

const applyFilters = () => {
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) opacity(${opacity}%) blur(${blurs}px)`;
}



filterOptions.forEach(option => {
    option.addEventListener("click", () =>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id ==="brightness"){
            filterSlider.max="200";
            filterSlider.value=brightness;
            filterValue.innerText=`${brightness}%`;
        }
        else if(option.id ==="saturation")
        {
            filterSlider.max="200";
            filterSlider.value=saturation;
            filterValue.innerText=`${saturation}%`;
        }
        else if(option.id ==="inversion")
        {
            filterSlider.max="100";
            filterSlider.value=inversion;
            filterValue.innerText=`${inversion}%`;
        }
        else if(option.id ==="blurs")
        {
            filterSlider.max="100";
            filterSlider.value=blurs;
            filterValue.innerText=`${blurs}px`;
        }
        else if(option.id ==="opacity")
        {
            filterSlider.max="100";
            filterSlider.value=opacity;
            filterValue.innerText=`${opacity}%`;
        }
      
        else 
        {
            filterSlider.max="100";
            filterSlider.value=grayscale;
            filterValue.innerText=`${grayscale}%`;
        }
      
    });   
});   

const updateFilter=() =>  {
    filterValue.innerText=`${filterSlider.value}%`;
    const selectedFilter=document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value; 
    }
    else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value; 
    }
    else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value; 
    }
    else if(selectedFilter.id === "blurs"){
        blurs = filterSlider.value; 
    }
    else if(selectedFilter.id === "opacity"){
        opacity = filterSlider.value; 
    }
    else {
        grayscale= filterSlider.value; 
    }
    applyFilters();
}

rotateOptions.forEach(option =>{
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -=90;
        }
        else if(option.id === "right"){
            rotate +=90;
        }
        else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        else{
            flipVertical=flipVertical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});

const resetFilter = () =>{
    brightness=100; saturation =100; inversion=0; grayscale=0; blurs=0; opacity=100;
    rotate=0; flipHorizontal=1; flipVertical=1;
    filterOptions [0].click();
    applyFilters();
}

const saveImage =() => {
    const canvas = document.createElement("canvas");
    const ctx=canvas.getContext("2d");
    canvas.width= previewImg.naturalWidth;
    canvas.height= previewImg.naturalHeight;

    ctx.filter=`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) opacity(${opacity}%) blur(${blurs}px) `;
    ctx.translate(canvas.width/2, canvas.height/2);
    if(rotate !== 0){
        ctx.rotate(rotate *Math.PI /180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    
    const link=document.createElement("a");
    link.download="image.jpg";
    link.href=canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
