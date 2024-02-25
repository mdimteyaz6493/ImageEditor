let choose_btn = document.querySelector(".input_area input");
let imgSrc = document.querySelector(".image img");
let filter_buttons = document.querySelectorAll(".filter_buttons button");
let filter_name = document.querySelector(".filter_name");
let slider = document.querySelector(".slider_data input");
let slider_value = document.querySelector(".slider_data .value");
let reset = document.querySelector(".reset");
let save = document.querySelector(".save");

let folder = document.querySelector(".folder")
folder.addEventListener("click",()=>{
  choose_btn.click();
})

let brightness = 100,
  contrast = 100,
  saturate = 100,
  invert = 0,
  blur = 0,
  rotate = 0,
  flip_x = 1,
  flip_y = 1;
  gray = 0;
  hue=0;

choose_btn.addEventListener("change",()=>{
let file = choose_btn.files[0]
console.log(file)
imgSrc.src = URL.createObjectURL(file);
imgSrc.style.backgroundColor = ""; 
})

filter_buttons.forEach((element)=>{
element.addEventListener("click",()=>{
    console.log(element)
    document.querySelector(".active").classList.remove("active");
    element.classList.add("active");
    filter_name.innerText = element.id;
    if (element.id === "Brightness") {
        slider.max = "200";
        slider.value = brightness;
        slider_value.innerText = `${brightness}`;
      } else if (element.id === "Contrast") {
        slider.max = "200";
        slider.value = contrast;
        slider_value.innerText = `${contrast}`;
      } else if (element.id === "Saturation") {
        slider.max = "200";
        slider.value = saturate;
        slider_value.innerText = `${saturate}`;
      } else if (element.id === "Invert") {
        slider.max = "100";
        slider.value = invert;
        slider_value.innerText = `${invert}`;
      } else if (element.id === "Blur") {
        slider.max = "10";
        slider.value = blur;
        slider_value.innerText = `${blur}`;
      }
      else if (element.id === "Gray") {
        slider.max = "100";
        slider.value = gray;
        slider_value.innerText = `${gray}`;
      }
      else if (element.id === "Hue") {
        slider.max = "360";
        slider.value = hue;
        slider_value.innerText = `${hue}`;
      }
})
})

slider.addEventListener("input", () => {
    slider_value.innerText = `${slider.value}%`;
    let sliderState = document.querySelector(".filter_buttons .active");
    if (sliderState.id === "Brightness") {
      brightness = slider.value;
    } else if (sliderState.id === "Contrast") {
      contrast = slider.value;
    } else if (sliderState.id === "Saturation") {
      saturate = slider.value;
    } else if (sliderState.id === "Invert") {
      invert = slider.value;
    } else if (sliderState.id === "Blur") {
      blur = slider.value;
    }
    else if (sliderState.id === "Gray") {
        gray = slider.value;
      }
      else if (sliderState.id === "Hue") {
        hue = slider.value;
      }
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) grayscale(${gray}%) hue-rotate(${hue}deg)`;
  });

  reset.addEventListener("click", () => {
    brightness = "100";
    saturate = "100";
    contrast = "100";
    invert = "0";
    gray="0";
    blur = "0";
    hue="0";
    rotate = 0;
    flip_x = 1;
    flip_y = 1;
    imgSrc.style.transform = `rotate(${rotate}deg) scale(${flip_x}, ${flip_y})`;
    imgSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
  });
  
 
save.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = imgSrc.naturalWidth;
  canvas.height = imgSrc.naturalHeight;

  // Check if the background color has been changed
  let backgroundColor = imgSrc.style.backgroundColor;
  if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px) grayscale(${gray}%) hue-rotate(${hue}deg)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flip_x, flip_y);
  ctx.drawImage(
      imgSrc,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
});
  document.getElementById("Remove").addEventListener("click",()=>{
    let file = choose_btn.files[0]
        const formData = new FormData();
        formData.append("image_file",file);
        formData.append('size','auto')

        const api_key = "CXWbUyALBDvPqLEKN2cRzXp7"

        fetch("https://api.remove.bg/v1.0/removebg",{
            method:"POST",
            headers:{
                'X-Api-Key':api_key,
            },
            body:formData
        }).then(res=>res.blob()).then((blob)=>{
            console.log(blob)
            imgSrc.src = URL.createObjectURL(blob);
        }).catch((err)=>{
            console.log(err)
        })
  })

  let colorInput = document.getElementById("color");

colorInput.addEventListener("input", () => {
    let newColor = colorInput.value;
    imgSrc.style.backgroundColor = newColor;
});
  
let cropper;

let Crop = document.getElementById("Crop");

Crop.addEventListener("click", () => {
    
    cropper = new Cropper(imgSrc, {
        aspectRatio: 0,
    });
});

let yes = document.getElementById("yes")

yes.addEventListener("click",()=>{
  cropper.getCroppedCanvas().toBlob((blob) => {
    var croppedImage = URL.createObjectURL(blob);
    imgSrc.src = croppedImage;
});

cropper.destroy();
})
